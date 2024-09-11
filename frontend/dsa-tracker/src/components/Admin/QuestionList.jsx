import React, { useEffect, useState } from 'react';
import { fetchQuestions, deleteQuestion } from '../../api/adminApi';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const QuestionsList = () => {
    const [questions, setQuestions] = useState([]);
    const [expandedTopic, setExpandedTopic] = useState(null);
    const [expandedDifficulty, setExpandedDifficulty] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const data = await fetchQuestions();
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching questions:', error.message);
                // Optionally show a user-friendly message here
            }
        };
        getQuestions();
    }, []);

    const groupedQuestions = questions.reduce((acc, question) => {
        acc[question.topic] = acc[question.topic] || {};
        acc[question.topic][question.difficulty] = acc[question.topic][question.difficulty] || [];
        acc[question.topic][question.difficulty].push(question);
        return acc;
    }, {});

    const handleUpdate = (id) => {
        navigate(`/questions/update/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            try {
                await deleteQuestion(id);
                setQuestions(questions.filter(question => question._id !== id));
                alert('Question deleted successfully.');
            } catch (error) {
                console.error('Error deleting question:', error.message);
                // Optionally show a user-friendly message here
            }
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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Questions List</h1>
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
                                                        <th className="py-3 px-4 text-left text-gray-600">Question</th>
                                                        <th className="py-3 px-4 text-left text-gray-600">Article</th>
                                                        <th className="py-3 px-4 text-left text-gray-600">Video Link</th>
                                                        <th className="py-3 px-4 text-left text-gray-600">Platform Link</th>
                                                        <th className="py-3 px-4 text-left text-gray-600">Actions</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {groupedQuestions[topic][difficulty]?.map(question => (
                                                        <tr key={question._id} className="hover:bg-gray-50 transition">
                                                            <td className="py-3 px-4 border-b border-gray-200">{question.question}</td>
                                                            <td className="py-3 px-4 border-b border-gray-200">{question.article?.topic || 'No article'}</td>
                                                            <td className="py-3 px-4 border-b border-gray-200">
                                                                {question.videoLink ? (
                                                                    <a href={question.videoLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 underline">
                                                                        Video Link
                                                                    </a>
                                                                ) : 'No Video Link'}
                                                            </td>
                                                            <td className="py-3 px-4 border-b border-gray-200">
                                                                {question.platformLink ? (
                                                                    <a href={question.platformLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 underline">
                                                                        Platform Link
                                                                    </a>
                                                                ) : 'No Platform Link'}
                                                            </td>
                                                            <td className="py-3 px-4 border-b border-gray-200 flex space-x-2">
                                                                <button
                                                                    onClick={() => handleUpdate(question._id)}
                                                                    className="text-blue-500 hover:text-blue-700 font-medium"
                                                                >
                                                                    Update
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(question._id)}
                                                                    className="text-red-500 hover:text-red-700 font-medium"
                                                                >
                                                                    Delete
                                                                </button>
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

export default QuestionsList;
