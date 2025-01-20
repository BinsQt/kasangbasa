import React, { useState, useEffect, cloneElement, isValidElement } from 'react';
import { convertTextToSpeech, pauseAudio, stopAudio, resumeAudio, speakLocal } from './ListnrTTS'; // Ensure correct import

const SlideTemplate = ({ backgroundImage, children, voiceOver }) => {
  const [audioEnabled, setAudioEnabled] = useState(voiceOver);
  const [currentText, setCurrentText] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [isLocalTTS, setIsLocalTTS] = useState(false);
  const [localUtterance, setLocalUtterance] = useState(null); // Store the local TTS utterance

  useEffect(() => {
    if (audioEnabled && currentText) {
      const capitalLetters = currentText.match(/[A-ZÑ]/g);
      if (capitalLetters) {
        convertTextToSpeech(capitalLetters.join(''))
          .then(() => {
            setIsPaused(false); // Ensure audio is not paused when new slide text is loaded
            setIsLocalTTS(false);
          })
          .catch(() => {
            const utterance = speakLocal(capitalLetters.join(''));
            setLocalUtterance(utterance);
            setIsLocalTTS(true);
          });
      }
    }
  }, [audioEnabled, currentText]);

  const readAloud = (text, isWord) => {
    // Stop any ongoing audio
    stopAudio();
    window.speechSynthesis.cancel(); // Stop local TTS

    setCurrentText(text);
    setIsPaused(false); // Ensure audio is not paused when new text is set
    const capitalLetters = text.match(/[A-ZÑ]/g);
    if (isWord || !audioEnabled) {
      if (capitalLetters) {
        convertTextToSpeech(capitalLetters.join(''))
          .catch(() => {
            const utterance = speakLocal(capitalLetters.join(''));
            setLocalUtterance(utterance);
            setIsLocalTTS(true);
          });
      }
    } else {
      if (capitalLetters) {
        convertTextToSpeech(capitalLetters.join(''))
          .catch(() => {
            const utterance = speakLocal(capitalLetters.join(''));
            setLocalUtterance(utterance);
            setIsLocalTTS(true);
          });
      }
    }
  };

  const handlePause = () => {
    if (isLocalTTS && localUtterance) {
      window.speechSynthesis.pause();
    } else {
      pauseAudio();
    }
    setIsPaused(true);
  };

  const handleResume = () => {
    if (isLocalTTS && localUtterance) {
      window.speechSynthesis.resume();
    } else {
      if (currentText) {
        resumeAudio(); // Resume the paused API-based audio
      }
    }
    setIsPaused(false);
  };

  useEffect(() => {
    // Stop audio when navigating away from the component
    return () => {
      stopAudio();
      window.speechSynthesis.cancel(); // Stop local TTS
    };
  }, []);

  return (
    <div className="p-6 container mx-auto mt-20">
      <div style={{ backgroundImage: `url('${backgroundImage}')`, minHeight: '75vh' }} className="p-3 rounded-lg z-30 relative bg-cover bg-center">
        {React.Children.map(children, (child) =>
          isValidElement(child) ? cloneElement(child, { readAloud }) : child
        )}
      </div>
      {audioEnabled && (
        <div className="flex flex-col md:flex-row justify-center items-center mt-4">
          <div className="text-center flex flex-col md:flex-row justify-center items-center mb-4 md:mb-0">
            <label className="block mr-2">Audio:</label>
            <select className="p-1 border rounded block" onChange={(e) => setAudioEnabled(e.target.value === 'on')}>
              <option value="on">On</option>
              <option value="off">Off</option>
            </select>
          </div>
          <div className="flex justify-center items-center">
            <button className={`px-4 py-2 mb-4 md:mb-0 rounded ${isPaused ? 'bg-gray-500' : 'bg-red-500'}`} onClick={handlePause} disabled={isPaused}>
              Pause
            </button>
            <button className={`px-4 py-2 ml-4 rounded ${isPaused ? 'bg-green-500' : 'bg-gray-500'}`} onClick={handleResume} disabled={!isPaused}>
              Play
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideTemplate;
