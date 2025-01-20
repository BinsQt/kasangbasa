import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://api.ehub.ph/kusangbasaregister.php', {
                username,
                password,
                firstname,
                lastname
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data === "User registered successfully") {
                onLogin();
            } else {
                setError(response.data);
            }
        } catch (err) {
            setError("An error occurred while registering.");
            console.error(err);
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="bg-cover bg-center min-h-screen flex gap-10 flex-col  items-center justify-center" style={{ backgroundImage: "url('https://ehub81.wordpress.com/wp-content/uploads/2025/01/bg.png')" }}>
            <span className='text-5xl'>Kasang-Basa</span>
            <div className="container mx-auto p-4">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Firstname"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                            className="w-full p-2 border rounded mb-4"
                        />
                        <input
                            type="text"
                            placeholder="Lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                            className="w-full p-2 border rounded mb-4"
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-2 border rounded mb-4"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border rounded mb-4"
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mb-4">Register</button>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <button type="button" onClick={handleBack} className="w-full bg-gray-500 text-white p-2 rounded">Back to Login</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
