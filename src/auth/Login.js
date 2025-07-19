import React, { useState } from 'react'; // Import useEffect
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginRegisterModal = ({ onLogin }) => {
  // State for modal visibility
  const [showModal, setShowModal] = useState(false);
  // State to control modal animation (for fade-in/out)
  const [modalAnimating, setModalAnimating] = useState(false);
  // State to toggle between login and register views within the modal
  const [isLoginView, setIsLoginView] = useState(true);

  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Function to reset form fields and error message
  const resetForm = () => {
    setUsername('');
    setPassword('');
    setFirstname('');
    setLastname('');
    setError('');
    setLoading(false);
  };

  // Handle opening the modal
  const openModal = (isLogin = true) => {
    resetForm(); // Clear previous form data and errors
    setIsLoginView(isLogin);
    setShowModal(true);
    // Allow a short delay for the modal to mount before starting entry animation
    setTimeout(() => setModalAnimating(true), 10);
  };

  // Handle closing the modal with animation
  const closeModal = () => {
    setModalAnimating(false); // Start exit animation
    // Wait for the animation to complete before unmounting
    setTimeout(() => setShowModal(false), 300); // Duration matches transition-duration-300
    resetForm(); // Clear form data when closing
  };

  // Validate input fields for registration
  const validateRegisterInput = () => {
    if (!username || !password || !firstname || !lastname) {
      setError("All fields are required.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  // Handle form submission (Login or Register)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isLoginView && !validateRegisterInput()) { // Only validate for registration
      setLoading(false);
      return;
    }

    try {
      let response;
      if (isLoginView) {
        // Login API call
        response = await axios.post('https://api.ehub.ph/kusangbasalogin.php', {
          username,
          password
        }, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.data.trim() === "Login successful") {
          console.log('Login successful, navigating to dashboard');
          localStorage.setItem('isLoggedIn', 'true');
          onLogin(); // Call the onLogin prop
          closeModal(); // Close modal on successful login
          navigate('/dashboard');
        } else {
          setError(response.data);
        }
      } else {
        // Register API call
        response = await axios.post('https://api.ehub.ph/kusangbasaregister.php', {
          username,
          password,
          firstname,
          lastname
        }, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.data.includes("User registered successfully")) {
          setError("Registration successful! Please log in."); // Inform user
          resetForm(); // Clear form fields after successful registration
          setIsLoginView(true); // Switch to login view after successful registration
        } else {
          setError(response.data);
        }
      }
    } catch (err) {
      console.error('Error in catch block: ', err);
      if (err.response) {
        setError(`Server error: ${err.response.status} - ${err.response.data.message || err.response.data}`);
      } else if (err.request) {
        setError("No response from server. Please check your internet connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main page background and content
    <div
      className="bg-cover bg-center min-h-screen flex gap-10 flex-col items-center justify-end p-4"
      style={{
        backgroundImage: "url('../img/pabalat1.jpg')", // Placeholder image
        backgroundSize: '100% 100%', // Use 'cover' for better responsiveness
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Button to open the login modal */}
      <div className='mb-20'>
        <button
          onClick={() => openModal(true)}
          className="bg-blue-600 text-white p-4 rounded-lg shadow-xl text-xl font-semibold transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75"
          aria-label="Open Login Modal"
        >
          Login / Register
        </button>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
             style={{ opacity: modalAnimating ? 1 : 0 }}> {/* Fade in/out overlay */}
          {/* Modal Content */}
          <div
            className={`bg-white bg-opacity-10 backdrop-blur-lg border border-opacity-30 rounded-xl shadow-2xl w-full max-w-md mx-auto p-8 relative transition-all duration-300 ease-out
              ${modalAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} // Scale and fade animation
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-300 transition-colors duration-200"
              aria-label="Close Modal"
            >
              &times;
            </button>

            {/* Login/Register Toggle */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setIsLoginView(true)}
                className={`px-6 py-2 rounded-l-lg font-semibold transition-colors duration-300 ${
                  isLoginView ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLoginView(false)}
                className={`px-6 py-2 rounded-r-lg font-semibold transition-colors duration-300 ${
                  !isLoginView ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Register
              </button>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center text-white">
              {isLoginView ? 'Login' : 'Register'}
            </h2>

            <form onSubmit={handleSubmit} className='h-full flex flex-col justify-between'>
              {/* Registration Fields (conditionally rendered) with transition */}
              <div className="flex-grow transition-opacity duration-300 ease-in-out"
                   style={{ opacity: isLoginView ? 0 : 1, pointerEvents: isLoginView ? 'none' : 'auto' }}>
                {!isLoginView && (
                  <>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                        aria-label="Firstname"
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 transition-all duration-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50 bg-opacity-80 text-gray-900 placeholder-gray-500"
                      />
                      <input
                        type="text"
                        placeholder="Lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                        aria-label="Lastname"
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 transition-all duration-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50 bg-opacity-80 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Common Fields (Username, Password) with transition */}
              <div className="mb-4 transition-opacity duration-300 ease-in-out"
                   style={{ opacity: 1 }}> {/* Always visible, but can fade with content */}
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  aria-label="Username"
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4 transition-all duration-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50 bg-opacity-80 text-gray-900 placeholder-gray-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label="Password"
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4 transition-all duration-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50 bg-opacity-80 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg mb-4 transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                disabled={loading}
                aria-label={isLoginView ? "Login Button" : "Register Button"}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="loader mr-2 border-t-2 border-r-2 border-white rounded-full w-4 h-4 animate-spin"></div>
                    {isLoginView ? 'Logging in...' : 'Registering...'}
                  </div>
                ) : (isLoginView ? 'Login' : 'Register')}
              </button>

              {error && <p className="text-red-300 text-center text-sm mb-4">{error}</p>}

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginRegisterModal;
