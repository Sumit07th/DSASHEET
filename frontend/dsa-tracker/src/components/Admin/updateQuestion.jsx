import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuestions, updateQuestion } from '../../api/adminApi';

const UpdateQuestion = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        topic: '',
        question: '',
        article: '',
        videoLink: '',
        platformLink: '',
        difficulty: 'Easy',
    });

    useEffect(() => {
        const getQuestion = async () => {
            try {
                const questions = await fetchQuestions();
                const questionToUpdate = questions.find(q => q._id === id);
                if (questionToUpdate) {
                    setFormData(questionToUpdate);
                } else {
                    console.error('Question not found');
                    // Handle case where question is not found
                }
            } catch (error) {
                console.error('Error fetching question:', error.message);
                // Handle error
            }
        };
        getQuestion();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateQuestion(id, formData);
            alert('Question updated successfully');
            navigate('/questions');
        } catch (error) {
            alert(`Error updating question: ${error.message}`);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Update Question</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Topic</label>
                    <input
                        type="text"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Question</label>
                    <input
                        type="text"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Article</label>
                    <input
                        type="text"
                        name="article"
                        value={formData.article}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Video Link</label>
                    <input
                        type="url"
                        name="videoLink"
                        value={formData.videoLink}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Platform Link</label>
                    <input
                        type="url"
                        name="platformLink"
                        value={formData.platformLink}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                    <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Update Question
                </button>
            </form>
        </div>
    );
};

export default UpdateQuestion;
