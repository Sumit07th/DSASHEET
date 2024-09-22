import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/atoms/themeAtom.js';

const ContactUs = () => {
    const theme = useRecoilValue(themeState);

    // Apply dark mode class to the <html> element based on the theme state
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black`}>
            <div className="flex-grow max-w-6xl mx-auto p-6 bg-white dark:bg-black rounded-lg shadow-md mt-20">
                <h1 className="text-3xl font-bold mb-4 text-center dark:text-white">Contact Us</h1>

                <p className="mb-4 text-gray-700 dark:text-white text-center">
                    At <strong>CodeCompass</strong>, we are here to assist you. Feel free to get in touch through any of the
                    channels listed below. Whether you're looking for support, have questions, or simply want to connect with us,
                    we'd love to hear from you.
                </p>

                {/* Grid for Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-2 dark:text-white">Contact Information</h2>
                        <ul className="list-inside text-gray-700 dark:text-white">
                            <li className="mb-2">
                                <strong>Email:</strong>
                                <a href="mailto:support@codecompass.com" className="text-blue-600 hover:underline dark:text-blue-400">
                                    support@codecompass.com
                                </a>
                            </li>
                            <li className="mb-2">
                                <strong>Phone:</strong> +91 9777772222
                            </li>
                            <li className="mb-2">
                                <strong>Address:</strong> Ranchi, Jharkhand (India)
                            </li>
                        </ul>
                    </div>

                    {/* Office Hours */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-2 dark:text-white">Office Hours</h2>
                        <ul className="list-inside text-gray-700 dark:text-white">
                            <li className="mb-2">
                                <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
                            </li>
                            <li className="mb-2">
                                <strong>Saturday:</strong> 10:00 AM - 2:00 PM
                            </li>
                            <li className="mb-2">
                                <strong>Sunday:</strong> Closed
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="mt-8 text-center">
                    <h2 className="text-2xl font-semibold mb-4 dark:text-white">Connect With Us</h2>
                    <div className="flex justify-center space-x-4">
                        <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-700 dark:text-gray-300 dark:hover:text-white">
                            <i className="fab fa-linkedin-in text-2xl"></i>
                        </a>
                        <a href="https://twitter.com" className="text-gray-400 hover:text-blue-500 dark:text-gray-300 dark:hover:text-white">
                            <i className="fab fa-twitter text-2xl"></i>
                        </a>
                        <a href="https://instagram.com" className="text-gray-400 hover:text-pink-600 dark:text-gray-300 dark:hover:text-white">
                            <i className="fab fa-instagram text-2xl"></i>
                        </a>
                        <a href="https://youtube.com" className="text-gray-400 hover:text-red-600 dark:text-gray-300 dark:hover:text-white">
                            <i className="fab fa-youtube text-2xl"></i>
                        </a>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4 dark:text-white text-center">Our Location</h2>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509525!2d144.95373631558436!3d-37.81720974202115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43e2d0a1af%3A0x5045675218ce6e0!2s123%20Coding%20St%2C%20Tech%20City%2C%20USA!5e0!3m2!1sen!2sus!4v1638232875677!5m2!1sen!2sus"
                        width="100%"
                        height="300"
                        className="border-0"
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Maps - CodeCompass Office"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
