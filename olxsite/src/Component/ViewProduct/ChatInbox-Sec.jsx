import React from "react";
import "./ChatInbox-Sec.css";

const ChatApp = () => {
  return (
    <div className="chat-container">
      <header className="chat-header">
        <img src="https://upload.wikimedia.org/wikipedia/en/5/50/Harvey_Specter.jpg" alt="Harvey Specter" />
        <h2>Harvey Specter</h2>
        <div className="icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </header>

      <div className="chat-body">
        <div className="message left dark">How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</div>
        <div className="message right light">When you're backed against the wall, break the god damn thing down.</div>
        <div className="message right light">Excuses don't win championships.</div>
        <div className="message left dark">Oh yeah, did Michael Jordan tell you that?</div>
        <div className="message right light">No, I told him that.</div>
      </div>

      <div className="chat-input">
        <input type="text" placeholder="Write your message..." />
        <button><i className="fas fa-paper-plane"></i></button>
      </div>
    </div>
  );
};

export default ChatApp;
