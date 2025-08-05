import React, { useState } from "react";
import "./ChatInbox.css";
import { FiMoreVertical, FiSearch } from "react-icons/fi";

const Inbox = () => {
  const [showOptions, setShowOptions] = useState(false);

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

      <div className="chat-item">
        <img
          src="https://via.placeholder.com/40"
          alt="User"
          className="avatar"
        />
        <div className="chat-details">
          <div className="chat-name-time">
            <span className="chat-name">Monika</span>
            <span className="chat-time">16:15</span>
          </div>
          <div className="chat-message">
            <p className="chat-title">3 months old samsung s25 ultra av...</p>
            <p className="chat-snippet">hii</p>
          </div>
        </div>
        <FiMoreVertical
          className="options-icon"
          onClick={() => setShowOptions(!showOptions)}
        />
        {showOptions && (
          <div className="chat-options">
            <div className="option">Delete Chat</div>
            <div className="option">Delete Multiple Chats</div>
            <div className="option">Mark as important</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
