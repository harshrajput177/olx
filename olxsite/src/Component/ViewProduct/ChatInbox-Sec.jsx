import React, { useEffect, useState } from "react";
import "./ChatInbox-Sec.css";
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import PersonIcon from '@mui/icons-material/Person';

const ChatApp = ({ chat }) => {
  if (!chat) return null;

  const { id: otherUserId, adId, name, currentUserId } = chat;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/messages/${currentUserId}/${otherUserId}`);

        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching chat", err);
      }
    };

    if (otherUserId && currentUserId) {
      fetchMessages();
    }
  }, [otherUserId, currentUserId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/messages/send`, {
        senderId: currentUserId,
        receiverId: otherUserId,
        message: newMessage,
        adId: adId || "AD-temp"
      });

      setMessages((prev) => [...prev, { senderId: currentUserId, message: newMessage }]);
      setNewMessage("");
    } catch (err) {
      console.error("Send failed", err);
    }
  };

  return (
    <div className="Sec-chat-container">
      <header className="Sec-chat-header">
       <PersonIcon
  className="chat-person-icon"
  onClick={() =>
    onSelectChat({
      id: otherUserId,
      adId: chat.adId,
    })
  }
/>
        <h2>{name}</h2>
      </header>

      <div className="Sec-chat-body">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${
              msg.senderId === currentUserId ? "right light" : "left dark"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="Sec-chat-input">
        <input
          type="text"
          placeholder="Write your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSend}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatApp;

