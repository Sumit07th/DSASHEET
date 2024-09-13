import React, { useEffect, useState } from 'react';
import { fetchUserQuestions, updateUserQuestionStatusOrRevision, updateUserNotes, deleteUserNote, fetchUserNotes } from '../../api/userApi';
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
                const questionsWithNotes = await Promise.all(
                    fetchedQuestions.map(async (question) => {
                        try {
                            const notes = await fetchUserNotes(question._id);
                            return { ...question, notes: notes || '' }; // Merge notes with question
                        } catch (error) {
                            console.error(`Error fetching notes for question ${question._id}:`, error.message || error);
                            return { ...question, notes: '' }; // Fallback to empty if notes fetch fails
                        }
                    })
                );
                setQuestions(questionsWithNotes);
            } catch (error) {
                console.error('Error fetching questions:', error.message || error);
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

        // Check if notes is already an object or a JSON string
        let noteText = '';
        if (typeof question.notes === 'string') {
            try {
                const parsedNotes = JSON.parse(question.notes);
                noteText = parsedNotes.notes || ''; // Adjust this based on your actual structure
            } catch {
                noteText = question.notes; // Fallback if JSON parsing fails
            }
        } else if (typeof question.notes === 'object') {
            noteText = question.notes.notes || ''; // Adjust this based on your actual structure
        }

        setEditingNote(noteText);
        setNoteText(noteText);
        setSelectedQuestionId(questionId);
        setModalVisible(true);
    };




    const handleNoteSave = async () => {
        try {
            if (selectedQuestionId) {
                // Directly use noteText without JSON.stringify
                await updateUserNotes(selectedQuestionId, noteText);
                setQuestions(prevQuestions =>
                    prevQuestions.map(q =>
                        q._id === selectedQuestionId
                            ? { ...q, notes: noteText }
                            : q
                    )
                );
                setModalVisible(false);
            }
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
                        ? { ...q, notes: '' } // Update state to reflect note deletion
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
                                                        <th className="py-3 px-4 text-left text-gray-600">Notes</th> {/* Notes column */}
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {groupedQuestions[topic][difficulty].map(question => (
                                                        <tr key={question._id} className="border-b border-gray-200">
                                                            <td className="py-3 px-4">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={question.userStatus}
                                                                    onChange={() => handleCheckboxChange(question._id, 'status')}
                                                                />
                                                            </td>
                                                            <td className="py-3 px-4 text-gray-700">{question.title}</td>
                                                            <td className="py-3 px-4">
                                                                {question.articleLink ? (
                                                                    <a href={question.articleLink} target="_blank" rel="noopener noreferrer">
                                                                        <img src={getPlatformIcon(question.articleLink)} alt="Article Icon" className="w-6 h-6" />
                                                                    </a>
                                                                ) : (
                                                                    <DocumentIcon className="w-6 h-6 text-gray-500" />
                                                                )}
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                {question.videoLink ? (
                                                                    <a href={question.videoLink} target="_blank" rel="noopener noreferrer">
                                                                        <img src={getVideoIcon(question.videoLink)} alt="Video Icon" className="w-6 h-6" />
                                                                    </a>
                                                                ) : (
                                                                    <VideoCameraIcon className="w-6 h-6 text-gray-500" />
                                                                )}
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                {question.platformLink ? (
                                                                    <a href={question.platformLink} target="_blank" rel="noopener noreferrer">
                                                                        <img src={getPlatformIcon(question.platformLink)} alt="Platform Icon" className="w-6 h-6" />
                                                                    </a>
                                                                ) : (
                                                                    <LinkIcon className="w-6 h-6 text-gray-500" />
                                                                )}
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={question.userRevision}
                                                                    onChange={() => handleCheckboxChange(question._id, 'revision')}
                                                                />
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                {question.notes ? (
                                                                    <button onClick={() => handleNoteButtonClick(question._id)} className="text-blue-500 underline">
                                                                        Edit Notes
                                                                    </button>
                                                                ) : (
                                                                    <button onClick={() => handleNoteButtonClick(question._id)} className="text-blue-500 underline">
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
            {modalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">{editingNote ? 'Edit Note' : 'Add Note'}</h2>
                        <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                            rows="4"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={handleNoteSave}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Save
                            </button>
                            {editingNote && (
                                <button
                                    onClick={handleNoteDelete}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            )}
                            <button
                                onClick={() => setModalVisible(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default UserDashboard;
