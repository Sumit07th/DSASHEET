// src/components/Auth/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from '../recoil/atoms/authAtoms.js';
import axiosInstance from "../utils/axiosInstance.js";
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; // Import the cross icon

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Using Recoil to update the authentication state
    const setAuth = useSetRecoilState(authState);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("auth/login", {
                email: email,
                password: password,
            });

            console.log(response); // Add this to inspect the response

            // Clear any previous token and role
            localStorage.removeItem('token');
            localStorage.removeItem('role');

            // Save the new token to localStorage
            localStorage.setItem('token', response.data.token);

            // Check if role is present in response data
            const userRole = response.data.role || 'user'; // Default to 'user' if not provided
            localStorage.setItem('role', userRole);

            // Update Recoil auth state
            setAuth({
                isLoggedIn: true,
                user: {
                    email: response.data.email,
                    role: userRole // Use the role from the response
                },
            });

            if (userRole === 'admin') {
                navigate('/admin-dashboard'); // Redirect to admin dashboard
            } else {
                navigate('/user-dashboard'); // Redirect to user dashboard
            }
        } catch (err) {
            console.error('Login error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Login failed');
        }
    };



    const handleClose = () => {
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="relative w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition duration-200"
                >
                    <FaTimes size={24} />
                </button>
                <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600 text-sm">
                        Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;