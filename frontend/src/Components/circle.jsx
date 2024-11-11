const Circle = ({ score }) => {
    const percentage = (score / 10) * 100;
  
    const color = score >= 8 ? 'text-green-500' : score <= 4 ? 'text-red-500' : 'text-yellow-500';
    const strokeColor = score >= 8 ? '#10B981' : score <= 4 ? '#EF4444' : '#FBBF24';
  
    return (
      <div className="flex items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 36 36" className="block max-w-[80px] max-h-[80px]">
          <path
            className="text-gray-200"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.8"
          />
          <path
            className={`${color} transition-all duration-300`}
            strokeDasharray={`${percentage}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={strokeColor}
            strokeWidth="3.8"
            strokeLinecap="round"
          />
          <text x="18" y="20.35" className=" font-bold text-xs" textAnchor="middle">
            {Math.round(percentage)}%
          </text>
        </svg>
      </div>
    );
  };
  
  export default Circle;