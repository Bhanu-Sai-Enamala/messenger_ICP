import React, { useState } from "react";

function MessageForm({ onCreateMessage }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (content.trim() === "") return;
    await onCreateMessage(content);
    setContent(""); // Clear input after sending
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <input 
        type="text" 
        placeholder="Write a message..." 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageForm;