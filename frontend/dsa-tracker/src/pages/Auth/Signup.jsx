// src/components/Auth/Register.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../utils/axiosInstance.js";
import { authState } from "../../recoil/atoms/authAtoms.js";
import { useSetRecoilState } from "recoil";
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import {toast} from "react-hot-toast"; // Import the cross icon

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Using Recoil to update the authentication state
    const setAuth = useSetRecoilState(authState);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/auth/register", {
                email: email,
                password: password,
                name:name,
            });
            console.log(response);

            // Save the token to localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);

            // Update Recoil auth state
            setAuth({
                isLoggedIn: true,
                user: {
                    email: response.data.email,
                    role: response.data.role,
                },
            });

            // Redirect to the Home page after successful registration
            toast.success('Registerd Successfully');
            navigate('/user-dashboard');
        } catch (err) {
            toast.error('Failed');
            setError(err.response?.data?.message || err.message);
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
                <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleRegister}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                        <input
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
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
                        Register
                    </button>
                    <div className="mt-4 text-center">
                        <p className="text-gray-600 text-sm">
                            Already have an account? <Link to="/login"
                                                           className="text-blue-600 hover:underline">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;