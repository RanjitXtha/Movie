import React, { useEffect, useState } from 'react';

const PageButtons = ({ setPage, totalPages, currentPage }) => {
  const getVisiblePages = () => {
    let startPage = currentPage > 3 ? currentPage - 2 : 1;
    return Array.from({ length: 5 }, (_, i) => startPage + i).filter((page) => page <= totalPages);
  };

  const handlePageClick = (page) => {
    setPage(page);
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
