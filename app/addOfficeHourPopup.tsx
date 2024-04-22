import React, { useState, useEffect } from 'react';

interface Course {
  courseID: number;
  department: string;
  number: string;
  professor: string;
  num_students: number;
}

interface TeachingAssistant {
  email: string;
  name: string;
  year: string;
}

interface PopupProps {
  onClose: () => void;
  onAddOfficeHour: (department: string, courseNumber: string, email: string, time: string, location: string, day: string, capacity: number, duration: number) => void;
  courses: Course[];
  ta_list: TeachingAssistant[]
}

const AddOfficeHourPopup: React.FC<PopupProps> = ({ onClose, onAddOfficeHour, courses, ta_list}) => {
  const [department, setDepartment] = useState('');
  const [courseNumber, setCourseNumber] = useState('');
  const [taName, setTaName] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [day, setDay] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tempString, setTempString] = useState("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setTempString(value);
    const [department, courseNumber] = value.split(" ");
    setDepartment(department);
    setCourseNumber(courseNumber);
  };

  const handleSelectTAChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setTaName(value);
  };

  const handleAddOfficeHour = () => {
    if (!department || !courseNumber || !taName || !time || !location || !day || !capacity || !duration) {
      alert("Please fill in all fields");
      return;
    }
    
    onAddOfficeHour(department, courseNumber, taName, time, location, day, capacity, duration);
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
      <div className="bg-black p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-black hover:text-gray-300"
        >
          x
        </button>
        <h2 className="text-2xl mb-4">Add Office Hour</h2>
        {/* <input 
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
        /> */}
        <select 
          name="course" 
          value={tempString} 
          onChange={handleSelectChange} 
          className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-2"
        >
          <option value="" disabled>Select Course</option>
          {courses.map(course => (
            <option key={course.courseID} value={`${course.department} ${course.number}`}>
              {course.department} {course.number}
            </option>
          ))}
        </select>
        <select 
          name="taName" 
          value={taName} 
          onChange={handleSelectTAChange} 
          className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-2"
        >
          <option value="" disabled>Select TA</option>
          {ta_list.map(ta => (
            <option key={ta.email} value={ta.name}>
              {ta.name}
            </option>
          ))}
        </select>
        {/* <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter TA Email"
          className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
        /> */}
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
        <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
        >
            <option value="" disabled className="text-gray-500">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
        </select>

        <div className='justify-left text-left py-2 text-white'> Capacity: </div>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value))}
          placeholder="Enter Capacity"
          className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
        />
        <div className='justify-left text-left py-2 text-white'> Duration (mins): </div>
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
