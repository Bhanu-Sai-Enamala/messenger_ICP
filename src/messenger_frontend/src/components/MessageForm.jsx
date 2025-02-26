import React, { useState } from "react";

function MessageForm({ onCreateMessage }) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (content.trim() === "") {
      setError("Message cannot be empty!");
      return;
    }

    setIsSubmitting(true);  //  Prevent multiple submissions
    setError(""); //  Clear any previous errors

    try {
      await onCreateMessage(content);
      setContent("");  // ✅ Clear input after successful submission
    } catch (err) {
      console.error(" Error sending message:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <input 
        type="text" 
        placeholder="Write a message..." 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        disabled={isSubmitting} //  Disable input while submitting
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </button>
      
      {/*  Display error messages */}
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default MessageForm;