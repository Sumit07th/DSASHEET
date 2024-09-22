import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/atoms/authAtoms';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    const { isLoggedIn } = useRecoilValue(authState);
    const navigate = useNavigate();

    const handleLinkClick = (path) => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            navigate(path);
        }
    };

    return (
        <footer className="bg-gray-900 text-white py-12 dark:bg-black dark:text-white">
            <div
                className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-center md:text-left">

                {/* Column 1: DSA Tracker Description */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">DSA Tracker</h2>
                    <p className="text-gray-400 mb-4">
                        Your ultimate guide to mastering Data Structures and Algorithms. Track your progress, prepare
                        for coding interviews, and stay ahead in the competitive world of software engineering.
                    </p>
                    {/* Social Media Links */}
                    <div className="flex justify-center md:justify-start space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                           className="text-gray-400 hover:text-white">
                            <FaFacebookF className="text-xl"/>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                           className="text-gray-400 hover:text-white">
                            <FaTwitter className="text-xl"/>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                           className="text-gray-400 hover:text-white">
                            <FaLinkedinIn className="text-xl"/>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                           className="text-gray-400 hover:text-white">
                            <FaInstagram className="text-xl"/>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                           className="text-gray-400 hover:text-white">
                            <FaYoutube className="text-xl"/>
                        </a>
                    </div>
                </div>

                {/* Column 2: Company Info */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Company</h2>
                    <ul className="space-y-2">
                        <li><Link to="/about-us" className="text-gray-400 hover:text-white">About Us</Link></li>
                        <li><Link to="/contact-us" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                        <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
                        </li>
                        <li><Link to="/terms-conditions" className="text-gray-400 hover:text-white">Terms &
                            Conditions</Link></li>
                    </ul>
                </div>

                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
                    <ul className="space-y-2">
                        <li>
                            <button onClick={() => handleLinkClick('/BASIC')}
                                    className="text-gray-400 hover:text-white">
                                BASIC
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleLinkClick('/A2Z')} className="text-gray-400 hover:text-white">
                                A2Z
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleLinkClick('/TCS')} className="text-gray-400 hover:text-white">
                                TCS
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleLinkClick('/SDE')} className="text-gray-400 hover:text-white">
                                SDE
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleLinkClick('/CP')} className="text-gray-400 hover:text-white">
                                CP
                            </button>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-4">DSA Sheets</h2>
                    <ul className="space-y-2">
                        <li>
                            <button onClick={() => handleLinkClick('/BASIC')}
                                    className="text-gray-400 hover:text-white">
                                BASIC Sheet
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleLinkClick('/A2Z')} className="text-gray-400 hover:text-white">
                                A2Z Sheet
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleLinkClick('/TCS')} className="text-gray-400 hover:text-white">
                                TCS Sheet
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleLinkClick('/SDE')} className="text-gray-400 hover:text-white">
                                SDE Sheet
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleLinkClick('/CP')} className="text-gray-400 hover:text-white">
                                CP Sheet
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Column 5: Extras (My Own Choice) */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Resources</h2>
                    <ul className="space-y-2">
                        <li><Link to="/blogs" className="text-gray-400 hover:text-white">Blog</Link></li>
                        <li><Link to="/faqs" className="text-gray-400 hover:text-white">FAQs</Link></li>
                        <li><Link to="/career-tips" className="text-gray-400 hover:text-white">Career Tips</Link></li>
                        <li><Link to="/interview-preparation" className="text-gray-400 hover:text-white">Interview
                            Preparation</Link></li>
                        <li><Link to="/coding-challenges" className="text-gray-400 hover:text-white">Coding
                            Challenges</Link></li>
                    </ul>
                </div>
            </div>
            {/* Footer Bottom */}
            <div className="mt-8 border-t border-gray-700 pt-6 text-center">
                <p className="text-gray-400">
                    © {new Date().getFullYear()} DSA Tracker. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
