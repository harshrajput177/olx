import React, { useEffect, useState } from "react";
import "./ChatInbox.css";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import axios from "axios";
import PersonIcon from '@mui/icons-material/Person';

const Inbox = ({ onSelectChat, currentUserId }) => {
  const [showOptions, setShowOptions] = useState(null);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
     const res = await axios.get(
  `${import.meta.env.VITE_API_BASE_URL}/api/messages/inbox/${currentUserId}`
);

        setChatList(res.data);
        console.log("📬 Inbox API response:", res.data);
      } catch (err) {
        console.error("Error fetching inbox", err);
      }
    };

    fetchInbox();
  }, [currentUserId]);

  return (
    <div className="inbox-container">
      <div className="inbox-header">
        <h2>INBOX</h2>
        <FiSearch className="search-icon" />
      </div>

      <div className="quick-filters">
        <button className="filter active">All</button>
        <button className="filter">Meeting</button>
        <button className="filter">Unread</button>
        <button className="filter">Important</button>
      </div>

{chatList.map((chat, index) => {
  return (
    <div key={chat._id} className="Inbox-chat-item">
<PersonIcon
  className="chat-person-icon"
  onClick={() =>
    onSelectChat({
      id: otherUserId,
      adId: chat.adId,
    })
  }
/>

      <div
        className="chat-details"
        onClick={() =>
          onSelectChat({
            id: chat.otherUserId,
            adId: chat.adId,
            name: chat.otherUserName, // 👈 directly use
          })
        }
      >
        <div className="chat-name-time">
          <span className="chat-name">{chat.otherUserName}</span>
          <span className="chat-time">
            {new Date(chat.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="chat-message">
          <p className="chat-title">{chat.adId}</p>
          <p className="chat-snippet">{chat.lastMessage}</p>
        </div>
      </div>

      <FiMoreVertical
        className="options-icon"
        onClick={() => setShowOptions(showOptions === index ? null : index)}
      />
      {showOptions === index && (
        <div className="chat-options">
          <div className="option">Delete Chat</div>
          <div className="option">Delete Multiple Chats</div>
          <div className="option">Mark as important</div>
        </div>
      )}
    </div>
  );
})}

    </div>
  );
};

export default Inbox;


