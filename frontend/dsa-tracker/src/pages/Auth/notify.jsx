import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';  // Import checkmark icon

const Notify = () => {
    const navigate = useNavigate();  // Initialize the navigate function

    const handleNavigate = () => {
        navigate('/login');  // Navigate to login page when button is clicked
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
            <div className="flex flex-col items-center p-8 shadow-lg rounded-lg w-full max-w-md bg-white text-center">

                {/* Animated Tick Icon */}
                <div className="bg-green-100 p-4 rounded-full mb-4">
                    <FaCheckCircle className="text-green-500 animate-blow" size={48} />
                </div>

                <h1 className="text-3xl font-bold mb-4 text-gray-800">Email Sent!</h1>
                <p className="text-gray-600 mb-6">
                    A reset password link has been sent to your email address. Please check your inbox.
                </p>

                <button
                    onClick={handleNavigate}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

export default Notify;
