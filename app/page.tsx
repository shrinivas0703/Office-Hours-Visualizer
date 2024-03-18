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
  location_text: string;
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
    fetchSections();
    fetchTAs();
    fetchOfficeHours();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get<Course[]>('/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchSections = async () => {
    try {
      const response = await axios.get<CourseSection[]>('/api/course_sections');
      setSections(response.data);
    } catch (error) {
      console.error('Error fetching course sections:', error);
    }
  };

  const fetchTAs = async () => {
    try {
      const response = await axios.get<TeachingAssistant[]>('/api/teaching_assistants');
      setTAs(response.data);
    } catch (error) {
      console.error('Error fetching teaching assistants:', error);
    }
  };

  const fetchOfficeHours = async () => {
    try {
      const response = await axios.get<OfficeHour[]>('/api/office_hours');
      setOfficeHours(response.data);
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
          <li key={course.courseID}>{course.department} - {course.number}</li>
        ))}
      </ul>

      <h1>Course Sections</h1>
      <ul>
        {sections.map(section => (
          <li key={`${section.courseID}-${section.sectionID}`}>{section.courseID} - {section.semester}</li>
        ))}
      </ul>

      <h1>Teaching Assistants</h1>
      <ul>
        {tas.map(ta => (
          <li key={ta.email}>{ta.name} - {ta.email}</li>
        ))}
      </ul>

      <h1>Office Hours</h1>
      <ul>
        {officeHours.map(officeHour => (
          <li key={`${officeHour.courseID}-${officeHour.sectionID}-${officeHour.ta_email}-${officeHour.location}-${officeHour.time}`}>{officeHour.time} - {officeHour.day}</li>
        ))}
      </ul>
    </>
  )
}

