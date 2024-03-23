import React, { useState, useEffect } from 'react';

interface PopupProps {
  onClose: () => void;
  onAddOfficeHour: (department: string, courseNumber: string, email: string, time: string, location: string, day: string, capacity: number, duration: number) => void;
}

const AddOfficeHourPopup: React.FC<PopupProps> = ({ onClose, onAddOfficeHour}) => {
  const [department, setDepartment] = useState('');
  const [courseNumber, setCourseNumber] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [day, setDay] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleAddOfficeHour = () => {
    onAddOfficeHour(department, courseNumber, email, time, location, day, capacity, duration);
    onClose();
  };

  useEffect(() => {
    const handleEscapeKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKeyPress);

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, [onClose]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-black hover:text-gray-300"
        >
          x
        </button>
        <h2 className="text-2xl mb-4">Add Office Hour</h2>
        <input 
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter Course department (CS, MA, etc)"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
        /> 
        <input
          type="text"
          value={courseNumber}
          onChange={(e) => setCourseNumber(e.target.value)}
          placeholder="Enter Course Number"
          className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter TA Email"
          className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
        />
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Enter Time"
          className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
          className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
        />
        <div className='justify-left text-left py-2 text-black'> Day: </div>
        <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            >
            <option value="" disabled>Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
            </select>
        <div className='justify-left text-left py-2 text-black'> Capacity: </div>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value))}
          placeholder="Enter Capacity"
          className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
        />
        <div className='justify-left text-left py-2 text-black'> Duration (mins): </div>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          placeholder="Enter Duration"
          className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
        />
        <button
          onClick={handleAddOfficeHour}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
        >
          Add Office Hour
        </button>
      </div>
    </div>
  );
};

export default AddOfficeHourPopup;
