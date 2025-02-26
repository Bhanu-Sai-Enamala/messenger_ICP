import React, { useState, useEffect } from "react";
import Pagination from "./components/Pagination";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
import { messenger_backend } from "declarations/messenger_backend"; // ICP Canister

function App() {
  const [messages, setMessages] = useState([]);
  const [totalMessages, setTotalMessages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 10;

  // ✅ Fetch total messages and latest messages on load
  useEffect(() => {
    async function fetchData() {
      const total = await messenger_backend.getTotalMessages();
      setTotalMessages(total);

      const latest = await messenger_backend.getLatestMessages();
      setMessages(latest);
    }
    fetchData();
  }, []);

  // ✅ Fetch messages for a specific page
  const fetchPage = async (page) => {
    const offset = (page - 1) * messagesPerPage;
    const paginatedMessages = await messenger_backend.getMessagesPaginated(offset, messagesPerPage);
    setMessages(paginatedMessages);
    setCurrentPage(page);
  };

  // ✅ Handle Message Creation
  const handleCreateMessage = async (content) => {
    await messenger_backend.createMessage(content);
    fetchPage(1); // Refresh latest messages
  };

  return (
    <main>
      <h1>ICP Message Board</h1>

      {/* ✅ Form to Create a Message */}
      <MessageForm onCreateMessage={handleCreateMessage} />

      {/* ✅ Display Messages */}
      <MessageList messages={messages} />

      {/* ✅ Pagination Component */}
      <Pagination
        totalMessages={totalMessages}
        messagesPerPage={messagesPerPage}
        currentPage={currentPage}
        fetchPage={fetchPage}
      />
    </main>
  );
}

export default App;