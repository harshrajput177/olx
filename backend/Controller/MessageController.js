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



const getUserInbox = async (req, res) => {
  try {
    const { userId } = req.params;

    const inboxMessages = await Message.aggregate([
      {
        $addFields: {
          senderIdStr: { $toString: "$senderId" },
          receiverIdStr: { $toString: "$receiverId" },
        }
      },
      {
        $match: {
          $or: [
            { senderIdStr: userId },
            { receiverIdStr: userId },
          ]
        }
      },
      { $sort: { createdAt: -1 } },
      {
        $addFields: {
          userPair: {
            $cond: [
              { $lt: ["$senderIdStr", "$receiverIdStr"] },
              { $concat: ["$senderIdStr", "_", "$receiverIdStr"] },
              { $concat: ["$receiverIdStr", "_", "$senderIdStr"] }
            ]
          },
          otherUserId: {
            $cond: [
              { $eq: ["$senderIdStr", userId] },
              "$receiverId",
              "$senderId"
            ]
          }
        }
      },
      {
        $group: {
          _id: "$userPair",
          lastMessage: { $first: "$message" },
          senderId: { $first: "$senderIdStr" },
          receiverId: { $first: "$receiverIdStr" },
          adId: { $first: "$adId" },
          createdAt: { $first: "$createdAt" },
          docId: { $first: "$_id" },
          otherUserId: { $first: "$otherUserId" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "otherUserId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          otherUserName: "$userDetails.name"
        }
      },
      { $sort: { createdAt: -1 } }
    ]);

    res.status(200).json(inboxMessages);
  } catch (err) {
    console.error("❌ Failed to fetch inbox:", err);
    res.status(500).json({ error: "Failed to fetch inbox chats" });
  }
};



const getMessages = async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    const chats = await Message.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 },
      ],
    }).sort({ createdAt: 1 });

    res.json(chats);
  } catch (err) {
    console.error("❌ Chat fetch error:", err.message);
    res.status(500).json({ error: "Failed to get messages" });
  }
};


module.exports = {
  sendMessage,
  getUserInbox,
  getMessages
};
