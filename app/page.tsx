'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Course {
  courseID: number;
  department: string;
  number: string;
}

interface CourseSection {
  courseID: number;
  sectionID: number;
  semester: string;
  num_students: number;
}

interface TeachingAssistant {
  email: string;
  name: string;
  year: string;
}

interface OfficeHour {
  courseID: number;
  sectionID: number;
  ta_email: string;
  location: number;
  time: string;
  duration: string;
  day: string;
  capacity: number;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [sections, setSections] = useState<CourseSection[]>([]);
  const [tas, setTAs] = useState<TeachingAssistant[]>([]);
  const [officeHours, setOfficeHours] = useState<OfficeHour[]>([]);

  useEffect(() => {
    fetchCourses();
    // fetchSections();
    fetchTAs();
    // fetchOfficeHours();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get<Course[]>('http://localhost:5000/api/courses');
      const mappedCourses: Course[] = response.data.map((courseData: any) => ({
        courseID: courseData[0],
        department: courseData[1],
        number: courseData[2],
      }));
      setCourses(mappedCourses);
      // console.log(mappedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchSections = async () => {
    try {
      const response = await axios.get<CourseSection[]>('http://localhost:5000/api/course_sections');
      const mappedCourseSections: CourseSection[] = response.data.map((courseData: any) => ({
        courseID: courseData[0],
        sectionID: courseData[1],
        semester: courseData[2],
        num_students: courseData[3],
      }));
      setSections(mappedCourseSections);
    } catch (error) {
      console.error('Error fetching course sections:', error);
    }
  };

  const fetchTAs = async () => {
    try {
      const response = await axios.get<TeachingAssistant[]>('http://localhost:5000//api/teaching_assistants');
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

  const fetchOfficeHours = async () => {
    try {
      const response = await axios.get<OfficeHour[]>('http://localhost:5000/api/office_hours');
      const mappedOfficeHours: OfficeHour[] = response.data.map((courseData: any) => ({
        courseID: courseData[0],
        sectionID: courseData[1],
        ta_email: courseData[2],
        time: courseData[3],
        duration: courseData[4],
        location: courseData[5],
        day: courseData[6], 
        capacity: courseData[7],
      }));
      setOfficeHours(mappedOfficeHours);
    } catch (error) {
      console.error('Error fetching office hours:', error);
    }
  };

  return (
    <>
        <h1 className='text-center text-2xl pt-4'> CS 348 Project</h1>
        <h1>Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course.courseID}>{course.courseID} - {course.department} - {course.number}</li>
        ))}
      </ul>

      <h1>Teaching Assistants</h1>
      <ul>
        {tas.map(ta => (
          <li key={ta.email}>{ta.email} - {ta.name} - {ta.year}</li>
        ))}
      </ul>
    </>
  )
}

