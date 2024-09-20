import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgetPassword } from "../api/userApi.js";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setErrorMessage('Please enter your email');
            return;
        }

        try {
            // Clear previous messages
            setErrorMessage('');
            setSuccessMessage('');


            // Make the API request to the backend
            const response = await forgetPassword(email);

            if (response.success) {
                setSuccessMessage('Reset password email sent');
                // Navigate to notify page after success
                setTimeout(() => {
                    navigate('/notify');
                }, 2000); // Delay for user to see the success message
            }
        } catch (error) {
            // Display the error message inline
            const errorMsg = error?.response?.data?.message || 'Email is incorrect';
            setErrorMessage(errorMsg);
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form
                noValidate
                onSubmit={handleSubmit}
                className="flex flex-col p-6 shadow-lg rounded-lg w-full max-w-md bg-white"
            >
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
                    className="mt-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                >
                    Send Reset Email
                </button>

                {/* Error Message */}
                {errorMessage && (
                    <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
                )}

                {/* Success Message */}
                {successMessage && (
                    <p className="text-green-500 text-sm mt-4">{successMessage}</p>
                )}
            </form>
        </div>
    );
};

export default ForgotPassword;
