import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, StarIcon, DocumentIcon, VideoCameraIcon, LinkIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { extractPlatformKey } from './platformIcons';
import platformIcons from './platformIcons';
import videoIcons, { getVideoIcon } from './videoIcons';
import { themeState } from '../../recoil/atoms/themeAtom';
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";

const QuestionTable = ({ questions, handleCheckboxChange, handleNoteButtonClick, expandedTopic, expandedDifficulty, toggleDifficulty }) => {
    const [loading, setLoading] = useState(true);
    const theme = useRecoilValue(themeState);
    const { sheet } = useParams();

    // Simulating loading state for demonstration purposes
    useEffect(() => {
        // Simulate loading time
        const loadQuestions = async () => {
            setLoading(true);
            // Simulate fetching data with a timeout
            await new Promise(resolve => setTimeout(resolve, 1000));
            setLoading(false);
        };
        loadQuestions();
    }, [questions]);

    const groupedQuestions = questions.reduce((acc, question) => {
        acc[question.topic] = acc[question.topic] || {};
        acc[question.topic][question.difficulty] = acc[question.topic][question.difficulty] || [];
        acc[question.topic][question.difficulty].push(question);
        return acc;
    }, {});

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-64">
                <svg className="animate-spin h-10 w-10 text-blue-500 mb-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" strokeWidth="4" stroke="currentColor" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z" />
                </svg>
                <span className="text-xl text-gray-700 dark:text-white">Loading...</span>
            </div>
        );
    }

    return (
        <div className="space-y-4 dark:bg-black dark:text-white">
            {Object.keys(groupedQuestions).map(topic => (
                <div key={topic} className="border border-gray-300 rounded-lg overflow-hidden dark:bg-black dark:text-white">
                    <button
                        onClick={() => toggleDifficulty(topic)}
                        className="w-full p-4 text-left bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 focus:outline-none flex justify-between items-center dark:bg-black dark:text-white"
                    >
                        <span>{topic}</span>
                        {expandedTopic === topic ? (
                            <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                        ) : (
                            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                        )}
                    </button>
                    {expandedTopic === topic && (
                        <div className="bg-gray-50 dark:bg-black dark:text-white">
                            {['Easy', 'Medium', 'Hard'].map(difficulty => (
                                <div key={difficulty} className="border-t border-gray-300 dark:bg-black dark:text-white">
                                    <button
                                        onClick={() => toggleDifficulty(topic, difficulty)}
                                        className="w-full p-3 text-left bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 focus:outline-none flex justify-between items-center dark:bg-black dark:text-white"
                                    >
                                        <span className="text-sm">{difficulty}</span>
                                        {expandedDifficulty[`${topic}-${difficulty}`] === difficulty ? (
                                            <ChevronUpIcon className="w-4 h-4 text-gray-500" />
                                        ) : (
                                            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                                        )}
                                    </button>
                                    {expandedDifficulty[`${topic}-${difficulty}`] === difficulty && (
                                        <div className="p-4 overflow-x-auto">
                                            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-black dark:text-white">
                                                <thead className="bg-gray-100 border-b border-gray-300 dark:bg-black dark:text-white">
                                                <tr>
                                                    {['Status', 'Question', 'Article', 'Video Link', 'Platform Link', 'Revision', 'Notes'].map((header) => (
                                                        <th key={header} className="py-3 px-4 text-left text-gray-600">{header}</th>
                                                    ))}
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {groupedQuestions[topic][difficulty]?.map(question => (
                                                    <tr key={question._id} className="hover:bg-gray-50 transition dark:bg-black dark:text-white">
                                                        <td className="py-3 px-2 border-b border-gray-200 dark:bg-black dark:text-white">
                                                            <input
                                                                type="checkbox"
                                                                checked={question.userStatus}
                                                                onChange={() => handleCheckboxChange(question._id, 'status', sheet)}
                                                                className="mr-2"
                                                            />
                                                        </td>
                                                        <td className="py-3 px-2 border-b border-gray-200 dark:bg-black dark:text-white">{question.question}</td>
                                                        <td className="py-3 px-2 border-b border-gray-200 dark:bg-black dark:text-white">
                                                            {question.article?.topic ? (
                                                                <button
                                                                    onClick={() => window.open(`/article/${question._id}`, '_blank')}
                                                                    className="text-blue-500 hover:text-blue-700 underline flex items-center"
                                                                >
                                                                    <DocumentIcon className="w-4 h-4 mr-1" />
                                                                </button>
                                                            ) : (
                                                                'N/A'
                                                            )}
                                                        </td>
                                                        <td className="py-3 px-2 border-b border-gray-200 dark:bg-black dark:text-white">
                                                            {question.videoLink ? (
                                                                <a href={question.videoLink} target="_blank" rel="noopener noreferrer">
                                                                    <img src={getVideoIcon(question.videoLink)} alt="Video Icon" className="w-6 h-6" />
                                                                </a>
                                                            ) : (
                                                                <VideoCameraIcon className="w-6 h-6 text-gray-500" />
                                                            )}
                                                        </td>
                                                        <td className="py-3 px-2 border-b border-gray-200 dark:bg-black dark:text-white">
                                                            {question.platformLink ? (
                                                                <a href={question.platformLink} target="_blank" rel="noopener noreferrer">
                                                                    <img src={platformIcons[extractPlatformKey(question.platformLink)]} alt="Platform Icon" className="w-6 h-6" />
                                                                </a>
                                                            ) : (
                                                                <LinkIcon className="w-6 h-6 text-gray-500" />
                                                            )}
                                                        </td>
                                                        <td className="py-3 px-2 border-b border-gray-200 dark:bg-black dark:text-white">
                                                            <StarIcon
                                                                className={`w-5 h-5 ${question.userRevision ? 'text-yellow-400' : 'text-gray-300'}`}
                                                                onClick={() => handleCheckboxChange(question._id, 'revision')}
                                                            />
                                                        </td>
                                                        <td className="py-3 px-2 border-b border-gray-200 dark:bg-black dark:text-white">
                                                            {question.userNotes ? (
                                                                <button
                                                                    onClick={() => handleNoteButtonClick(question._id)}
                                                                    className="text-blue-500 underline"
                                                                >
                                                                    <PencilIcon className="w-4 h-4 mr-1" />
                                                                    Edit Notes
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleNoteButtonClick(question._id)}
                                                                    className="text-blue-500 underline"
                                                                >
                                                                    <PlusIcon className="w-4 h-4 mr-1" />
                                                                    Add Notes
                                                                </button>
                                                            )}
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
    );
};

export default QuestionTable;
