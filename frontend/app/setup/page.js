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
const CustomDropdown = ({ fromTime, filterToOptions, setTime, selectedTime, setSelectedTime }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedTime(option);
    setTime(option);
    setIsOpen(false);
  };

const [selectedDay, setSelectedDay] = useState(null);

const handleDayClick = (day) => {
  setSelectedDay(day);
};

  return (
    <div className="relative w-full">
      {/* Show the selected time or "Select time" if no time is selected */}
      <input
        type="text"
        value={selectedTime || 'Select time'}  // Controlled value
        onClick={toggleDropdown}               // Toggle dropdown on click
        className="w-full p-2 border rounded cursor-pointer text-black"
        readOnly
      />

      {isOpen && (
        <div
          className="absolute w-full mt-1 bg-white border rounded max-h-64 overflow-y-auto"
          style={{ zIndex: 1000 }}
        >
          {fromTime
            ? filterToOptions(fromTime).map((time, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelect(time)}
                >
                  {time}
                </div>
              ))
            : timings.map((time, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelect(time)}
                >
                  {time}
                </div>
              ))}
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

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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
                  setTime={setFromTime}
                  selectedTime={fromTime}
                  setSelectedTime={setFromTime}
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
        <div className="p-4 w-half">
          {/* Conditional Rendering: Show Calendar or Days of the Week in Separate Containers */}
          {activeOptionGroup1 === 'specificDates' && (
            <div className="calendar-container">
              <h3 className="text-xl font-semibold text-white text-center mb-2">Select a Date</h3>
              <Calendar
                onChange={setDate}
                value={date}
                className="rounded-lg"
              />
            </div>
          )}

          {activeOptionGroup1 === 'daysOfWeek' && (
            <div className="days-container p-4">
              <h3 className="text-xl text-center text-white font-semibold mb-2">Select a Day</h3>
              <div className="grid grid-cols-7 gap-0">
                {daysOfWeek.map((day, index) => (
                  <button
                    key={index}
                    className="px-6 py-4 border-2 border-white text-white hover:bg-transparent hover:text-white transition-colors"
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setup;
