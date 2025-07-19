import React, { useState, useEffect, cloneElement, isValidElement } from 'react';
import { pauseAudio, stopAudio, resumeAudio } from './ListnrTTS';

const SlideTemplate = ({ backgroundImage, children }) => {
  const [isPaused, setIsPaused] = useState(false);

  // Function to pause the audio
  const handlePause = () => {
    pauseAudio();
    setIsPaused(true);
  };

  // Function to resume or restart the audio
  const handleResume = () => {
    if (isPaused) {
      resumeAudio(); // Resume the paused audio
    } else {
      stopAudio(); // Ensure any existing audio is stopped
      // Implement logic to restart TTS if needed
    }
    setIsPaused(false);
  };

  // Stop audio when the component unmounts
  useEffect(() => {
    return () => {
      stopAudio(); // Stop any ongoing audio when unmounting
    };
  }, []);

  return (
    <div className="p-6 container mx-auto mt-5">
      <div 
        style={{ backgroundImage: `url('${backgroundImage}')`, minHeight: '60vh' }} 
        className="p-3 rounded-lg bg-cover bg-center flex flex-col"
      >
        {React.Children.map(children, (child) =>
          isValidElement(child) ? cloneElement(child) : child
        )}
      </div>
      
    </div>
  );
};

export default SlideTemplate;
