import { useState } from 'react';
import AccessibleCalendar from './components/Calendar';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="App">
      <AccessibleCalendar onSelectDate={handleSelectDate} />

      {selectedDate && (
        <div className="mt-4 text-xl text-center">
          <p>You selected: <strong>{selectedDate.toDateString()}</strong></p>
        </div>
      )}
    </div>
  );
}

export default App;
