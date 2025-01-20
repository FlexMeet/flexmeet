'use client';

import { useState } from 'react';
import Calendar from 'react-calendar'; // For dynamic calendar
import 'react-calendar/dist/Calendar.css'; // Include calendar styles

// Create an array of 24-hour timings in 30-minute increments
const timings = [];
for (let i = 0; i < 24; i++) {
  const hour = i < 10 ? `0${i}` : i;
  timings.push(
    `${hour}:00`,
    `${hour}:30`
  );
}

// Filter available "To" timings based on selected "From" time
const filterToOptions = (fromTime) => {
  if (!fromTime) return timings;
  
  const fromIndex = timings.findIndex(time => time === fromTime);
  return timings.slice(fromIndex + 1);
};

// Custom Dropdown Component for Time Selection
const CustomDropdown = ({ fromTime, filterToOptions, setTime, selectedTime, setSelectedTime, isFromDropdown }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedTime(option);
    setTime(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Show the selected time or "Select time" if no time is selected */}
      <input
        type="text"
        value={selectedTime || 'Select time'}  // Controlled value
        onClick={toggleDropdown}               // Toggle dropdown on click
        className={`w-full p-2 border rounded cursor-pointer text-black ${selectedTime ? '' : 'text-gray-400'}`}  // Apply gray text color for "Select time"
        readOnly
      />

      {isOpen && (
        <div
          className="absolute w-full mt-1 bg-white border rounded max-h-64 overflow-y-auto"
          style={{ zIndex: 1000 }}
        >
          {isFromDropdown
            ? timings.map((time, index) => (  // Always show all timings for "From"
                <div
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelect(time)}
                >
                  {time}
                </div>
              ))
            : filterToOptions(fromTime).map((time, index) => (  // Filtered timings for "To"
                <div
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelect(time)}
                >
                  {time}
                </div>
              ))
          }
        </div>
      )}
    </div>
  );
};

// Setup Component (wrap all code inside this function)
const Setup = () => {
  const [date, setDate] = useState(new Date());
  const [fromTime, setFromTime] = useState('');
  const [selectedToTime, setSelectedToTime] = useState('');
  const [activeOptionGroup1, setActiveOptionGroup1] = useState('specificDates'); // Define state for active button
  const [activeOptionGroup2, setActiveOptionGroup2] = useState('datesAndTime'); // Define state for second button group

  // Reset "To" time whenever "From" time is changed
  const handleFromTimeChange = (newFromTime) => {
    setFromTime(newFromTime);
    setSelectedToTime(''); // Reset "To" time
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-white p-8 flex flex-col justify-center px-48">
        <h2 className="text-2xl font-bold mb-6">Event Name</h2>
        <input
          type="text"
          placeholder="Name your event..."
          className="w-full p-3 mb-6 border rounded focus:ring-2 focus:ring-tele"
        />

        {/* Button Groups */}
        <div className="flex mb-4">
          <button
            className={`flex-1 px-4 py-2 rounded-l ${
              activeOptionGroup1 === 'specificDates'
                ? 'bg-tele text-white'
                : 'bg-white text-black border'
            }`}
            onClick={() => setActiveOptionGroup1('specificDates')}
          >
            Specific dates
          </button>
          <button
            className={`flex-1 px-4 py-2 rounded-r ${
              activeOptionGroup1 === 'daysOfWeek'
                ? 'bg-tele text-white'
                : 'bg-white text-black border'
            }`}
            onClick={() => setActiveOptionGroup1('daysOfWeek')}
          >
            Days of the week
          </button>
        </div>

        <div className="flex mb-6">
          <button
            className={`flex-1 px-4 py-2 rounded-l ${
              activeOptionGroup2 === 'datesAndTime'
                ? 'bg-tele text-white'
                : 'bg-white text-black border'
            }`}
            onClick={() => setActiveOptionGroup2('datesAndTime')}
          >
            Dates and Time
          </button>
          <button
            className={`flex-1 px-4 py-2 rounded-r ${
              activeOptionGroup2 === 'datesOnly'
                ? 'bg-tele text-white'
                : 'bg-white text-black border'
            }`}
            onClick={() => setActiveOptionGroup2('datesOnly')}
          >
            Dates only
          </button>
        </div>

        {/* Conditional "Timing Range" Option */}
        {activeOptionGroup2 === 'datesAndTime' && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Timing range</h3>
            <div className="flex gap-4 mb-6">
              <div className="flex flex-row items-center">
                <label htmlFor="from" className="text-sm mr-2">From</label>
                <CustomDropdown
                  fromTime={fromTime}
                  filterToOptions={filterToOptions}
                  setTime={handleFromTimeChange} // Call custom handler to reset "To" time
                  selectedTime={fromTime}
                  setSelectedTime={setFromTime}
                  isFromDropdown={true}  // Ensure "From" always shows all timings
                />
              </div>
              <div className="flex flex-row items-center">
                <label htmlFor="to" className="text-sm mr-2">To</label>
                <CustomDropdown
                  fromTime={fromTime}
                  filterToOptions={filterToOptions}
                  setTime={setSelectedToTime}
                  selectedTime={selectedToTime}
                  setSelectedTime={setSelectedToTime}
                  isFromDropdown={false}  // Apply filter to "To" based on "From"
                />
              </div>
            </div>
          </div>
        )}

        <button className="w-full bg-tele text-white py-2 rounded hover:bg-tele">
          Create Event
        </button>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-tele flex items-center justify-center">
        <div className="bg-white p-4 rounded shadow">
          <Calendar
            onChange={setDate}
            value={date}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Setup;
