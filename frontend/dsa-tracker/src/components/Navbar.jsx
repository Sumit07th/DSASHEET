// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../recoil/atoms/authAtoms';

function Navbar() {
  const { isLoggedIn } = useRecoilValue(authState);
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setAuthState((prevState) => ({
      ...prevState,
      isLoggedIn: false,
      user: null,
    }));

    localStorage.clear();
    navigate('/');
  };

  const handleClick = () => {
    navigate('/');
  };

  return (
      <nav className="bg-gray-900 fixed w-full z-10 top-0 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={handleClick}>
            <svg
                className="w-8 h-8 text-white mr-3"
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
            <span className="text-white text-2xl font-semibold">DSA Tracker</span>
          </div>
          <div className="flex space-x-6">
            {isLoggedIn ? (
                <button
                    onClick={handleSignOut}
                    className="text-white bg-red-600 px-3 py-2 rounded-md hover:bg-red-500 transition duration-200"
                >
                  Logout
                </button>
            ) : (
                <>
                  <Link
                      to="/login"
                      className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 transition duration-200"
                  >
                    Login
                  </Link>

                </>
            )}
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
