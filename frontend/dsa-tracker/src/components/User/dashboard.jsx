import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/atoms/authAtoms';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const { user } = useRecoilValue(authState);
    const navigate = useNavigate();

    if (!user) {
        navigate('/');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">User Dashboard</h1>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Profile Information</h2>
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                        <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                        {/* Add more profile details here as needed */}
                    </div>
                </div>
                {/* Add more sections for user activity, settings, etc., as needed */}
            </div>
        </div>
    );
}

export default Dashboard;
