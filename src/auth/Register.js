import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Validate input fields
  const validateInput = () => {
    if (!username || !password || !firstname || !lastname) {
      setError("All fields are required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) return;

    setLoading(true);
    setError('');

    try {
      // Send POST request to register API
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

      if (response.data.includes("User registered successfully")) {
        onLogin();  // This calls the provided onLogin function
        navigate('/login');  // This navigates to the login page
      } else {
        setError(response.data);
      }
    } catch (err) {
      setError("An error occurred while registering. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle back button click
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="bg-cover bg-center min-h-screen flex gap-10 flex-col items-center justify-center" style={{ backgroundImage: "url('https://ehub81.wordpress.com/wp-content/uploads/2025/01/bg.png')" }}>
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
              aria-label="Firstname"
              className="w-full p-2 border rounded mb-4 transition-all duration-300 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              aria-label="Lastname"
              className="w-full p-2 border rounded mb-4 transition-all duration-300 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-label="Username"
              className="w-full p-2 border rounded mb-4 transition-all duration-300 focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
              className="w-full p-2 border rounded mb-4 transition-all duration-300 focus:border-blue-500"
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mb-4" disabled={loading} aria-label="Register Button">
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button type="button" onClick={handleBack} className="w-full bg-gray-500 text-white p-2 rounded" aria-label="Back to Login Button">Back to Login</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
