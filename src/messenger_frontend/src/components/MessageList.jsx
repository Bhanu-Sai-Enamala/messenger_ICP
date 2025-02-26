import React, { useState } from "react";
import { messenger_backend } from "declarations/messenger_backend";

function MessageList({ messages, setMessages }) {
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  //  Delete Message Without Full Page Reload
  const handleDelete = async (id) => {
    try {
      await messenger_backend.deleteMessage(id);
      window.location.reload(); //  Force full reload to refresh messages
    } catch (error) {
      console.error(" Error deleting message:", error);
    }
  };

  //  Enable Edit Mode
  const startEditing = (msg) => {
    setEditingId(msg.id);
    setEditContent(msg.content);
  };

  // Save Edited Message
  const handleUpdate = async () => {
    try {
      await messenger_backend.updateMessage(editingId, editContent);
      window.location.reload(); //  Force full reload to refresh messages
    } catch (error) {
      console.error(" Error updating message:", error);
    }
  };

  return (
    <div className="message-list">
      {(!messages || messages.length === 0) ? (
        <p>No messages found.</p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="message">
            {editingId === msg.id ? (
              <>
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="edit-input"
                />
                <button onClick={handleUpdate} className="save-btn">Save</button>
                <button onClick={() => setEditingId(null)} className="cancel-btn">Cancel</button>
              </>
            ) : (
              <>
                <p className="message-content">{msg.content}</p>
                <small className="timestamp">
                  {msg.timestamp
                    ? new Date(Number(msg.timestamp) / 1000000).toLocaleString()
                    : "Unknown Time"}
                </small>
                <div className="button-group">
                  <button onClick={() => startEditing(msg)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(msg.id)} className="delete-btn">Delete</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MessageList;