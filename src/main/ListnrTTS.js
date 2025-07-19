// ListnrTTS.js
export let currentUtterance = null;
let isPaused = false;

export const speakLocal = (text) => {
  console.log('speakLocal called with text:', text);
  if ('speechSynthesis' in window) {
    if (currentUtterance) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fil-PH'; // Set the language to Filipino (Philippines)

    // Event listeners for utterance
    utterance.onend = () => {
      console.log('Speech has finished.');
      currentUtterance = null;
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      currentUtterance = null;
    };

    window.speechSynthesis.speak(utterance);
    isPaused = false; // Reset the paused flag
    currentUtterance = utterance; // Store the current utterance
    return Promise.resolve(utterance); // Return the utterance as a resolved promise
  } else {
    console.error('Text-to-Speech not supported in this browser.');
    return Promise.reject(new Error('Text-to-Speech not supported in this browser.'));
  }
};

export const convertTextToSpeech = (text) => {
  console.log('convertTextToSpeech called with text:', text);
  return speakLocal(text); // This will now return a promise
};

export const stopAudio = () => {
  console.log('stopAudio called');
  window.speechSynthesis.cancel();
  isPaused = false;
  currentUtterance = null;
};

export const pauseAudio = () => {
  console.log('pauseAudio called');
  if (currentUtterance) {
    window.speechSynthesis.pause();
    isPaused = true;
  }
};

export const resumeAudio = () => {
  console.log('resumeAudio called');
  if (isPaused && currentUtterance) {
    window.speechSynthesis.resume();
    isPaused = false;
  }
};
