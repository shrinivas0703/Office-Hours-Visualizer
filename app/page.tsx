"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCoursePopup from "./addCoursePopup";
import AddAssistantPopup from './addTAPopup';
import AddOfficeHourPopup from './addOfficeHourPopup';
import EditCoursePopup from "./editCoursePopup";
import EditOfficeHourPopup from './editOfficeHourPopup';
import FilterOfficeHoursPopup from './FilterOfficeHoursPopup';

interface DeleteCoursePopupProps {
  onClose: () => void;
  onDeleteCourse: () => void;
}

interface DeleteOHPopupProps {
  onClose: () => void;
  onDeleteOH: () => void;
}

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

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [tas, setTAs] = useState<TeachingAssistant[]>([]);
  const [ohs, setOHs] = useState<OfficeHour[]>([]);
  const [isAddCoursePopupOpen, setIsAddCoursePopupOpen] = useState(false);
  const [isAddAssistantPopupOpen, setIsAddAssistantPopupOpen] = useState(false);
  const [isAddOfficeHourPopupOpen, setIsAddOfficeHourPopupOpen] = useState(false);
  const [isDeleteCoursePopupOpen, setIsDeleteCoursePopupOpen] = useState(false);
  const [isDeleteOHPopupOpen, setIsDeleteOHPopupOpen] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);

  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const [currentOH, setCurrentOH] = useState<OfficeHour | null>(null);
  const [isEditOHPopupOpen, setIsEditOHPopupOpen] = useState(false);

  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);


  useEffect(() => {
    fetchCourses();
    fetchTAs();
    fetchOHs();
  }, []);


  const DeleteCoursePopup: React.FC<DeleteCoursePopupProps> = ({ onClose, onDeleteCourse }) => {

    const handleDeleteCourse = () => {
      onDeleteCourse();
      onClose();
    };


    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div className="bg-black p-6 rounded shadow-lg relative">
          <button onClick={onClose} className="absolute top-1 right-2 text-white hover:text-gray-300">
            x
          </button>
          <div>
            <h2 className="text-2xl mb-4">Delete Course</h2>
            <p>Are you sure you want to delete this course?</p>
            <div className="flex justify-end mt-4">
              <button onClick={handleDeleteCourse} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const handleFilterClick = () => {
    setIsFilterPopupOpen(true);
  };

  const handleCloseFilterPopup = () => {
    setIsFilterPopupOpen(false);
  };


  const DeleteOHPopup: React.FC<DeleteOHPopupProps> = ({ onClose, onDeleteOH }) => {

    const handleDeleteOH = () => {
      onDeleteOH();
      onClose();
    };

    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div className="bg-black p-6 rounded shadow-lg relative">
          <button onClick={onClose} className="absolute top-1 right-2 text-white hover:text-gray-300">
            x
          </button>
          <div>
            <h2 className="text-2xl mb-4">Delete Office Hour</h2>
            <p>Are you sure you want to delete this office hour?</p>
            <div className="flex justify-end mt-4">
              <button onClick={handleDeleteOH} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
        id: courseData[0],
        department: courseData[1],
        course_number: courseData[2],
        name: courseData[3],
        email: courseData[4],
        time: courseData[5],
        location: courseData[6],
        day: courseData[7],
        capacity: courseData[8],
        duration: courseData[9],
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

  const handleEditOHClick = (OH: OfficeHour) => {
    setCurrentOH(OH);
    setIsEditOHPopupOpen(true);
  };

  const handleDeleteClick = (course: Course) => {
    setCurrentCourse(course);
    setIsDeleteCoursePopupOpen(true);
  }

  const handleDeleteOHClick = (oh: OfficeHour) => {
    setCurrentOH(oh);
    setIsDeleteOHPopupOpen(true);
  }
  
  const handleResetFilters = async () => {
    try {
      await fetchOHs();
      setDisplayMessage(false);
    } catch (error) {
      console.error('Error fetching office hours:', error);
    }
  };


  const handleApplyFilters = async (filters: any) => {
    try {
      const response = await axios.get('http://localhost:5000/api/office_hours', {
        params: filters
      });
      const mappedOHs = response.data.map((courseData:any) => ({
        id: courseData[0],
        department: courseData[1],
        course_number: courseData[2],
        name: courseData[3],
        email: courseData[4],
        time: courseData[5],
        location: courseData[6],
        day: courseData[7],
        capacity: courseData[8],
        duration: courseData[9],
      }));
      setOHs(mappedOHs);
      setDisplayMessage(true);
    } catch (error) {
      console.error('Error fetching filtered office hours:', error);
    }
  };

  const handleEditCourse = async (editedCourse: Course) => {
    try {
      // console.log(editedCourse);
      const response = await axios.put(`http://localhost:5000/api/courses`, editedCourse);
      
      if (response.status !== 200) {
        throw new Error('Failed to edit Office Hours');
      }

      fetchOHs();
      fetchCourses();
      setIsEditPopupOpen(false); // Close the edit popup
    } catch (error) {
      console.error('Error editing Office Hour:', error);
    }
  };

  const handleEditOH = async (editedOH: OfficeHour) => {
    try {
      // console.log(editedCourse);
      const response = await axios.put(`http://localhost:5000/api/office_hours`, editedOH);
      
      if (response.status !== 200) {
        throw new Error('Failed to edit course');
      }

      fetchCourses(); // Refresh the course list
      fetchOHs();
      setIsEditOHPopupOpen(false); // Close the edit popup
    } catch (error) {
      console.error('Error editing Office Hour:', error);
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

  const handleDeleteCourse = async (deletedCourse: Course) => {
    try {
      console.log(deletedCourse);
      const response = await axios.delete(`http://localhost:5000/api/courses`, { data: deletedCourse });
      
      if (response.status !== 200) {
        throw new Error('Failed to delete course');
      }

      fetchCourses(); // Refresh the course list
      fetchOHs();
      setIsDeleteCoursePopupOpen(false); // Close the edit popup
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  }

  const handleDeleteOH = async (deletedOH: OfficeHour) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/office_hours`, { data: deletedOH });
      
      if (response.status !== 200) {
        throw new Error('Failed to delete office hour');
      }

      // fetchCourses(); // Refresh the course list
      fetchOHs();
      setIsDeleteOHPopupOpen(false); // Close the delete popup
    } catch (error) {
      console.error('Error deleting office hour:', error);
    }
  }

  const totalDuration = ohs.reduce((sum, oh) => sum + oh.duration, 0);

  const meanDuration = ohs.length === 0 ? 0 : totalDuration / ohs.length;

  const totalCapacity = ohs.reduce((sum, oh) => sum + oh.capacity, 0);

  const meanCapacity = ohs.length === 0 ? 0 : totalCapacity / ohs.length;

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

  const handleCloseDeleteCoursePopup = () => {
    setIsDeleteCoursePopupOpen(false);
  };
  const handleCloseDeleteOHPopup = () => {
    setIsDeleteOHPopupOpen(false);
  };

  

  return (
    <div className="items-center min-h-screen ml-10">
      <h1 className="text-center text-2xl pt-4">CS 348 Project</h1>
      <div className="text-left justify-left">
        <h1 className='font-bold text-xl'>Courses</h1>
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
                <td className='px-4'>
                  <button onClick={() => handleDeleteClick(course)} className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded-full">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleAddCourseClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-8">
          Add a new course
        </button>
        <h1 className='font-bold text-xl'>Teaching Assistants</h1>
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
        <br></br>
        <h1 className='font-bold inline text-xl'>Office Hours</h1> 
        <button onClick={handleFilterClick} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mb-8 ml-10">
          Filter Office Hours
        </button>
        <button onClick={handleResetFilters} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mb-8 ml-6">
          Reset Filters
        </button>
        {displayMessage && <div className='mb-4'>
            
            A total of {ohs.length} entries matched your filter. <br/>
            Average Duration: {meanDuration} mins. <br/>
            Average Capacity: {meanCapacity} people. <br/>
        </div>}
        <table className="table-auto mb-4">
          <thead>
            <tr>
              <th className="pr-2">Department</th>
              <th className="px-4">Course Number</th>
              <th className="px-4">Name</th>
              <th className="px-4">Email</th>
              <th className="px-4">Time</th>
              <th className="px-4">Location</th>
              <th className="px-4">Day</th>
              <th className="px-4">Capacity</th>
              <th className="px-4">Duration (mins)</th>
            </tr>
          </thead>
          <tbody>
            {ohs.map(oh => (
              <tr key={oh.id}>
                <td className="pr-2">{oh.department}</td>
                <td className="px-4">{oh.course_number}</td>
                <td className="px-4">{oh.name}</td>
                <td className="px-4">{oh.email}</td>
                <td className="px-4">{oh.time}</td>
                <td className="px-4">{oh.location}</td>
                <td className="px-4">{oh.day}</td>
                <td className="px-4">{oh.capacity}</td>
                <td className="px-4">{oh.duration}</td>
                <td className='px-4'>
                  <button onClick={() => handleEditOHClick(oh)} className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 rounded-full">
                    Edit
                  </button>
                </td>
                <td className='px-4'>
                  <button onClick={() => handleDeleteOHClick(oh)} className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded-full">
                    Delete
                  </button>
                </td>
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
        {isDeleteCoursePopupOpen && currentCourse && 
          <DeleteCoursePopup onClose={handleCloseDeleteCoursePopup} onDeleteCourse={() => handleDeleteCourse(currentCourse)} />
        }
        {isEditOHPopupOpen && currentOH && 
          <EditOfficeHourPopup 
          onClose={() => setIsEditOHPopupOpen(false)} 
          onEditOH={handleEditOH} 
          officeHour={currentOH} 
          />
        }
        {isDeleteOHPopupOpen && currentOH && 
          <DeleteOHPopup onClose={handleCloseDeleteOHPopup} onDeleteOH={() => handleDeleteOH(currentOH)} />
        }
        {isFilterPopupOpen && 
          <FilterOfficeHoursPopup onClose={handleCloseFilterPopup} onApplyFilters={handleApplyFilters} courses={courses} />
        }
      </div>
    </div>
  );
  
};

