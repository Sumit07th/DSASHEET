import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { themeState } from '../recoil/atoms/themeAtom';
import { Link } from 'react-router-dom';
import {toast} from "react-hot-toast";

const ErrorPage = () => {
    const theme = useRecoilValue(themeState);
    toast.error('Error');

    // Apply dark mode class to the <html> element based on the theme state
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    console.log("errro");

    return (
        <div className="dark:bg-black dark:text-white min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-lg mb-6">Sorry, the page you are looking for does not exist.</p>
            <Link
                to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
                Go to Home
            </Link>
            <Link
                to="/contact-us"
                className="mt-4 text-blue-600 hover:text-blue-800"
            >
                Contact Support
            </Link>
        </div>
    );
};

export default ErrorPage;
