import React, { useState, useEffect } from 'react';

interface PopupProps {
  onClose: () => void;
  onAddAssistant: (email: string, name: string, year: string) => void;
  taList: TeachingAssistant[];
}

interface TeachingAssistant {
  email: string;
  name: string;
  year: string;
}

const AddTAPopup: React.FC<PopupProps> = ({ onClose, onAddAssistant, taList }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [showAddAssistantForm, setShowAddAssistantForm] = useState(false);

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

  const handleAddAssistant = () => {
    onAddAssistant(email, name, year);
    onClose();
  };

  const handleNoClick = () => {
    setShowAddAssistantForm(true);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center bg-gray-800 bg-opacity-50 justify-center">
      <div className="bg-black p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-white hover:text-gray-300"
        >
          x
        </button>
        {showAddAssistantForm ? (
          <div>
            <h2 className="text-2xl mb-4">Add Teaching Assistant</h2>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            />
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter year"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            />
            <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-black"
            >
                <option value="" disabled className="text-gray-500">Select Year</option>
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Graduate Student">Graduate Student</option>
            </select>
            <button
              onClick={handleAddAssistant}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
            >
              Add Teaching Assistant
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl mb-4">Add a new teaching assistant</h2>
            <p>Does the teaching assistant already exist?</p>
            <div>
              <ul>
                {taList.map((assistant) => (
                  <li key={assistant.email} >{assistant.email} - {assistant.name} - {assistant.year}</li>
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

export default AddTAPopup;
