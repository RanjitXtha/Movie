import React from 'react';

const Ratingbar = ({ score }) => {
  const percentage = (score / 10) * 100;

  const bgColor = score >= 8 ? 'bg-green-500' : score <= 4 ? 'bg-red-500' : 'bg-yellow-500';

  return (
    <div className="w-[10rem] h-3 max-w-xs bg-gray-200 rounded-lg overflow-hidden">
      <div
        className={`${bgColor} h-full rounded-lg transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="text-center text-sm mt-2 text-white font-bold">
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

export default Ratingbar;