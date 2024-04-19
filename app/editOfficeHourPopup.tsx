import React, { useState, useEffect } from 'react';

interface Props {
  onClose: () => void;
  onEditOH: (editedOH: OfficeHour) => void;
  officeHour: OfficeHour;
}

interface OfficeHour {
    id: number;
    department: string;
    course_number: string;
    name: string;
    email: string;
    time: string;
    location: string;
    day: string;
    capacity: number;
    duration: number;
  }

const EditOfficeHourPopup: React.FC<Props> = ({ onClose, onEditOH, officeHour }) => {
  const [editedOH, setEditedOH] = useState<OfficeHour>({ ...officeHour });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedOH(prevState => ({
      ...prevState,
      [name]: value
    }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEditOH(editedOH);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-black p-6 rounded shadow-lg relative max-w-md">
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-white hover:text-gray-300"
        >
          x
        </button>
        <div>
          <h2 className="text-2xl mb-4">Edit Office Hour</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="department" className="text-white">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={editedOH.department}
              onChange={handleChange}
              placeholder="Enter department (CS, MA, etc)"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            />
            <label htmlFor="number" className="text-white">Number:</label>
            <input
              type="text"
              id="number"
              name="number"
              value={editedOH.course_number}
              onChange={handleChange}
              placeholder="Enter course number (without trailing zeroes)"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            />
            <label htmlFor="email" className="text-white">TA Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={editedOH.email}
              onChange={handleChange}
              placeholder="Enter professor name"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            />
            <label htmlFor="time" className="text-white">Time:</label>
            <input
              type="text"
              id="time"
              name="time"
              value={editedOH.time}
              onChange={handleChange}
              placeholder="Enter new time"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            />
            <label htmlFor="location" className="text-white">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={editedOH.location}
              onChange={handleChange}
              placeholder="Enter new location"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            />
            <label htmlFor="day" className="text-white">Day:</label>
            <select
              value={editedOH.day}
              onChange={(e) => setEditedOH(prevState => ({
                ...prevState,
                day: e.target.value
              }))}
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black">
              <option value="" disabled className="text-gray-500">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <label htmlFor="num_students" className="text-white">Capacity:</label>
            <input
              type="number"
              value={editedOH.capacity}
              onChange={(e) => setEditedOH(prevState => ({
                ...prevState,
                capacity: parseInt(e.target.value, 10) 
              }))}
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            />
            <label htmlFor="duration" className="text-white">Duration:</label>
            <input
              type="number"
              value={editedOH.duration}
              onChange={(e) => setEditedOH(prevState => ({
                ...prevState,
                duration: parseInt(e.target.value, 10) 
              }))}
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditOfficeHourPopup;