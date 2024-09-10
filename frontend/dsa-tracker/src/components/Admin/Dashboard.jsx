import React from 'react';
import { Link } from 'react-router-dom';


const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-around mt-8">
                    <Link to="/createQuestion" className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 transition duration-300">
                        Create Question
                    </Link>
                    <Link to="/questionsList" className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 transition duration-300">
                        See All Questions
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
