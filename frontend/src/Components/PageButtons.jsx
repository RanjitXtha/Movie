import React, { useState } from 'react';

const PageButtons = ({ setPage, totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the visible page range based on the current page
  const getVisiblePages = () => {
    let startPage = currentPage > 3 ? currentPage - 2 : 1;
    return Array.from({ length: 5 }, (_, i) => startPage + i).filter((page) => page <= totalPages);
  };

  const handlePageClick = (page) => {
    setPage(page);

    if (page < currentPage) {
      // Adjust for decrementing by 2 when clicking the first button
      if (page === getVisiblePages()[0]) {
        setCurrentPage((prev) => Math.max(prev - 2, 1));
      } else {
        setCurrentPage(page);
      }
    } else if (page > currentPage && page === getVisiblePages()[3]) {
      // Increase current page and shift buttons to the left when clicking on the 4th button
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex justify-center mb-5 space-x-2 mt-4">
      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`flex justify-center items-center w-6 h-6 p-4 rounded ${
            page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PageButtons;
