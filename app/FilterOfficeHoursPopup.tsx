import React, { useState, useEffect } from 'react';

interface FilterOfficeHoursPopupProps {
  onClose: () => void;
  onApplyFilters: (filters: any) => void; 
}

const FilterOfficeHoursPopup: React.FC<FilterOfficeHoursPopupProps> = ({ onClose, onApplyFilters }) => {
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
    department: '',
    course_number: '',
    day: '',
    location: '',
    capacity: '',
  });

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            Department
          </label>
          <input type="text" name="department" value={filters.department} onChange={handleFilterChange} className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Course Number
          </label>
          <input type="text" name="course_number" value={filters.course_number} onChange={handleFilterChange} className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
        <label htmlFor="day" className="text-white">Day:</label>
            <select
              value={filters.day}
              onChange={(e) => setFilters((prevState: any) => ({
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
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Location
          </label>
          <input type="text" name="location" value={filters.location} onChange={handleFilterChange} className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Capacity
          </label>
          <input type="number" name="capacity" value={filters.capacity} onChange={handleFilterChange} className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
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
