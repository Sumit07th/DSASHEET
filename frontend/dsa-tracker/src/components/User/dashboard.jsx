import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/atoms/authAtoms';
import { Link, useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import ChangedPassword from '../../pages/ChangedPassword.jsx';
import {themeState} from "../../recoil/atoms/themeAtom.js";
import Navbar from "../Navbar.jsx"; // Import the ChangePassword component

function Dashboard() {
    const { user } = useRecoilValue(authState);
    console.log(user.name);
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

        <div className="flex min-h-screen bg-gray-100 py-6 px-4 dark:bg-black dark:text-white">
            <Navbar />
            {/* Left side - Dashboard */}
            <div className="w-1/2 max-w-lg bg-white shadow-lg rounded-lg p-6 mr-4 dark:bg-black dark:text-white">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 dark:bg-black dark:text-white">User Dashboard</h1>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:bg-black dark:text-white">Profile Information</h2>
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 dark:bg-black dark:text-white">
                        <p className="text-gray-700 dark:bg-black dark:text-white"><strong>Name:</strong> {user.name}</p>
                        <p className="text-gray-700 dark:bg-black dark:text-white"><strong>Email:</strong> {user.email}</p>
                        <button
                            onClick={() => setShowChangePassword(true)} // Show the change password form
                            className="text-white bg-blue-600 px-4 py-2 mt-4 rounded-md hover:bg-blue-500 transition duration-200"
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </div>

            {/* Right side - Change Password Form */}
            {showChangePassword && (
                <div className="w-1/2">
                    <ChangedPassword onCancel={() => setShowChangePassword(false)} /> {/* Pass a prop to close */}
                </div>
            )}
        </div>
    );
}

export default Dashboard;
