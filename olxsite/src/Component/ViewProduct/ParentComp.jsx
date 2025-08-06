import { useState, useEffect } from "react";
import Inbox from "./ChatInbox";
import ChatApp from "./ChatInbox-Sec";
import './ParentComp.css'

const ParentComponent = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?._id) {
      setCurrentUserId(storedUser._id);
    }
  }, []);

  if (!currentUserId) return <div>Loading user...</div>;

  return (
    <div className="parent-container">
      <Inbox
         currentUserId={currentUserId}
  onSelectChat={(chat) => setSelectedChat({ ...chat, currentUserId })}
      />
      <div className={`chat-slide-panel ${selectedChat ? "open" : ""}`}>
        {selectedChat && <ChatApp chat={selectedChat} />}
      </div>
    </div>
  );
};

export default ParentComponent;
