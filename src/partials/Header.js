import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = ({ onLogout }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="bg-blue-800 text-white p-4 z-50">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">KASANG-BASA</div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
                <ul className={`md:flex md:items-center md:space-x-4 absolute md:relative bg-blue-800 md:bg-transparent w-full md:w-auto left-0 top-16 md:top-0 ${menuOpen ? "block" : "hidden"} md:block`}>
                    <li className="border-b md:border-none mx-10">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => (isActive ? "text-gray-400" : "hover:text-gray-400 block py-2 md:py-0")}
                            onClick={() => setMenuOpen(false)}
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="border-b md:border-none mx-10">
                        <NavLink
                            to="/profile"
                            className={({ isActive }) => (isActive ? "text-gray-400" : "hover:text-gray-400 block py-2 md:py-0")}
                            onClick={() => setMenuOpen(false)}
                        >
                            Profile
                        </NavLink>
                    </li>
                    <li className="border-b md:border-none mx-10">
                        <NavLink
                            to="/settings"
                            className={({ isActive }) => (isActive ? "text-gray-400" : "hover:text-gray-400 block py-2 md:py-0")}
                            onClick={() => setMenuOpen(false)}
                        >
                            Settings
                        </NavLink>
                    </li>
                    <li className="border-b md:border-none mx-10">
                        <button onClick={handleLogout} className="hover:text-gray-400 block py-2 md:py-0">
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
