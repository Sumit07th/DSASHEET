import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {resetPassword} from "../../api/userApi.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {toast} from "react-hot-toast";

const ResetPassword = () => {
    const { resetToken } = useParams(); // Extract token from the URL
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            setError('Please enter a new password');
            return;
        }

        try {

            const response = await resetPassword(resetToken, password);
            if(response.success) {
                toast.success('Password Reset Successfully');
                setSuccess('Password reset successfully');
                setError('');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
            } catch (error) {
            toast.error('Something went wrong');
            setError(error.response?.data?.message || 'Something went wrong');
            setSuccess(''); // Clear success message in case of error
        }
    };

    return (
            <div className="flex items-center justify-center h-screen">
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className="flex flex-col p-6 shadow-[0_0_10px_black] rounded-lg w-full max-w-md"
                >
                    <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && <p className="text-green-500 mb-4">{success}</p>}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">New
                            Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}/>
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-blue-600 hover:bg-violet-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                        Reset Password
                    </button>
                </form>
            </div>

    );
}

export default ResetPassword;
