import React from "react";

function Pagination({ totalMessages, messagesPerPage, currentPage, fetchPage }) {
  const totalPages = Math.ceil(totalMessages / messagesPerPage);

  if (totalPages <= 1) return null; // Hide pagination if only 1 page

  return (
    <div className="pagination">
      {/* Previous Button */}
      <button 
        onClick={() => fetchPage(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button 
          key={index + 1}
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => fetchPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      {/* Next Button */}
      <button 
        onClick={() => fetchPage(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;