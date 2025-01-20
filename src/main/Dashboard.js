import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleTopicSelect = (moduleId) => {
        navigate(`/voice-over-select/${moduleId}?subtopicId=1`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://ehub81.wordpress.com/wp-content/uploads/2025/01/bg.png')" }}>
            <div className="container mx-auto p-4">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                    <button onClick={() => handleTopicSelect(1)} className="w-full bg-blue-500 text-white p-2 rounded mb-4">Instructional</button>
                    <button onClick={() => handleTopicSelect(2)} className="w-full bg-green-500 text-white p-2 rounded mb-4">Frustration</button>
                    <button onClick={() => handleTopicSelect(3)} className="w-full bg-red-500 text-white p-2 rounded">Non-Reader</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
