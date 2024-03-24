import React, { useState, useEffect } from 'react';

interface PopupProps {
  onClose: () => void;
  onAddCourse: (courseDepartment: string, courseNumber: string, professor: string, num_students: number) => void;
  course_list: Course[];
}

interface Course {
  courseID: number;
  department: string;
  number: string;
  professor: string;
  num_students: number;
}

const addCoursePopup: React.FC<PopupProps> = ({ onClose, onAddCourse, course_list }) => {
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [courseNumber, setCourseNumber] = useState('');
  const [courseDepartment, setCourseDepartment] = useState('');
  const [professor, setProfessor] = useState('');
  const [num_students, setNumStudents] = useState(0);

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

  const handleNoClick = () => {
    setShowAddCourseForm(true);
  };


  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-black p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-white hover:text-gray-300"
        >
          x
        </button>
        {showAddCourseForm ? (
          <div>
            <h2 className="text-2xl mb-4">Add Course</h2>
            <input
              type="text"
              value={courseDepartment}
              onChange={(e) => setCourseDepartment(e.target.value)}
              placeholder="Enter department (CS, MA, etc)"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            />
            <input
              type="text"
              value={courseNumber}
              onChange={(e) => setCourseNumber(e.target.value)}
              placeholder="Enter course number (without trailing zeroes)"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            />
            <input
              type="text"
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
              placeholder="Enter professor name"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            />
            <div className='justify-left text-left py-2'> Number of Students: </div>
            <input
              type="number"
              value={num_students}
              onChange={(e) => setNumStudents(parseInt(e.target.value))}
              placeholder="Enter number of students"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            />
            <button
              onClick={() => onAddCourse(courseDepartment, courseNumber, professor, num_students)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
            >
              Add Course
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl mb-4 items-center">Add a new course</h2>
            <p>Does your course already exist?</p>
            <div>
                  <ul>
                  {course_list.map(course => (
                    <li key={course.courseID}>{course.department} - {course.number} - {course.professor} - {course.num_students}</li>
                  ))}
                  </ul>
              <div className="flex flex-row justify-center">
                <button
                  onClick={onClose}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                >
                  Yes
                </button>
                <button
                  onClick={handleNoClick}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default addCoursePopup;
