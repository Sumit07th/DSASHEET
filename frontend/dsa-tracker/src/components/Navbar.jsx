import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { authState } from '../recoil/atoms/authAtoms';
import { themeState } from '../recoil/atoms/themeAtom'; // Import theme atom
import { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import icons for theme toggle


function Navbar() {
  const { isLoggedIn, user } = useRecoilValue(authState);
  const setAuthState = useSetRecoilState(authState);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Handle theme state
  const [theme, setTheme] = useRecoilState(themeState);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save theme to localStorage for persistence
  };

  const handleSignOut = () => {
    setAuthState({
      isLoggedIn: false,
      user: null,
    });
    localStorage.clear();
    navigate('/');
  };

  const handleProfileClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleNavigateToProfile = () => {
    navigate('/dashboard');
    setDropdownOpen(false);
  };

  return (
      <nav className={`fixed w-full z-10 top-0 shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <svg
                className={`w-8 h-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mr-3`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7h.01M12 7h.01M8 7h.01M21 12h-6a2 2 0 00-2-2H7a2 2 0 00-2 2H2m5 0a2 2 0 002-2h6a2 2 0 002 2h6M5 12v6a2 2 0 002 2h10a2 2 0 002-2v-6m-8 10v-4m-4 4v-4m8 4v-4m4 4v-4M3 5h18a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2z"
              />
            </svg>
            <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-2xl font-semibold`}>
            DSA Tracker
          </span>
          </div>
          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="text-xl focus:outline-none">
              {theme === 'dark' ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-gray-800" />}
            </button>

            {isLoggedIn ? (
                <div className="relative">
                  <button
                      onClick={handleProfileClick}
                      className={`text-white bg-blue-600 px-3 py-2 rounded-md hover:bg-blue-500 transition duration-200 flex items-center ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'}`}
                  >
                    <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 14.5a4.5 4.5 0 01-4.5-4.5V9a4.5 4.5 0 119 0v1a4.5 4.5 0 01-4.5 4.5zM12 16.5a7.5 7.5 0 00-7.5 7.5H19.5A7.5 7.5 0 0012 16.5z"
                      />
                    </svg>
                    <span className="ml-2">{user?.name || 'Profile'}</span>
                  </button>
                  {isDropdownOpen && (
                      <div className={`absolute right-0 mt-2 w-48 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-md py-2`}>
                        <button
                            onClick={handleNavigateToProfile}
                            className={`block px-4 py-2 hover:bg-gray-100 w-full text-left ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                        >
                          Your Profile
                        </button>
                        <button
                            onClick={handleSignOut}
                            className={`block px-4 py-2 hover:bg-gray-100 w-full text-left ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                        >
                          Sign Out
                        </button>
                      </div>
                  )}
                </div>
            ) : (
                <Link
                    to="/login"
                    className={`text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-200 ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'}`}
                >
                  Login
                </Link>
            )}
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
