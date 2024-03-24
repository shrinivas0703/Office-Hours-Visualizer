import React, { useState, useEffect } from 'react';

interface Props {
  onClose: () => void;
  onEditCourse: (editedCourse: Course) => void;
  course: Course;
}

interface Course {
    courseID: number;
    department: string;
    number: string;
    professor: string;
    num_students: number;
  }

const EditCoursePopup: React.FC<Props> = ({ onClose, onEditCourse, course }) => {
  const [editedCourse, setEditedCourse] = useState<Course>({ ...course });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedCourse(prevState => ({
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
    onEditCourse(editedCourse);
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
          <h2 className="text-2xl mb-4">Edit Course</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="department" className="text-white">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={editedCourse.department}
              onChange={handleChange}
              placeholder="Enter department (CS, MA, etc)"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            />
            <label htmlFor="number" className="text-white">Number:</label>
            <input
              type="text"
              id="number"
              name="number"
              value={editedCourse.number}
              onChange={handleChange}
              placeholder="Enter course number (without trailing zeroes)"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            />
            <label htmlFor="professor" className="text-white">Professor:</label>
            <input
              type="text"
              id="professor"
              name="professor"
              value={editedCourse.professor}
              onChange={handleChange}
              placeholder="Enter professor name"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            />
            <label htmlFor="num_students" className="text-white">Number of Students:</label>
            <input
              type="number"
              id="num_students"
              name="num_students"
              value={editedCourse.num_students}
              onChange={handleChange}
              placeholder="Enter number of students"
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

export default EditCoursePopup;