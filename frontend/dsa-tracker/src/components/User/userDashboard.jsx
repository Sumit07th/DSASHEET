import React, { useState, useEffect } from 'react';
import { fetchUserQuestions, updateUserQuestionStatusOrRevision, updateUserNotes, deleteUserNote, fetchUserNotes } from '../../api/userApi';
import QuestionTable from './QuestionTable';
import NoteModal from './NoteModal';
//import axiosInstance from '../../utils/axiosInstance'; // Import your axiosInstance

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
        <div className="p-6 space-y-6">
            <QuestionTable
                questions={questions}
                handleCheckboxChange={handleCheckboxChange}
                handleNoteButtonClick={handleNoteButtonClick}
                expandedTopic={expandedTopic}
                expandedDifficulty={expandedDifficulty}
                toggleDifficulty={toggleDifficulty}
                modalVisible={modalVisible}
            />
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
    );
};

export default UserDashboard;