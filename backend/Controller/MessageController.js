const Message = require("../Model/UsersChat");

// Save new message
const sendMessage = async (req, res) => {
  try {
    console.log("Received message payload:", req.body); // 👈 Add this line

    const { senderId, receiverId, message, adId } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const newMessage = new Message({ senderId, receiverId, message, adId });
    await newMessage.save();

    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ success: false, error: "Failed to save message" });
  }
};



// Get chat history between two users
const getMessages = async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    const chats = await Message.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ error: "Failed to get messages" });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
