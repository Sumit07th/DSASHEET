import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authState } from '../../recoil/atoms/authAtoms';
import { themeState } from "../../recoil/atoms/themeAtom.js";
import Navbar from "../Navbar.jsx";
import CompletionPieChart from "./CompletionPieChart.jsx";
import ChangedPassword from './ChangedPassword.jsx'; // Import the ChangePassword component

function Dashboard() {
    const { user } = useRecoilValue(authState);
    const navigate = useNavigate();
    const [showChangePassword, setShowChangePassword] = useState(false); // State to toggle password change form
    const theme = useRecoilValue(themeState);

    // Apply dark mode class to the <html> element based on the theme state
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    if (!user) {
        navigate('/');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black dark:text-white">
            {/* Main Content - Adding top margin to avoid overlap with Navbar */}
            <div className="flex flex-wrap py-6 px-4 mt-16">
                {/* Left side - Dashboard */}
                <div className="border-2 w-full h-1/2 lg:w-1/2 max-w-lg bg-white shadow-lg rounded-lg p-6 mr-4 dark:bg-black dark:text-white dark:border-white">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">User Dashboard</h1>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:bg-black dark:text-white">Profile Information</h2>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 dark:bg-black">
                            <p className="text-gray-700 dark:text-gray-200"><strong>Name:</strong> {user.name}</p>
                            <p className="text-gray-700 dark:text-gray-200"><strong>Email:</strong> {user.email}</p>
                            <button
                                onClick={() => setShowChangePassword(true)} // Show the change password form
                                className="text-white bg-blue-600 px-4 py-2 mt-4 rounded-md hover:bg-blue-500 transition duration-200"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right side - Conditionally render Pie Chart or Change Password Form */}
                <div className="w-full lg:w-1/2 ml-20">
                    {showChangePassword ? (
                        <ChangedPassword onCancel={() => setShowChangePassword(false)} /> // Show ChangePassword component
                    ) : (
                        <CompletionPieChart /> // Show CompletionPieChart component when not in change password mode
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
