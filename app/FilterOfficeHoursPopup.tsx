import React, { useState, useEffect } from 'react';

interface Course {
  courseID: number;
  department: string;
  number: string;
  professor: string;
  num_students: number;
}

interface OfficeHour {
  id: number;
  department: string;
  course_number: string;
  name:string;
  email: string;
  time: string;
  location: string;
  day: string;
  capacity: number;
  duration: number;
}

interface FilterOfficeHoursPopupProps {
  onClose: () => void;
  onApplyFilters: (filters: any) => void; 
  courses: Course[];
  office_hours: OfficeHour[];
}

const FilterOfficeHoursPopup: React.FC<FilterOfficeHoursPopupProps> = ({ onClose, onApplyFilters, courses, office_hours }) => {
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

  const [filters, setFilters] = useState<any>({
    department_course: '',
    day: '',
    location: '',
    capacity: '',
  });

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-black p-6 rounded shadow-lg relative max-w-md">
        <button onClick={onClose} className="absolute top-1 right-2 text-gray-600 hover:text-gray-900">
          x
        </button>
        <h2 className="text-2xl mb-4">Filter Office Hours</h2>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Course
          </label>
          <select name="department_course" value={filters.department_course} onChange={handleSelectChange} className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline">
            <option value="" disabled>Select Course</option>
            {courses.map(course => (
              <option key={course.courseID} value={`${course.department} ${course.number}`}>{course.department} {course.number}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="day" className="block text-white text-sm font-bold mb-2">Day</label>
            <select
              name="day"
              value={filters.day}
              onChange={handleSelectChange}
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black">
              <option value="" disabled>Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-white text-sm font-bold mb-2">Location</label>
          <select name="location" value={filters.location} onChange={handleSelectChange} className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline">
              <option value="" disabled>Select Location</option>
              {office_hours.map(office_hour => (
                <option key={office_hour.id} value={office_hour.location}>{office_hour.location}</option>
              ))}
          </select>
        </div>
        {/* <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Location
          </label>
          <input type="text" name="location" value={filters.location} onChange={handleInputChange} className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
        </div> */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Minimum Capacity
          </label>
          <input type="number" name="capacity" value={filters.capacity} onChange={handleInputChange} className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={handleApplyFilters} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterOfficeHoursPopup;