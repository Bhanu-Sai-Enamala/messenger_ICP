import React from "react";
import { messenger_backend } from "declarations/messenger_backend";

function MessageList({ messages }) {
  // ✅ Delete Message
  const handleDelete = async (id) => {
    await messenger_backend.deleteMessage(id);
    window.location.reload(); // Refresh after deletion
  };

  return (
    <div>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="message">
            <p>{msg.content}</p>
            <small>{new Date(Number(msg.timestamp) / 1000000).toLocaleString()}</small>
            <button onClick={() => handleDelete(msg.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default MessageList;