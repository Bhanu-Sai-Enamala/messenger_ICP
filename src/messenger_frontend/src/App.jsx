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

  //  Fetch messages and total count on load
  useEffect(() => {
    fetchMessages();
  }, []);

  //  Fetch messages from backend
  const fetchMessages = async () => {
    try {
      console.log("Fetching messages...");

      const total = await messenger_backend.getTotalMessages();
      console.log("Total Messages:", total);
      setTotalMessages(Number(total));

      const latest = await messenger_backend.getLatestMessages();
      console.log("Fetched Messages:", latest);

      if (!latest || !Array.isArray(latest)) {
        console.error(" ERROR: Backend did not return an array!", latest);
        setMessages([]);
        return;
      }

      //  Convert `Nat` and `Int` values to JavaScript numbers
      const formattedMessages = latest.map((msg) => ({
        id: Number(msg.id),
        content: msg.content,
        timestamp: Number(msg.timestamp),
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error(" ERROR Fetching Messages:", error);
    }
  };

  //  Fetch paginated messages
  const fetchPage = async (page) => {
    try {
      const offset = (page - 1) * messagesPerPage;
      const paginatedMessages = await messenger_backend.getMessagesPaginated(offset, messagesPerPage);

      if (!paginatedMessages || !Array.isArray(paginatedMessages)) {
        console.error(" ERROR: getMessagesPaginated() did not return an array!", paginatedMessages);
        setMessages([]);
        return;
      }

      //  Convert values to JS numbers
      const formattedMessages = paginatedMessages.map((msg) => ({
        id: Number(msg.id),
        content: msg.content,
        timestamp: Number(msg.timestamp),
      }));

      setMessages(formattedMessages);
      setCurrentPage(page);
    } catch (error) {
      console.error(" ERROR Fetching Paginated Messages:", error);
    }
  };

  //  Handle Message Creation
  const handleCreateMessage = async (content) => {
    await messenger_backend.createMessage(content);
    fetchMessages(); //  Refresh messages after creation
  };

  //  Handle Message Update
  const handleUpdateMessage = async (id, newContent) => {
    await messenger_backend.updateMessage(id, newContent);
    fetchMessages(); //  Refresh messages after update
  };

  //  Handle Message Deletion
  const handleDeleteMessage = async (id) => {
    await messenger_backend.deleteMessage(id);
    fetchMessages(); //  Refresh messages after deletion
  };

  return (
    <main>
      <h1>ICP Message Board</h1>

      {/*  Form to Create a Message */}
      <MessageForm onCreateMessage={handleCreateMessage} />

      {/*  Display Messages with Delete & Update Handlers */}
      <MessageList 
        messages={messages} 
        setMessages={setMessages} 
        onDeleteMessage={handleDeleteMessage} 
        onUpdateMessage={handleUpdateMessage} 
      />

      {/*  Pagination Component */}
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