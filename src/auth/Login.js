import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://api.ehub.ph/kusangbasalogin.php', {
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data); // Log the response data

      if (response.data.trim() === "Login successful") { // Trim any whitespace
        console.log('Login successful, navigating to dashboard'); // Log before navigating
        onLogin();
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        console.log('Error: ', response.data);
        setError(response.data);
      }
    } catch (err) {
      console.error('Error in catch block: ', err);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div className="bg-cover bg-center min-h-screen flex gap-10 flex-col items-center justify-center" style={{ backgroundImage: "url('https://ehub81.wordpress.com/wp-content/uploads/2025/01/bg.png')" }}>
      <span className='text-5xl'>Kasang-Basa</span>
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full p-2 border rounded mb-4" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border rounded mb-4" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mb-4">Login</button>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <hr className='w-full border-black my-5' />
          <span className='text-gray-400'>Don't have an account yet?</span>
          <Link to="/register" className="block text-center text-blue-500"> <button type="button" className="w-full bg-blue-200 p-2 rounded">Register</button> </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
