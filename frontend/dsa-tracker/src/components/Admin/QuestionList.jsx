import React, { useEffect, useState } from 'react';
import { fetchQuestions, deleteQuestion } from '../../api/adminApi';
import { useNavigate } from 'react-router-dom';

const QuestionsList = () => {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const data = await fetchQuestions();
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching questions:', error.message);
                // You might want to show a user-friendly message here
            }
        };
        getQuestions();
    }, []);

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
                // You might want to show a user-friendly message here
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Questions List</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">Topic</th>
                    <th className="py-2 px-4 border-b">Question</th>
                    <th className="py-2 px-4 border-b">Article</th>
                    <th className="py-2 px-4 border-b">Video Link</th>
                    <th className="py-2 px-4 border-b">Platform Link</th>
                    <th className="py-2 px-4 border-b">Difficulty</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {questions.map(question => (
                    <tr key={question._id}>
                        <td className="py-2 px-4 border-b">{question.topic}</td>
                        <td className="py-2 px-4 border-b">{question.question}</td>
                        <td className="py-2 px-4 border-b">{question.article?.topic || 'No article'}</td>
                        <td className="py-2 px-4 border-b">
                            {question.videoLink ? (
                                <a href={question.videoLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                                    Video Link
                                </a>
                            ) : 'No Video Link'}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {question.platformLink ? (
                                <a href={question.platformLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                                    Platform Link
                                </a>
                            ) : 'No Platform Link'}
                        </td>
                        <td className="py-2 px-4 border-b">{question.difficulty}</td>
                        <td className="py-2 px-4 border-b">
                            <button
                                onClick={() => handleUpdate(question._id)}
                                className="text-blue-500 hover:text-blue-700 mr-2"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(question._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuestionsList;
