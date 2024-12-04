import React from 'react';

interface DayButtonProps {
  day: Date;
  dayIndex: number;
  onSelectDate: (selectedDate: Date) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>, day: Date) => void;
  setSelectedDayIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedDayIndex: number;
  dayButtonsRef: React.RefObject<(HTMLButtonElement | null)[]>;
}

const DayButton: React.FC<DayButtonProps> = ({
  day,
  dayIndex,
  onSelectDate,
  onKeyDown,
  setSelectedDayIndex,
  selectedDayIndex,
  dayButtonsRef
}) => {
  const handleFocus = () => {
    setSelectedDayIndex(dayIndex);
  };

  return (
    <button
      ref={(el) => {
        if (dayButtonsRef.current) {
          dayButtonsRef.current[dayIndex] = el;
        }
      }}
      onClick={() => onSelectDate(day)}
      onKeyDown={(event) => onKeyDown(event, day)}
      onFocus={handleFocus}
      aria-label={day.toDateString()}
      className={`w-12 h-12 flex items-center justify-center mx-auto rounded-full hover:bg-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-600 transition duration-300 ease-in-out transform hover:scale-110 ${
        selectedDayIndex === dayIndex ? 'bg-blue-400' : ''
      }`}
    >
      {day.getDate()}
    </button>
  );
};

export default DayButton;
