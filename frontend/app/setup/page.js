'use client';

import { useState } from 'react';
import Calendar from 'react-calendar'; // For dynamic calendar
import 'react-calendar/dist/Calendar.css'; // Include calendar styles

export default function Setup() {
  const [activeOptionGroup1, setActiveOptionGroup1] = useState('specificDates'); // Selected button for the first group
  const [activeOptionGroup2, setActiveOptionGroup2] = useState('datesAndTime'); // Selected button for the second group
  const [date, setDate] = useState(new Date()); // Selected date for the calendar
  const [fromTime, setFromTime] = useState(''); // From time selected
  const [selectedToTime, setSelectedToTime] = useState(''); // Selected To time

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
    return timings.slice(fromIndex + 1); // Ensures "To" times are after "From" times
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

    return (
      <div className="relative">
        <div
          className={`p-2 border rounded cursor-pointer ${selectedTime ? 'text-black' : 'text-gray-400'}`} // Conditionally apply text color
          onClick={toggleDropdown}>
          {selectedTime || 'Select time'}
        </div>

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

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-white p-8 flex flex-col justify-center px-64">
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
                  setTime={setFromTime} // Pass setFromTime to update "fromTime"
                  selectedTime={fromTime}
                  setSelectedTime={setFromTime}
                />
              </div>
              <div className="flex flex-row items-center">
                <label htmlFor="to" className="text-sm mr-2">To</label>
                <CustomDropdown
                  fromTime={fromTime}
                  filterToOptions={filterToOptions}
                  setTime={setSelectedToTime} // Pass setSelectedToTime to update "toTime"
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
}
