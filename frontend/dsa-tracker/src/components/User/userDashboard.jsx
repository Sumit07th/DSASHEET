import React, { useEffect, useState } from 'react';
import { fetchUserQuestions, updateUserQuestionStatusOrRevision } from '../../api/userApi';
import { ChevronDownIcon, ChevronUpIcon, StarIcon, DocumentIcon, VideoCameraIcon, LinkIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import LeetcodeIcon from '../../assets/icons/leetcode-icon.svg';
import GeeksforGeeksIcon from '../../assets/icons/geeksforgeeks-icon.svg';
import CodingNinjasIcon from '../../assets/icons/codingninjas-icon.svg';
import DefaultPlatformIcon from '../../assets/icons/link-icon.svg';
import YoutubeIcon from '../../assets/icons/youtube-icon.svg';
import DefaultVideoIcon from '../../assets/icons/video.svg';

const platformIcons = {
    leetcode: LeetcodeIcon,
    geeksforgeeks: GeeksforGeeksIcon,
    codingninjas: CodingNinjasIcon,
    default: DefaultPlatformIcon
};

const videoIcons = {
    youtube: YoutubeIcon,
    default: DefaultVideoIcon
};

const UserDashboard = () => {
    const [questions, setQuestions] = useState([]);
    const [expandedTopic, setExpandedTopic] = useState(null);
    const [expandedDifficulty, setExpandedDifficulty] = useState({});

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const fetchedQuestions = await fetchUserQuestions();
                setQuestions(fetchedQuestions);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        loadQuestions();
    }, []);

    const handleCheckboxChange = async (questionId, type) => {
        const question = questions.find(q => q._id === questionId);
        const newStatus = type === 'status' ? !question.userStatus : question.userStatus;
        const newRevision = type === 'revision' ? !question.userRevision : question.userRevision;

        try {
            await updateUserQuestionStatusOrRevision(questionId, newStatus, newRevision);
            setQuestions(prevQuestions =>
                prevQuestions.map(q =>
                    q._id === questionId
                        ? { ...q, userStatus: newStatus, userRevision: newRevision }
                        : q
                )
            );
        } catch (error) {
            console.error('Error updating question interaction:', error);
        }
    };

    const toggleTopic = (topic) => {
        setExpandedTopic(expandedTopic === topic ? null : topic);
    };

    const toggleDifficulty = (topic, difficulty) => {
        setExpandedDifficulty(prev => ({
            ...prev,
            [`${topic}-${difficulty}`]: prev[`${topic}-${difficulty}`] ? null : difficulty
        }));
    };

    const groupedQuestions = questions.reduce((acc, question) => {
        acc[question.topic] = acc[question.topic] || {};
        acc[question.topic][question.difficulty] = acc[question.topic][question.difficulty] || [];
        acc[question.topic][question.difficulty].push(question);
        return acc;
    }, {});

    // Function to get platform icon
    const getPlatformIcon = (platformLink) => {
        const platformKey = extractPlatformKey(platformLink);
        return platformIcons[platformKey] || platformIcons.default;
    };

    // Function to extract platform key from URL
    const extractPlatformKey = (url) => {
        if (url.includes('leetcode.com')) return 'leetcode';
        if (url.includes('geeksforgeeks.org')) return 'geeksforgeeks';
        if (url.includes('codingninjas.com')) return 'codingninjas';
        return 'default';
    };

    // Function to get video icon
    const getVideoIcon = (videoLink) => {
        return videoIcons.youtube || videoIcons.default;
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">User Dashboard</h1>
            <div className="space-y-4">
                {Object.keys(groupedQuestions).map(topic => (
                    <div key={topic} className="border border-gray-300 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleTopic(topic)}
                            className="w-full p-4 text-left bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 focus:outline-none flex justify-between items-center"
                        >
                            <span>{topic}</span>
                            {expandedTopic === topic ? (
                                <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                            ) : (
                                <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                            )}
                        </button>
                        {expandedTopic === topic && (
                            <div className="bg-gray-50">
                                {['Easy', 'Medium', 'Hard'].map(difficulty => (
                                    <div key={difficulty} className="border-t border-gray-300">
                                        <button
                                            onClick={() => toggleDifficulty(topic, difficulty)}
                                            className="w-full p-3 text-left bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 focus:outline-none flex justify-between items-center"
                                        >
                                            <span className="text-sm">{difficulty}</span>
                                            {expandedDifficulty[`${topic}-${difficulty}`] === difficulty ? (
                                                <ChevronUpIcon className="w-4 h-4 text-gray-500" />
                                            ) : (
                                                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                                            )}
                                        </button>
                                        {expandedDifficulty[`${topic}-${difficulty}`] === difficulty && (
                                            <div className="p-4">
                                                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                                                    <thead className="bg-gray-100 border-b border-gray-300">
                                                    <tr>
                                                        <th className="py-3 px-4 text-left text-gray-600">Status</th>
                                                        <th className="py-3 px-4 text-left text-gray-600">Question</th>
                                                        <th className="py-3 px-4 text-left text-gray-600">Article</th>
                                                        <th className="py-3 px-4 text-left text-gray-600">Video Link</th>
                                                        <th className="py-3 px-4 text-left text-gray-600">Platform Link</th>
                                                        <th className="py-3 px-4 text-left text-gray-600">Revision</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {groupedQuestions[topic][difficulty]?.map(question => (
                                                        <tr key={question._id} className="hover:bg-gray-50 transition">
                                                            <td className="py-3 px-4 border-b border-gray-200">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={question.userStatus}
                                                                    onChange={() => handleCheckboxChange(question._id, 'status')}
                                                                    className="mr-2"
                                                                />
                                                            </td>
                                                            <td className="py-3 px-4 border-b border-gray-200">{question.question}</td>
                                                            <td className="py-3 px-4 border-b border-gray-200">
                                                                {question.article?.topic ? (
                                                                    <button
                                                                        onClick={() => window.open(`/article/${question._id}`, '_blank')}
                                                                        className="text-blue-500 hover:text-blue-700 underline flex items-center"
                                                                    >
                                                                        <DocumentIcon className="w-5 h-5 mr-1" />

                                                                    </button>
                                                                ) : 'No article'}
                                                            </td>
                                                            <td className="py-3 px-4 border-b border-gray-200">
                                                                {question.videoLink ? (
                                                                    <a href={question.videoLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 underline flex items-center">
                                                                        <img
                                                                            src={getVideoIcon(question.videoLink)}
                                                                            alt="Video Icon"
                                                                            className="w-5 h-5 mr-1"
                                                                        />

                                                                    </a>
                                                                ) : 'No Video Link'}
                                                            </td>
                                                            <td className="py-3 px-4 border-b border-gray-200">
                                                                {question.platformLink ? (
                                                                    <a href={question.platformLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                                                        <img
                                                                            src={getPlatformIcon(question.platformLink)}
                                                                            alt="Platform Icon"
                                                                            className="w-5 h-5 mr-1"
                                                                        />

                                                                    </a>
                                                                ) : 'No Platform Link'}
                                                            </td>
                                                            <td className="py-3 px-4 border-b border-gray-200">
                                                                <StarIcon
                                                                    className={`w-5 h-5 ${question.userRevision ? 'text-yellow-400' : 'text-gray-300'}`}
                                                                    onClick={() => handleCheckboxChange(question._id, 'revision')}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDashboard;