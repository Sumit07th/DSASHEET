import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { authState } from '../recoil/atoms/authAtoms';
import { themeState } from '../recoil/atoms/themeAtom';
import { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaTimes, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const { isLoggedIn, user } = useRecoilValue(authState);
  const setAuthState = useSetRecoilState(authState);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [theme, setTheme] = useRecoilState(themeState);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleSignOut = () => {
    setAuthState({ isLoggedIn: false, user: null });
    localStorage.clear();
    setDropdownOpen(false); // Close the dropdown on sign out
    navigate('/');
  };

  const handleProfileClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleNavigateToProfile = () => {
    navigate('/dashboard');
    setDropdownOpen(false);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Reset dropdown state when logging in or out
  useEffect(() => {
    if (isLoggedIn) {
      setDropdownOpen(false); // Ensure dropdown is closed when logged in
    }
  }, [isLoggedIn]);

  return (
      <nav className={`fixed w-full z-10 top-0 shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-3 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            {/* Opening icon */}
            <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-4xl font-bold`}>
            &lt;
          </span>
            <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-3xl font-bold`}>
            CodeCompass
          </span>
            <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-4xl font-bold`}>
            /
          </span>
            {/* Closing icon */}
            <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-4xl font-bold`}>
            &gt;
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
                      className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center focus:outline-none"
                  >
                    <FaUserCircle className="text-3xl text-gray-700" />
                  </button>

                  {isDropdownOpen && (
                      <div className={`absolute right-0 mt-2 w-64 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg rounded-md py-2`}>
                        <button
                            onClick={closeDropdown}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                          <FaTimes />
                        </button>

                        <div className="flex items-center px-4 py-2 space-x-3">
                          <FaUserCircle className="text-2xl text-gray-500" />
                          <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-semibold`}>
                      Hi, {user?.name || 'User'}
                    </span>
                        </div>

                        <hr className="my-2" />

                        <button
                            onClick={handleNavigateToProfile}
                            className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 ${theme === 'dark' ? 'hover:bg-gray-600 text-white' : 'text-gray-800'}`}
                        >
                          <FaUserCircle className="mr-2" /> Your Profile
                        </button>

                        <button
                            onClick={handleSignOut}
                            className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 ${theme === 'dark' ? 'hover:bg-gray-600 text-white' : 'text-gray-800'}`}
                        >
                          <FaSignOutAlt className="mr-2" /> Sign Out
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
