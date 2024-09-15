import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar'; // Importing the existing Navbar
import { FaChartBar, FaPlus, FaList, FaCog, FaUsers, FaHistory, FaBell } from 'react-icons/fa';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Imported Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-purple-600 py-16 text-center text-white mt-16">
                {/* Adding mt-16 to create space for the fixed navbar */}
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Welcome to the Admin Dashboard</h2>
                <p className="text-lg mb-6">Manage content, view statistics, and configure settings from here.</p>
            </section>

            {/* Dashboard Content */}
            <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-6">

                {/* Sidebar Navigation */}
                <aside className="lg:w-1/4 bg-white p-4 rounded-lg shadow-md mb-6 lg:mb-0">
                    <h3 className="text-xl font-bold mb-4">Navigation</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/statistics" className="flex items-center text-gray-700 hover:text-blue-500 transition duration-300">
                                <FaChartBar className="text-xl mr-2"/> Statistics
                            </Link>
                        </li>
                        <li>
                            <Link to="/createQuestion" className="flex items-center text-gray-700 hover:text-blue-500 transition duration-300">
                                <FaPlus className="text-xl mr-2"/> Create Question
                            </Link>
                        </li>
                        <li>
                            <Link to="/questionsList" className="flex items-center text-gray-700 hover:text-blue-500 transition duration-300">
                                <FaList className="text-xl mr-2"/> See All Questions
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" className="flex items-center text-gray-700 hover:text-blue-500 transition duration-300">
                                <FaCog className="text-xl mr-2"/> Settings
                            </Link>
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <div className="lg:w-3/4 space-y-6">

                    {/* Quick Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <Link to="/statistics" className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
                            <FaChartBar className="text-blue-500 text-3xl"/>
                            <div>
                                <h3 className="text-xl font-semibold">Statistics</h3>
                                <p className="text-gray-600">View performance metrics and insights.</p>
                            </div>
                        </Link>
                        <Link to="/createQuestion" className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
                            <FaPlus className="text-indigo-500 text-3xl"/>
                            <div>
                                <h3 className="text-xl font-semibold">Create Question</h3>
                                <p className="text-gray-600">Add new questions to the database.</p>
                            </div>
                        </Link>
                        <Link to="/questionsList" className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
                            <FaList className="text-green-500 text-3xl"/>
                            <div>
                                <h3 className="text-xl font-semibold">See All Questions</h3>
                                <p className="text-gray-600">Browse through all the questions.</p>
                            </div>
                        </Link>
                        <Link to="/settings" className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
                            <FaCog className="text-gray-500 text-3xl"/>
                            <div>
                                <h3 className="text-xl font-semibold">Settings</h3>
                                <p className="text-gray-600">Configure dashboard and system settings.</p>
                            </div>
                        </Link>
                    </div>

                    {/* Recent Activities */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">Recent Activities</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-2">
                                <FaHistory className="text-gray-500 text-lg"/>
                                <p className="text-gray-700">Question "Sorting Algorithms" added.</p>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaHistory className="text-gray-500 text-lg"/>
                                <p className="text-gray-700">New user registered.</p>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaHistory className="text-gray-500 text-lg"/>
                                <p className="text-gray-700">Settings updated by Admin.</p>
                            </li>
                        </ul>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">Notifications</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-2">
                                <FaBell className="text-yellow-500 text-lg"/>
                                <p className="text-gray-700">New feedback received.</p>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaBell className="text-yellow-500 text-lg"/>
                                <p className="text-gray-700">System update scheduled.</p>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
