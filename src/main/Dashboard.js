import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleTopicSelect = (moduleId, subtopicId = 1, voiceOver = true) => {
    try {
      navigate(`/voice-over-select/${moduleId}?subtopicId=${subtopicId}&voiceOver=${voiceOver}`);
    } catch (error) {
      console.error('Error navigating:', error);
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex gap-10 flex-col items-center justify-center p-4"
      style={{
        backgroundImage: "url('../img/pabalat1.jpg')", // Placeholder image
        backgroundSize: '100% 100%', // Use 'cover' for better responsiveness
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto p-4 fixed">
        <div
          // Glassmorphism effect: semi-transparent background, blur, subtle border, and shadow
          className="bg-white bg-opacity-10 backdrop-blur-lg border border-opacity-30 rounded-xl shadow-2xl w-full max-w-md mx-auto p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-white">Select a Topic</h2>
          <button
            onClick={() => handleTopicSelect(1)}
            className="w-full bg-blue-600 text-white p-3 rounded-lg mb-4 text-lg font-semibold transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75 transform hover:scale-105"
            aria-label="Instructional Topic"
          >
            Instructional Topic ⭐⭐⭐
          </button>
          <button
            onClick={() => handleTopicSelect(2)}
            className="w-full bg-green-600 text-white p-3 rounded-lg mb-4 text-lg font-semibold transition-all duration-300 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-75 transform hover:scale-105"
            aria-label="Frustration Topic"
          >
            Frustration Topic ⭐⭐
          </button>

          <button
            onClick={() => handleTopicSelect(3, 1, false)}
            className="w-full bg-red-600 text-white p-3 rounded-lg mb-4 text-lg font-semibold transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-75 transform hover:scale-105"
            aria-label="Non-Reader Topic"
          >
            Non-Reader Topic ⭐
          </button>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
