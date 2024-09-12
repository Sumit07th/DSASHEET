import React, { useEffect, useState } from 'react';
import { fetchUserQuestions, updateUserQuestionStatusOrRevision, updateUserNotes,deleteUserNote } from '../../api/userApi';
import { ChevronDownIcon, ChevronUpIcon, StarIcon, DocumentIcon, VideoCameraIcon, LinkIcon, GlobeAltIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
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
    const [editingNote, setEditingNote] = useState(null);
    const [noteText, setNoteText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);

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

    const handleNoteButtonClick = (questionId) => {
        const question = questions.find(q => q._id === questionId);
        setEditingNote(question.note || ''); // Set the note for editing if it exists
        setSelectedQuestionId(questionId);
        setModalVisible(true);
    };

    const handleNoteSave = async () => {
        try {
            await updateUserNotes(selectedQuestionId, noteText);
            setQuestions(prevQuestions =>
                prevQuestions.map(q =>
                    q._id === selectedQuestionId
                        ? { ...q, note: noteText }
                        : q
                )
            );
            setModalVisible(false);
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    const handleNoteDelete = async () => {
        try {
            await deleteUserNote(selectedQuestionId); // Call API to delete note
            setQuestions(prevQuestions =>
                prevQuestions.map(q =>
                    q._id === selectedQuestionId
                        ? { ...q, note: '' } // Update state to reflect note deletion
                        : q
                )
            );
            setModalVisible(false); // Close the modal
        } catch (error) {
            console.error('Error deleting note:', error); // Log error to console
            alert('There was an error deleting the note. Please try again.'); // Show user-friendly message
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
                                                        <th className="py-3 px-4 text-left text-gray-600">Notes</th> {/* Added Notes column */}
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
                                                                        <DocumentIcon className="w-4 h-4 mr-1"/>

                                                                    </button>
                                                                ) : (
                                                                    'N/A'
                                                                )}
                                                            </td>
                                                            <td className="py-3 px-4 border-b border-gray-200">
                                                                {question.videoLink ? (
                                                                    <a href={question.videoLink} target="_blank"
                                                                       rel="noopener noreferrer"
                                                                       className="text-blue-500 hover:text-blue-700 underline flex items-center">
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
                                                                    <button
                                                                        onClick={() => window.open(question.platformLink, '_blank')}
                                                                        className="text-blue-500 hover:text-blue-700 underline flex items-center"
                                                                    >
                                                                        <img
                                                                            src={getPlatformIcon(question.platformLink)}
                                                                            alt="platform" className="w-5 h-5 mr-1"/>

                                                                    </button>
                                                                ) : (
                                                                    'N/A'
                                                                )}
                                                            </td>
                                                            <td className="py-3 px-4 border-b border-gray-200">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={question.userRevision}
                                                                    onChange={() => handleCheckboxChange(question._id, 'revision')}
                                                                    className="mr-2"
                                                                />
                                                            </td>
                                                            <td className="py-3 px-4 border-b border-gray-200">
                                                                {question.note ? (
                                                                    <>
                                                                        <button
                                                                            onClick={() => handleNoteButtonClick(question._id)}
                                                                            className="text-blue-500 hover:text-blue-700 underline flex items-center"
                                                                        >
                                                                            <PencilIcon className="w-4 h-4 mr-1"/>
                                                                            Edit Notes
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleNoteDelete()}
                                                                            className="text-red-500 hover:text-red-700 ml-4"
                                                                        >
                                                                            <TrashIcon className="w-4 h-4"/>
                                                                        </button>
                                                                    </>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => handleNoteButtonClick(question._id)}
                                                                        className="text-blue-500 hover:text-blue-700 underline flex items-center"
                                                                    >
                                                                        <PlusIcon className="w-4 h-4 mr-1"/>
                                                                        Add Note
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

            {modalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                        <h2 className="text-xl font-semibold mb-4">Notes</h2>
                        <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            className="w-full h-32 border border-gray-300 rounded-md p-2"
                            placeholder="Write your notes here..."
                        />
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setModalVisible(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleNoteSave}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
