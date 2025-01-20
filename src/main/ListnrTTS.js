let currentAudio = null;

export const speakLocal = (text) => {
  console.log("speakLocal called with text:", text);
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fil-PH"; // Set the language to Filipino (Philippines)
    window.speechSynthesis.speak(utterance);
    return utterance; // Return the utterance for reference
  } else {
    console.error("Text-to-Speech not supported in this browser.");
    return null;
  }
};

export const convertTextToSpeech = (text) => {
  console.log("convertTextToSpeech called with text:", text);
  return new Promise((resolve, reject) => {
    const lang = "fil-PH";
    const userAgent = navigator.userAgent.toLowerCase();

    switch (true) {
      case /android/.test(userAgent):
        console.log("Platform: Android");
        // Android-specific TTS logic here
        // Resolve or reject based on the outcome
        resolve();
        break;
      case /iphone|ipad|ipod/.test(userAgent):
        console.log("Platform: iOS");
        // iOS-specific TTS logic here
        // Resolve or reject based on the outcome
        resolve();
        break;
      default:
        console.log("Platform: Browser");
        const utterance = speakLocal(text);
        if (utterance) {
          resolve();
        } else {
          reject(new Error("TTS conversion failed"));
        }
    }
  });
};

export const stopAudio = () => {
  console.log("stopAudio called");
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
};

export const resumeAudio = () => {
  console.log("resumeAudio called");
  if (currentAudio) {
    currentAudio.play().catch((error) => {
      if (error.name === 'AbortError') {
        console.log('The play() request was interrupted.');
      } else {
        console.error('Error resuming audio:', error);
      }
    });
  }
};

export const pauseAudio = () => {
  console.log("pauseAudio called");
  if (currentAudio) {
    currentAudio.pause();
  }
};
