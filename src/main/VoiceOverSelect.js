import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const VoiceOverSelect = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const searchParams = new URLSearchParams(useLocation().search);
  const subtopicId = searchParams.get('subtopicId');
  const voiceOver = searchParams.get('voiceOver') === 'true';

  useEffect(() => {
    if (!voiceOver) {
      const params = new URLSearchParams({
        subtopicId,
        autoplay: 'true',
      });
      navigate(`/module/${moduleId}?${params.toString()}`);
    }
  }, [voiceOver, navigate, moduleId, subtopicId]);

  const handleVoiceOverChoice = (choice) => {
    const params = new URLSearchParams({
      voiceOver: choice.toString(),
      subtopicId,
      autoplay: 'true',
    });

    try {
      navigate(`/module/${moduleId}?${params.toString()}`);
    } catch (error) {
      console.error('Error navigating:', error);
    }
  };

  if (!voiceOver) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://ehub81.wordpress.com/wp-content/uploads/2025/01/bg.png')" }}>
      <div className="container mx-auto p-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center mx-auto">
          <h2 className="text-2xl font-bold mb-6">Voice-Over Selection</h2>
          <button onClick={() => handleVoiceOverChoice(true)} className="w-full bg-blue-500 text-white p-2 rounded mb-4" aria-label="With Voice Over">With Voice Over</button>
          <button onClick={() => handleVoiceOverChoice(false)} className="w-full bg-gray-500 text-white p-2 rounded" aria-label="Without Voice Over">Without Voice Over</button>
        </div>
      </div>
    </div>
  );
};

export default VoiceOverSelect;
