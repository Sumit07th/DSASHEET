import React, { useState, useEffect } from 'react';
import { updateUserQuestionStatusOrRevision, updateUserNotes, deleteUserNote,fetchSheetQuestions } from '../../api/userApi';
import QuestionTable from './QuestionTable';
import NoteModal from './NoteModal';
import {useParams} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {themeState} from "../../recoil/atoms/themeAtom.js";
import {toast} from "react-hot-toast";


const UserDashboard = () => {
    const [questions, setQuestions] = useState([]);
    const [expandedTopic, setExpandedTopic] = useState(null);
    const [expandedDifficulty, setExpandedDifficulty] = useState({});
    const [editingNote, setEditingNote] = useState(null);
    const [noteText, setNoteText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);
    const {sheet} = useParams();
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const fetchedQuestions = await fetchSheetQuestions(sheet);


                setQuestions(fetchedQuestions);
            } catch (error) {
                console.error('Error fetching questions:', error.message || error);
            }
        };

        loadQuestions();
    }, [sheet]);

    const theme = useRecoilValue(themeState);

    // Apply dark mode class to the <html> element based on the theme state
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const handleCheckboxChange = async (questionId, type, sheet) => {
        const question = questions.find(q => q._id === questionId);
        const newStatus = type === 'status' ? !question.userStatus : question.userStatus;
        const newRevision = type === 'revision' ? !question.userRevision : question.userRevision;

        try {
            await updateUserQuestionStatusOrRevision(questionId, newStatus, newRevision, sheet);
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

        let noteText = question.userNotes || '';

        setEditingNote(noteText);
        setNoteText(noteText);
        setSelectedQuestionId(questionId);
        setModalVisible(true);
    };




    const handleNoteSave = async () => {
        try {
            if (selectedQuestionId) {
                // Save the updated note to userNotes
                await updateUserNotes(selectedQuestionId, noteText);
                setQuestions(prevQuestions =>
                    prevQuestions.map(q =>
                        q._id === selectedQuestionId
                            ? { ...q, userNotes: noteText } // Update userNotes
                            : q
                    )
                );
                setModalVisible(false);
                toast.success('Note Saved');
            }
        } catch (error) {
            toast.error('Error saving note');
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
            toast.success('Note Deleted Sucessfully');
        } catch (error) {
            toast.error('Error deleting Note');
            console.error('Error deleting note:', error); // Log error to console
            alert('There was an error deleting the note. Please try again.'); // Show user-friendly message
        }
    };

    const toggleDifficulty = (topic, difficulty) => {
        if (difficulty) {
            setExpandedDifficulty(prev => ({
                ...prev,
                [`${topic}-${difficulty}`]: prev[`${topic}-${difficulty}`] ? null : difficulty
            }));
        } else {
            setExpandedTopic(prev => (prev === topic ? null : topic));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black dark:text-white">


            {/* Header Section */}
            <div className="text-center py-8 dark:bg-black dark:text-white">

            </div>

            {/* Question Table and Modal Section */}
            <div className="container mx-auto px-4 dark:bg-black dark:text-white">

                {/* Question Table */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 dark:bg-black dark:text-white">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 dark:bg-black dark:text-white">Question List</h2>
                    <QuestionTable
                        questions={questions}
                        handleCheckboxChange={handleCheckboxChange}
                        handleNoteButtonClick={handleNoteButtonClick}
                        expandedTopic={expandedTopic}
                        expandedDifficulty={expandedDifficulty}
                        toggleDifficulty={toggleDifficulty}
                        modalVisible={modalVisible}
                    />
                </div>

                {/* Note Modal */}
                {modalVisible && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <NoteModal
                            modalVisible={modalVisible}
                            noteText={noteText}
                            setNoteText={setNoteText}
                            handleNoteSave={handleNoteSave}
                            handleNoteDelete={handleNoteDelete}
                            setModalVisible={setModalVisible}
                            editingNote={editingNote}
                        />
                    </div>
                )}

            </div>
        </div>
    );
};

export default UserDashboard;