import React, { useState, useEffect, useRef } from 'react';
import MonthNavigation from './MonthNavigation';
import DayButton from './DayButton';

const generateDays = (year: number, month: number): Date[] => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

interface AccessibleCalendarProps {
  onSelectDate: (selectedDate: Date) => void;
}

const AccessibleCalendar: React.FC<AccessibleCalendarProps> = ({ onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const dayButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = generateDays(year, month);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, day: Date) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        onSelectDate(day);
        break;
      case 'ArrowRight':
        navigateDay('next');
        break;
      case 'ArrowLeft':
        navigateDay('previous');
        break;
      case 'ArrowDown':
        navigateWeek('down');
        break;
      case 'ArrowUp':
        navigateWeek('up');
        break;
      default:
        break;
    }
  };

  const navigateDay = (direction: 'next' | 'previous') => {
    const nextIndex = direction === 'next' ? selectedDayIndex + 1 : selectedDayIndex - 1;
    if (nextIndex >= 0 && nextIndex < days.length) {
      setSelectedDayIndex(nextIndex);
    } else {
      handleMonthChange(direction === 'next' ? 'next' : 'previous');
      setSelectedDayIndex(direction === 'next' ? 0 : days.length - 1);
    }
  };

  const navigateWeek = (direction: 'up' | 'down') => {
    setSelectedDayIndex((prevIndex) => {
      const newIndex = direction === 'down' ? prevIndex + 7 : prevIndex - 7;
      return newIndex >= 0 && newIndex < days.length ? newIndex : prevIndex;
    });
  };

  const handleMonthChange = (direction: 'previous' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
    setSelectedDayIndex(0);
  };

  useEffect(() => {
    if (dayButtonsRef.current[selectedDayIndex]) {
      dayButtonsRef.current[selectedDayIndex]!.focus();
    }
  }, [selectedDayIndex]);

  const renderDayButton = (day: Date, dayIndex: number) => (
    <DayButton
      day={day}
      dayIndex={dayIndex}
      onSelectDate={onSelectDate}
      onKeyDown={handleKeyDown}
      setSelectedDayIndex={setSelectedDayIndex}
      selectedDayIndex={selectedDayIndex}
      dayButtonsRef={dayButtonsRef}
    />
  );

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gradient-to-r from-blue-100 to-blue-300 rounded-2xl shadow-2xl">
      <MonthNavigation 
        currentDate={currentDate} 
        handleMonthChange={handleMonthChange} 
      />

      <table className="w-full table-auto">
        <thead>
          <tr className="bg-blue-200 text-md text-gray-600">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <th key={day} className="py-4 px-3 text-center">{day}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 6 }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 7 }, (_, colIndex) => {
                const dayIndex = rowIndex * 7 + colIndex;
                const day = days[dayIndex];
                return day ? (
                  <td key={colIndex} className="py-3 px-4 text-center">
                    {renderDayButton(day, dayIndex)}
                  </td>
                ) : (
                  <td key={colIndex}></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccessibleCalendar;
