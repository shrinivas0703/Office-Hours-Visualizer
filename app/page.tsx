'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCoursePopup from "./addCoursePopup";
import AddAssistantPopup from './addTAPopup';
import AddOfficeHourPopup from './addOfficeHourPopup';

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
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-center text-2xl pt-4">CS 348 Project</h1>
      <div className="text-center">
        <h1>Courses</h1>
        <ul>
          {courses.map(course => (
            <li key={course.courseID}>{course.department} - {course.number} - {course.professor} - {course.num_students} </li>
          ))}
        </ul>
        <h1>Teaching Assistants</h1>
        <ul>
          {tas.map(ta => (
            <li key={ta.email}>{ta.name} - {ta.email} - {ta.year}</li>
          ))}
        </ul>
        <h1>Office Hours</h1>
        <ul>
          {ohs.map(oh => (
            <li key={Math.random()}>{oh.department} - {oh.course_number} - {oh.email} - {oh.time} - {oh.location} - {oh.day} - {oh.capacity} - {oh.duration}</li>
          ))}
        </ul>
        <div className='space-x-2'>
          <button onClick={handleAddCourseClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
            Add a new course
          </button>
          <button onClick={handleAddAssistantClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
            Add a new teaching assistant
          </button>
          <button onClick={handleAddOfficeHourClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
            Add a new office hour
          </button>
        </div>
        {isAddCoursePopupOpen && 
          <AddCoursePopup onClose={handleCloseAddCoursePopup} onAddCourse={handleAddCourse} course_list={courses} />
        }

        {isAddAssistantPopupOpen && 
          <AddAssistantPopup onClose={handleCloseAddAssistantPopup} onAddAssistant={handleAddAssistant} taList={tas} />
        }

        {isAddOfficeHourPopupOpen && 
          <AddOfficeHourPopup onClose={handleCloseAddOfficeHourPopup} onAddOfficeHour={handleAddOfficeHour}/>
        }
      </div>
    </div>
  );
};
