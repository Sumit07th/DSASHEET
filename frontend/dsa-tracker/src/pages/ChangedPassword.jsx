import { useState } from 'react';
import { changedPassword } from "../api/userApi.js";
import { useNavigate } from "react-router-dom";

const ChangedPassword = ({ onCancel }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!oldPassword || !newPassword) {
            setErrorMessage('Please fill in both old and new passwords');
            return;
        }

        try {
            setSuccessMessage('');
            setErrorMessage('');

            const response = await changedPassword(oldPassword, newPassword);

            if (response.success) {
                setSuccessMessage('Password changed successfully');
                setTimeout(() => {
                    navigate('/dashboard'); // Navigate to dashboard
                }, 2000);
            } else {
                setErrorMessage('Password change failed');
            }
        } catch (error) {
            const errorMsg = error?.response?.data?.message || 'Password change failed';
            setErrorMessage(errorMsg);
        }
    };

    return (
        <div className="max-w-full p-16 ml-16 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Change Password</h2>

            {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Old Password</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                >
                    Change Password
                </button>

                <button
                    type="button"
                    onClick={onCancel} // Cancel button to hide the form
                    className="w-full bg-gray-400 text-white py-3 px-4 rounded-lg shadow mt-4 hover:bg-gray-500 transition duration-200"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default ChangedPassword;
