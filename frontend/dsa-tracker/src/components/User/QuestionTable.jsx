import React from 'react';
import { ChevronDownIcon, ChevronUpIcon, StarIcon, DocumentIcon, VideoCameraIcon, LinkIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { extractPlatformKey } from './platformIcons';
import platformIcons from './platformIcons';
import videoIcons, { getVideoIcon } from './videoIcons';

const QuestionTable = ({ questions, handleCheckboxChange, handleNoteButtonClick, expandedTopic, expandedDifficulty, toggleDifficulty }) => {
    const groupedQuestions = questions.reduce((acc, question) => {
        acc[question.topic] = acc[question.topic] || {};
        acc[question.topic][question.difficulty] = acc[question.topic][question.difficulty] || [];
        acc[question.topic][question.difficulty].push(question);
        return acc;
    }, {});

    return (
        <div className="space-y-4">
            {Object.keys(groupedQuestions).map(topic => (
                <div key={topic} className="border border-gray-300 rounded-lg overflow-hidden">
                    <button
                        onClick={() => toggleDifficulty(topic)}
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
                                                    <th className="py-3 px-4 text-left text-gray-600">Notes</th>
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
                                                                    <DocumentIcon className="w-4 h-4 mr-1" />
                                                                </button>
                                                            ) : (
                                                                'N/A'
                                                            )}
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-gray-200">
                                                            {question.videoLink ? (
                                                                <a href={question.videoLink} target="_blank" rel="noopener noreferrer">
                                                                    <img src={getVideoIcon(question.videoLink)} alt="Video Icon" className="w-6 h-6" />
                                                                </a>
                                                            ) : (
                                                                <VideoCameraIcon className="w-6 h-6 text-gray-500" />
                                                            )}
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-gray-200">
                                                            {question.platformLink ? (
                                                                <a href={question.platformLink} target="_blank" rel="noopener noreferrer">
                                                                    <img src={platformIcons[extractPlatformKey(question.platformLink)]} alt="Platform Icon" className="w-6 h-6" />
                                                                </a>
                                                            ) : (
                                                                <LinkIcon className="w-6 h-6 text-gray-500" />
                                                            )}
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-gray-200">
                                                            <StarIcon
                                                                className={`w-5 h-5 ${question.userRevision ? 'text-yellow-400' : 'text-gray-300'}`}
                                                                onClick={() => handleCheckboxChange(question._id, 'revision')}
                                                            />
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-gray-200">
                                                            {question.notes ? (
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
