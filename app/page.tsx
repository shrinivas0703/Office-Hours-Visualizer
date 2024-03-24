"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCoursePopup from "./addCoursePopup";
import AddAssistantPopup from './addTAPopup';
import AddOfficeHourPopup from './addOfficeHourPopup';
import EditCoursePopup from "./editCoursePopup";

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

interface OfficeHour {
  department: string;
  course_number: string;
  email: string;
  time: string;
  location: string;
  day: string;
  capacity: number;
  duration: number;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [tas, setTAs] = useState<TeachingAssistant[]>([]);
  const [ohs, setOHs] = useState<OfficeHour[]>([]);
  const [isAddCoursePopupOpen, setIsAddCoursePopupOpen] = useState(false);
  const [isAddAssistantPopupOpen, setIsAddAssistantPopupOpen] = useState(false);
  const [isAddOfficeHourPopupOpen, setIsAddOfficeHourPopupOpen] = useState(false);

  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  useEffect(() => {
    fetchCourses();
    fetchTAs();
    fetchOHs();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get<Course[]>('http://localhost:5000/api/courses');
      const mappedCourses: Course[] = response.data.map((courseData: any) => ({
        courseID: courseData[0],
        department: courseData[1],
        number: courseData[2],
        professor: courseData[3],
        num_students: courseData[4]
      }));
      setCourses(mappedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchTAs = async () => {
    try {
      const response = await axios.get<TeachingAssistant[]>('http://localhost:5000/api/teaching_assistants');
      const mappedTAs: TeachingAssistant[] = response.data.map((courseData: any) => ({
        email: courseData[0],
        name: courseData[1],
        year: courseData[2],
      }));
      setTAs(mappedTAs);
    } catch (error) {
      console.error('Error fetching teaching assistants:', error);
    }
  };

  const fetchOHs = async () => {
    try {
      const response = await axios.get<OfficeHour[]>('http://localhost:5000/api/office_hours');
      const mappedOHs: OfficeHour[] = response.data.map((courseData: any) => ({
        department: courseData[0],
        course_number: courseData[1],
        email: courseData[2],
        time: courseData[3],
        location: courseData[4],
        day: courseData[5],
        capacity: courseData[6],
        duration: courseData[7],
      }));
      setOHs(mappedOHs);
    } catch (error) {
      console.error('Error fetching office hours:', error);
    }
  };

  const handleAddCourse = async (courseDepartment: string, courseNumber: string, professor: string, num_students: number) => {
    try {
      const response = await axios.post('http://localhost:5000/api/courses', {
        courseDepartment,
        courseNumber,
        professor,
        num_students
      });
      
      if (response.status !== 200) {
        throw new Error('Failed to add course');
      }

      fetchCourses();
      handleCloseAddCoursePopup();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleEditClick = (course: Course) => {
    setCurrentCourse(course);
    setIsEditPopupOpen(true);
  };

  const handleEditCourse = async (editedCourse: Course) => {
    try {
      console.log(editedCourse);
      const response = await axios.put(`http://localhost:5000/api/courses`, editedCourse);
      
      if (response.status !== 200) {
        throw new Error('Failed to edit course');
      }

      fetchCourses(); // Refresh the course list
      setIsEditPopupOpen(false); // Close the edit popup
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };

  const handleAddAssistant = async (email: string, name: string, year: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/teaching_assistants', {
        email,
        name,
        year
      });
      
      if (response.status !== 200) {
        throw new Error('Failed to add teaching assistant');
      }

      fetchTAs();
      handleCloseAddAssistantPopup();
    } catch (error) {
      console.error('Error adding teaching assistant:', error);
    }
  };

  const handleAddOfficeHour = async (department: string, courseNumber: string, email: string, time: string, location: string, day: string, capacity: number, duration: number) => {
    try {
      const response = await axios.post('http://localhost:5000/api/office_hours', {
        department,
        courseNumber,
        email,
        time,
        location,
        day,
        capacity,
        duration
      });
      
      if (response.status !== 200) {
        throw new Error('Failed to add office hour');
      }

      fetchOHs();
      handleCloseAddOfficeHourPopup();
    } catch (error) {
      console.error('Error adding office hour:', error);
    }
  };

  const handleAddCourseClick = () => {
    setIsAddCoursePopupOpen(true);
  };

  const handleCloseAddCoursePopup = () => {
    setIsAddCoursePopupOpen(false);
  };

  const handleAddAssistantClick = () => {
    setIsAddAssistantPopupOpen(true);
  };

  const handleCloseAddAssistantPopup = () => {
    setIsAddAssistantPopupOpen(false);
  };

  const handleAddOfficeHourClick = () => {
    setIsAddOfficeHourPopupOpen(true);
  };

  const handleCloseAddOfficeHourPopup = () => {
    setIsAddOfficeHourPopupOpen(false);
  };

  return (
    <div className="items-center min-h-screen ml-10">
      <h1 className="text-center text-2xl pt-4">CS 348 Project</h1>
      <div className="text-left justify-left">
        <h1 className='font-bold'>Courses</h1>
        <table className="table-auto mb-4">
          <thead>
            <tr>
              <th className="pr-2">Department</th>
              <th className="px-4">Number</th>
              <th className="px-4">Professor</th>
              <th className="px-4">Number of Students</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.courseID} className="mb-5">
                <td className="pr-2">{course.department}</td>
                <td className="px-4">{course.number}</td>
                <td className="px-4">{course.professor}</td>
                <td className="px-4">{course.num_students}</td>
                <td className='px-4'>
                  <button onClick={() => handleEditClick(course)} className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 rounded-full">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleAddCourseClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-8">
          Add a new course
        </button>
        <h1 className='font-bold'>Teaching Assistants</h1>
        <table className="table-auto mb-4">
          <thead>
            <tr>
              <th className="pr-2">Name</th>
              <th className="px-4">Email</th>
              <th className="px-4">Year</th>
            </tr>
          </thead>
          <tbody>
            {tas.map(ta => (
              <tr key={ta.email}>
                <td className="pr-2">{ta.name}</td>
                <td className="px-4">{ta.email}</td>
                <td className="px-4">{ta.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleAddAssistantClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-8">
          Add a new teaching assistant
        </button>
        <h1 className='font-bold'>Office Hours</h1>
        <table className="table-auto mb-4">
          <thead>
            <tr>
              <th className="pr-2">Department</th>
              <th className="px-4">Course Number</th>
              <th className="px-4">Email</th>
              <th className="px-4">Time</th>
              <th className="px-4">Location</th>
              <th className="px-4">Day</th>
              <th className="px-4">Capacity</th>
              <th className="px-4">Duration</th>
            </tr>
          </thead>
          <tbody>
            {ohs.map(oh => (
              <tr key={Math.random()}>
                <td className="pr-2">{oh.department}</td>
                <td className="px-4">{oh.course_number}</td>
                <td className="px-4">{oh.email}</td>
                <td className="px-4">{oh.time}</td>
                <td className="px-4">{oh.location}</td>
                <td className="px-4">{oh.day}</td>
                <td className="px-4">{oh.capacity}</td>
                <td className="px-4">{oh.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleAddOfficeHourClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-8">
          Add a new office hour
        </button>
        {isAddCoursePopupOpen && 
          <AddCoursePopup onClose={handleCloseAddCoursePopup} onAddCourse={handleAddCourse} course_list={courses} />
        }
  
        {isAddAssistantPopupOpen && 
          <AddAssistantPopup onClose={handleCloseAddAssistantPopup} onAddAssistant={handleAddAssistant} taList={tas} />
        }
  
        {isAddOfficeHourPopupOpen && 
          <AddOfficeHourPopup onClose={handleCloseAddOfficeHourPopup} onAddOfficeHour={handleAddOfficeHour}/>
        }
        {isEditPopupOpen && currentCourse && 
        <EditCoursePopup 
          onClose={() => setIsEditPopupOpen(false)} 
          onEditCourse={handleEditCourse} 
          course={currentCourse} 
        />
        }
      </div>
    </div>
  );
  
};

