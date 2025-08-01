const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const connectDB = require("./Config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/ProductRoute");
const messageRoutes = require("./routes/messageRoutes");
const wishlistRoutes = require("./routes/WishlistRoutes");
const Message = require("./routes/messageRoutes");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware


// ✅ CORS configuration
const allowedOrigins = [
  "https://olx-h0p5.onrender.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies, headers, etc.
  })
);


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Create HTTP & Socket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Socket.io Logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", ({ userId }) => {
    socket.join(userId); // Join a private room
    console.log(`User ${userId} joined room`);
  });

  socket.on("send-message", async (data) => {
    const { senderId, receiverId, message } = data;

    try {
      // Save message to MongoDB
      const savedMessage = new Message({ senderId, receiverId, message });
      await savedMessage.save();

      // Emit to receiver
      io.to(receiverId).emit("receive-message", savedMessage);
    } catch (error) {
      console.error("Error saving message:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
