import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgetPassword } from "../../api/userApi.js";
import { FaTimes, FaSpinner } from "react-icons/fa";
import {toast} from "react-hot-toast";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error('Enter your Email');
            setErrorMessage('Please enter your email');
            return;
        }

        try {
            // Clear previous messages
            setErrorMessage('');
            setSuccessMessage('');
            setIsLoading(true); // Set loading to true when submitting

            // Make the API request to the backend
            const response = await forgetPassword(email);

            if (response.success) {
                toast.success('Email Sent Sucessfully');
                setSuccessMessage('Reset password email sent. Redirecting...');

                // Delay for user to see the success message, with spinner showing
                setTimeout(() => {
                    navigate('/notify');
                }, 2000);
            }
        } catch (error) {
            toast.error('Email is Incorrect');
            const errorMsg = error?.response?.data?.message || 'Email is incorrect';
            setErrorMessage(errorMsg);
        } finally {
            setIsLoading(false); // Stop the loading state after the request is complete
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleClose = () => {
        navigate('/login');
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form
                noValidate
                onSubmit={handleSubmit}
                className="relative flex flex-col p-6 shadow-lg rounded-lg w-full max-w-md bg-white"
            >
                <button
                    onClick={handleClose}
                    type="button"
                    className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition duration-200"
                >
                    <FaTimes size={24} />
                </button>
                <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>

                {/* Email Input */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200 ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isLoading} // Disable button when loading
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <FaSpinner className="animate-spin mr-2" /> Sending...
                        </div>
                    ) : (
                        'Send Reset Email'
                    )}
                </button>

                {/* Error Message */}
                {errorMessage && (
                    <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
                )}

                {/* Success Message */}
                {successMessage && (
                    <p className="text-green-500 text-sm mt-4">{successMessage}</p>
                )}

                {/* Loading spinner */}
                {isLoading && (
                    <div className="mt-4 text-center">
                        <FaSpinner className="animate-spin text-blue-600" size={24} />
                    </div>
                )}
            </form>
        </div>
    );
};

export default ForgotPassword;
