import { useNavigate } from 'react-router-dom';

const Notify = () => {
    const navigate = useNavigate();  // Initialize the navigate function

    const handleNavigate = () => {
        navigate('/login');  // Navigate to login page when button is clicked
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col p-6 shadow-[0_0_10px_black] rounded-lg w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">Email Sent Successfully</h1>
                <p className="mb-6">A reset password link has been sent to your email address.</p>

                <button
                    onClick={handleNavigate}
                    className="mt-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

export default Notify;
