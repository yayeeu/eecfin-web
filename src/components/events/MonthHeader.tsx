
import React from 'react';

interface MonthHeaderProps {
  monthYear: string;
}

const MonthHeader: React.FC<MonthHeaderProps> = ({ monthYear }) => {
  // For the screenshot-inspired design, we'll display just the month prominently
  return (
    <div className="flex items-center my-4">
      <div className="flex items-center justify-center bg-blue-600 text-white rounded-full w-8 h-8 mr-3">
        <span className="font-bold">{monthYear.split(' ')[0].substring(0, 1)}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900">
        {monthYear}
      </h3>
    </div>
  );
};

export default MonthHeader;
