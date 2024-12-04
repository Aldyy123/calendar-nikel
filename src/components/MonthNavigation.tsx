import React from 'react';

interface MonthNavigationProps {
  currentDate: Date;
  handleMonthChange: (direction: 'previous' | 'next') => void;
}

const MonthNavigation: React.FC<MonthNavigationProps> = ({ currentDate, handleMonthChange }) => {
  const year = currentDate.getFullYear();

  return (
    <div className="flex items-center justify-between mb-8 px-6">
      <button
        onClick={() => handleMonthChange('previous')}
        aria-label="Previous month"
        className="text-2xl font-bold text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out transform hover:scale-110"
      >
        &lt;
      </button>
      <div className="text-2xl font-bold text-gray-800">
        <span>{currentDate.toLocaleString('default', { month: 'long' })}</span> {year}
      </div>
      <button
        onClick={() => handleMonthChange('next')}
        aria-label="Next month"
        className="text-2xl font-bold text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out transform hover:scale-110"
      >
        &gt;
      </button>
    </div>
  );
};

export default MonthNavigation;
