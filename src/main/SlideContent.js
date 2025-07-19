import React, { useState, useEffect } from 'react';
import { stopAudio } from './ListnrTTS';

const SlideContent = ({ slide, readAloud }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(null); // State to track if the answer was correct

  // Common Tailwind classes for glassmorphism content boxes
  const glassmorphismClasses = "bg-white bg-opacity-10 backdrop-blur-lg border border-opacity-30 rounded-xl shadow-lg p-6 md:p-8 text-black";
  // Classes for content boxes with a solid background (e.g., gray)
  const solidContentClasses = "bg-gray-300 rounded-xl shadow-lg p-6 md:p-8 text-gray-900";

  useEffect(() => {
    // Clear feedback and selected option when slide changes
    setSelectedOption(null);
    setFeedbackMessage('');
    setIsCorrect(null);

    // Stop any currently playing audio when the slide changes
    stopAudio();
  }, [slide]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // Clear feedback when a new option is selected
    setFeedbackMessage('');
    setIsCorrect(null);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      const answerParts = slide.answer?.split(': ');
      if (answerParts && answerParts.length > 1) {
        const correctAnswer = answerParts[1].trim(); // Trim to ensure no leading/trailing spaces
        if (selectedOption.trim() === correctAnswer) { // Trim selected option too
          setFeedbackMessage(`Tama! Ang sagot ay: ${correctAnswer}`);
          setIsCorrect(true);
        } else {
          setFeedbackMessage(`Mali. Ang tamang sagot ay: ${correctAnswer}`); // Show correct answer on wrong attempt
          setIsCorrect(false);
        }
      } else {
        console.error('Invalid answer format:', slide.answer);
        setFeedbackMessage('Invalid answer format');
        setIsCorrect(false);
      }
    } else {
      setFeedbackMessage('Pumili ng tamang sagot.');
      setIsCorrect(false);
    }
  };

  // Universal helper for splitting text into clickable words and preserving spaces.
  // IMPORTANT: This function PRESERVES existing spaces. It does NOT add spaces
  // if the original 'text' string is already concatenated (e.g., "HelloWorld").
  // For correct display, ensure your source data (slidesData) has proper spacing.
  const renderClickableText = (text, textColorClass = "text-black") => {
    return text.split(/(\s+)/).map((segment, segmentIndex) => {
      const isSpace = /\s+/.test(segment);
      return (
        <span
          key={segmentIndex}
          onClick={() => !isSpace && readAloud(segment.trim())} // Only read aloud if it's not a space
          className={isSpace ? '' : `cursor-pointer hover:underline ${textColorClass}`} // Apply underline only to actual words
        >
          {segment} {/* Render the segment as is, preserving spaces */}
        </span>
      );
    });
  };

  // Helper function to render paragraphs with word-click TTS
  const renderParagraphs = (content, textColorClass = "text-black") => (
    <div className="text-left mb-4">
      {content.map((paragraph, index) => (
        <p key={index} className={`paragraph text-lg md:text-xl mt-2 text-left ${textColorClass}`}>
          {renderClickableText(paragraph, textColorClass)}
        </p>
      ))}
    </div>
  );

  // Helper function to render questions/options as list items with word-click TTS
  const renderQuestionsAndOptions = (items, textColorClass = "text-black") => (
    <ul className="list-none mt-5 text-lg md:text-xl">
      {items.map((item, index) => (
        <li key={index} className={`mb-2 ${textColorClass}`}>
          {renderClickableText(item, textColorClass)}
        </li>
      ))}
    </ul>
  );

  const renderSlideContent = (layoutType) => {
    if (!slide) return <div className="text-center text-black text-2xl">Loading slide content...</div>;

    switch (layoutType) {
      case 'LAYOUT_1':
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className={`${glassmorphismClasses} flex flex-col items-center text-center`}>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-blue-600">{slide.title}</h2>
              {renderParagraphs(slide.content)}
              {slide.images && (
                <div className="flex justify-center items-center gap-4 md:gap-10 flex-wrap mt-5">
                  {slide.images.map((img, index) => (
                    <img key={index} src={img} alt={`Example ${index + 1}`} className="w-full md:w-auto h-auto max-h-80 rounded-lg shadow-md object-contain" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/300x200/cccccc/000000?text=Image+Not+Found`; }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'LAYOUT_1.1':
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className={`${glassmorphismClasses}`}>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-blue-600 text-center">{slide.title}</h2>
              <div className="overflow-x-auto"> {/* Added for horizontal scrolling on small screens */}
                <table className="w-full border-collapse table-auto text-center mt-5">
                  <thead className="bg-blue-800 bg-opacity-30">
                    <tr>
                      <th className="p-3 border border-blue-700 text-black text-xl md:text-2xl">Titik</th>
                      <th className="p-3 border border-blue-700 text-black text-xl md:text-2xl">Tunog</th>
                      <th className="p-3 border border-blue-700 text-black text-xl md:text-2xl">Halimbawang salita</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-blue-900 bg-opacity-20 hover:bg-blue-800 hover:bg-opacity-30 transition-colors duration-200">
                      <td className="p-3 border border-blue-700 text-3xl md:text-4xl">
                        {renderClickableText(slide.content[0])}
                      </td>
                      <td className="p-3 border border-blue-700 text-3xl md:text-4xl">
                        {renderClickableText(slide.content[1])}
                      </td>
                      <td className="p-3 border border-blue-700 text-3xl md:text-4xl">
                        {renderClickableText(slide.content[2])}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {slide.images && (
                <div className="flex justify-center items-center flex-wrap mt-5">
                  {slide.images.map((img, index) => (
                    <img key={index} src={img} alt={`Example ${index + 1}`} className="w-full md:w-auto h-auto max-h-60 rounded-lg shadow-md object-contain" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/300x200/cccccc/000000?text=Image+Not+Found`; }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'LAYOUT_2':
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className={`${glassmorphismClasses}`}>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-blue-600">{slide.title}</h2>
              {renderParagraphs(slide.content)}
              {slide.questions && (
                <div className="mt-5">
                  <h3 className="text-2xl font-semibold mb-3 text-blue-600">Mga Tanong:</h3>
                  {renderQuestionsAndOptions(slide.questions)}
                </div>
              )}
            </div>
          </div>
        );

      case 'LAYOUT_2.1': // Similar to LAYOUT_2 but with specific text sizing
      case 'LAYOUT_2.2': // Similar to LAYOUT_2 but with specific text sizing
      case 'LAYOUT_2.3': // Similar to LAYOUT_2 but with specific text sizing and word spacing
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className={`${glassmorphismClasses}`}>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-blue-600">{slide.title}</h2>
              {renderParagraphs(slide.content.slice(0, 1))}
              {slide.content.slice(1).map((paragraph, index) => (
                <p key={index} className={`paragraph text-3xl md:text-4xl mt-7 text-center ${layoutType === 'LAYOUT_2.3' ? 'sm:text-left' : ''}`}>
                  {renderClickableText(paragraph, "text-black")}
                </p>
              ))}
              {slide.questions && (
                <div className="mt-5">
                  <h3 className="text-2xl font-semibold mb-3 text-blue-600">Mga Tanong:</h3>
                  {renderQuestionsAndOptions(slide.questions)}
                </div>
              )}
            </div>
          </div>
        );

      case 'LAYOUT_3':
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className={`${solidContentClasses}`}> {/* Using solidContentClasses */}
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-blue-700 text-center">{slide.title}</h2>
              {renderParagraphs(slide.content, "text-gray-900")} {/* Specify text color for solid background */}
            </div>
          </div>
        );

      case 'LAYOUT_3.1':
      case 'LAYOUT_3.2':
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className={`${solidContentClasses}`}> {/* Using solidContentClasses */}
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-blue-700 text-center">{slide.title}</h2>
              {renderParagraphs(slide.content.slice(0, 1), "text-gray-900")} {/* First paragraph */}
              {slide.content.slice(1).map((paragraph, index) => (
                <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left text-gray-900">
                  {renderClickableText(paragraph, "text-gray-900")}
                </p>
              ))}
            </div>
          </div>
        );

      case 'LAYOUT_4':
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className={`${glassmorphismClasses} flex flex-col items-center text-center`}>
              {slide.images && (
                <div className="flex justify-center items-center flex-wrap gap-4 md:gap-10 mb-5">
                  {slide.images.map((img, index) => (
                    <img key={index} src={img} alt={`Example ${index + 1}`} className="w-40 h-auto rounded-lg shadow-md object-contain" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/160x160/cccccc/000000?text=Image+Not+Found`; }} />
                  ))}
                </div>
              )}
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-blue-600">{slide.title}</h2>
              {renderParagraphs(slide.content)}
            </div>
          </div>
        );

      case 'LAYOUT_5':
      case 'LAYOUT_5.1':
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className={`${glassmorphismClasses} flex flex-col items-center text-center`}>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-blue-600">{slide.title}</h2>
              {slide.images && (
                <div className="flex justify-center items-center flex-wrap gap-4 md:gap-10 mb-5">
                  {slide.images.map((img, index) => (
                    <img key={index} src={img} alt={`Example ${index + 1}`} className="w-40 h-40 rounded-lg shadow-md object-contain" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/160x160/cccccc/000000?text=Image+Not+Found`; }} />
                  ))}
                </div>
              )}
              {renderParagraphs(slide.content)}
              {slide.questions && (
                <div className="mt-5">
                  <h3 className="text-2xl font-semibold mb-3 text-blue-600">Mga Tanong:</h3>
                  {renderQuestionsAndOptions(slide.questions)}
                </div>
              )}
            </div>
          </div>
        );

      case 'LAYOUT_6':
      case 'LAYOUT_6.5':
      case 'LAYOUT_6.6':
      case 'LAYOUT_6.7':
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className={`${glassmorphismClasses}`}>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-blue-600 text-center">{slide.title}</h2>
              {renderParagraphs(slide.content.slice(0, 1))}
              <hr className='border-blue-700 my-5 opacity-50' />
              {slide.content.slice(1).map((paragraph, index) => (
                <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left text-black">
                  {renderClickableText(paragraph, "text-black")}
                </p>
              ))}
            </div>
          </div>
        );

      case 'LAYOUT_7':
      case 'LAYOUT_13':
      case 'LAYOUT_14':
      case 'LAYOUT_15':
      case 'LAYOUT_16':
      case 'LAYOUT_17':
      case 'LAYOUT_20':
      case 'nonreaderquestions': // All question layouts
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className={`${glassmorphismClasses} flex flex-col items-center text-center`}>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-blue-600">{slide.title}</h2>
              {slide.images && (
                <div className="flex justify-center items-center flex-wrap gap-4 md:gap-10 mb-5">
                  {slide.images.map((img, index) => (
                    <img key={index} src={img} alt={`Question Image ${index + 1}`} className="w-full md:w-auto h-auto max-h-40 rounded-lg shadow-md object-contain" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/160x160/cccccc/000000?text=Image+Not+Found`; }} />
                  ))}
                </div>
              )}
              {renderParagraphs([slide.content[0]])} {/* The question itself */}

              <div className="mt-4 w-full text-left">
                <div className="flex flex-col items-start gap-3">
                  {slide.content.slice(1).map((option, index) => (
                    <label
                      key={index}
                      className={`
                        text-lg md:text-xl p-3 rounded-lg w-full cursor-pointer transition-all duration-300
                        ${selectedOption === option.trim() ? 'bg-blue-600 bg-opacity-50 border-blue-400' : 'bg-white bg-opacity-5 border-white border-opacity-20'}
                        hover:bg-blue-500 hover:bg-opacity-30 hover:border-blue-300
                        ${isCorrect !== null && selectedOption === option.trim() ? (isCorrect ? 'border-green-400 ring-2 ring-green-400' : 'border-red-400 ring-2 ring-red-400') : ''}
                      `}
                    >
                      <input
                        type="radio"
                        name="option"
                        value={option.trim()} // Ensure value is trimmed
                        checked={selectedOption === option.trim()}
                        onChange={handleOptionChange}
                        disabled={isCorrect !== null} // Disable after submission
                        className="mr-3 h-5 w-5 accent-blue-500" // Styled radio button
                      />
                      {renderClickableText(option)} {/* Use the new helper here */}
                    </label>
                  ))}
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isCorrect !== null || !selectedOption} // Disable after submission or if no option is selected
                  className="mt-6 bg-blue-600 text-black p-3 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  {isCorrect !== null ? (isCorrect ? 'Correct!' : 'Try Again') : 'Submit Answer'}
                </button>
              </div>
              {feedbackMessage && (
                <p className={`mt-4 text-xl md:text-2xl font-bold transition-all duration-300 ease-in-out ${
                  isCorrect === true ? 'text-green-400' : 'text-red-400'
                }`}>
                  {feedbackMessage}
                </p>
              )}
            </div>
          </div>
        );

      case 'LAYOUT_9':
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className={`${glassmorphismClasses}`}>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-blue-600 text-center">{slide.title}</h2>
              {renderParagraphs(slide.content)}
              {slide.videoEmbed && (
                <div className="mt-10 relative" style={{ paddingBottom: '56.25%', height: 0 }}> {/* Responsive iframe container */}
                  <div dangerouslySetInnerHTML={{ __html: slide.videoEmbed }} className="absolute top-0 left-0 w-full h-full"></div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className={`${glassmorphismClasses} flex flex-col items-center text-center`}>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-blue-600">{slide.title}</h2>
              {renderParagraphs(slide.content)}
              {slide.images && (
                <div className="flex justify-center items-center flex-wrap gap-4 md:gap-10 mt-5">
                  {slide.images.map((img, index) => (
                    <img key={index} src={img} alt={`Content Image ${index + 1}`} className="w-full md:w-auto h-auto max-h-80 rounded-lg shadow-md object-contain" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/300x200/cccccc/000000?text=Image+Not+Found`; }} />
                  ))}
                </div>
              )}
              {slide.questions && (
                <div className="mt-5 w-full text-left">
                  <h3 className="text-2xl font-semibold mb-3 text-blue-600">Mga Tanong:</h3>
                  {renderQuestionsAndOptions(slide.questions)}
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {renderSlideContent(slide.layoutType || 'default')}
    </>
  );
};

export default SlideContent;
