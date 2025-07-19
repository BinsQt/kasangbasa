import React, { useEffect, Children } from 'react'; // Removed useState, cloneElement, isValidElement
import { stopAudio } from './ListnrTTS'; // Only stopAudio is directly relevant for unmount

const SlideTemplate = ({ backgroundImage, children }) => {

  // Stop audio when the component unmounts
  // This ensures that if a user navigates away from a slide or the module,
  // any playing audio from that slide is stopped.
  useEffect(() => {
    return () => {
      stopAudio(); // Stop any ongoing audio when unmounting
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <div className="p-6 container mx-auto mt-5">
      <div
        style={{ backgroundImage: `url('${backgroundImage}')`, minHeight: '60vh' }}
        className="p-3 rounded-lg bg-cover bg-center flex flex-col"
      >
        {/*
          Render children directly. The audio control logic (play/pause/mute)
          is handled by the parent Module component, making handlePause/onResume
          unnecessary in this template component.
          Using Children.toArray to ensure children are always an array,
          which is good practice when mapping over children.
        */}
        {Children.toArray(children)}
      </div>
    </div>
  );
};

export default SlideTemplate;
