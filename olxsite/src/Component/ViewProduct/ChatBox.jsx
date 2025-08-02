import React, { useEffect, useState } from "react";
import "../../Style/ViewProduct-css/ChatBox.css";
import SendIcon from '@mui/icons-material/Send';
import io from "socket.io-client";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const socket = io(BASE_URL);  // 🔄 Use deployed backend for socket connection

const ChatBox = ({ sellerId, currentUserId, sellerName, adId, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("join", { userId: currentUserId });

    socket.on("receive-message", (data) => {
      const { senderId, receiverId } = data;
      if (
        (senderId === sellerId && receiverId === currentUserId) ||
        (senderId === currentUserId && receiverId === sellerId)
      ) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off("receive-message");
    };
  }, [sellerId, currentUserId]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/messages/${currentUserId}/${sellerId}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };

    if (currentUserId && sellerId) {
      fetchChatHistory();
    }
  }, [currentUserId, sellerId]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const msgData = {
      senderId: currentUserId,
      receiverId: sellerId,
      message,
      adId,
    };

    console.log("Sending message:", msgData);

    socket.emit("send-message", msgData);

    try {
      await axios.post(`${BASE_URL}/api/messages/send`, msgData);
    } catch (err) {
      console.error("Error saving message:", err);
    }

    setMessages((prev) => [...prev, msgData]);
    setMessage("");
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <div>
          <strong>{sellerName}</strong>
          <div>Ad ID: {adId}</div>
        </div>
        <button className="chatbox-close" onClick={onClose}>✖</button>
      </div>

      <div className="chatbox-body">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.senderId === currentUserId ? "sent" : "received"}`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="chatbox-footer">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="chat-send-btn" onClick={handleSend}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;


