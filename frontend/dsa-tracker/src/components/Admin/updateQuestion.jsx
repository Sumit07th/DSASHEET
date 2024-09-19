import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuestions, updateQuestion, deleteSolution, addSolution } from '../../api/adminApi';

const UpdateQuestion = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        topic: '',
        question: '',
        article: {
            topic: '',
            problemStatement: '',
            example: '',
            solutions: []
        },
        videoLink: '',
        platformLink: '',
        difficulty: 'Easy',
        sheet:'',
    });
    const [newSolution, setNewSolution] = useState({ approach: '', code: '' });
    const [editingSolutionIndex, setEditingSolutionIndex] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const getQuestion = async () => {
            try {
                const questions = await fetchQuestions();
                const questionToUpdate = questions.find(q => q._id === id);
                if (questionToUpdate) {
                    setFormData(questionToUpdate);
                } else {
                    console.error('Question not found');
                }
            } catch (error) {
                console.error('Error fetching question:', error.message);
            }
        };
        getQuestion();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleArticleChange = (e) => {
        setFormData({
            ...formData,
            article: { ...formData.article, [e.target.name]: e.target.value }
        });
    };

    const handleSolutionChange = (e) => {
        setNewSolution({ ...newSolution, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateQuestion(id, formData);
            alert('Question updated successfully');
            navigate('/questionsList');
        } catch (error) {
            alert(`Error updating question: ${error.message}`);
        }
    };

    const handleAddSolution = async (e) => {
        e.preventDefault();
        if (!newSolution.approach || !newSolution.code) {
            setErrorMessage('Both approach and code are required.');
            return;
        }

        setErrorMessage(''); // Clear any previous error message

        try {
            let updatedArticle;
            if (editingSolutionIndex !== null) {
                // Update existing solution
                const updatedSolutions = [...formData.article.solutions];
                updatedSolutions[editingSolutionIndex] = newSolution;
                updatedArticle = { ...formData.article, solutions: updatedSolutions };
                setEditingSolutionIndex(null);
            } else {
                // Add new solution
                updatedArticle = await addSolution(id, newSolution);
            }
            setFormData({ ...formData, article: updatedArticle });
            setNewSolution({ approach: '', code: '' }); // Clear new solution fields
            // Optionally, refetch the data to ensure synchronization
            const questions = await fetchQuestions();
            const questionToUpdate = questions.find(q => q._id === id);
            if (questionToUpdate) {
                setFormData(questionToUpdate);
            }
        } catch (error) {
            alert(`Error adding solution: ${error.message}`);
        }
    };

    const handleDeleteSolution = async (solutionId) => {
        try {
            await deleteSolution(id, solutionId);
            const updatedSolutions = formData.article.solutions.filter(solution => solution._id !== solutionId);
            setFormData({ ...formData, article: { ...formData.article, solutions: updatedSolutions } });
            alert('Solution deleted successfully');
        } catch (error) {
            alert(`Error deleting solution: ${error.message}`);
        }
    };

    const handleEditSolution = (index) => {
        setNewSolution(formData.article.solutions[index] || { approach: '', code: '' });
        setEditingSolutionIndex(index);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Update Question</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Topic */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Topic</label>
                    <input
                        type="text"
                        name="topic"
                        value={formData.topic || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                {/* Question */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Question</label>
                    <input
                        type="text"
                        name="question"
                        value={formData.question || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                {/* Article */}
                <div>
                    <h2 className="text-xl font-bold">Article Details</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Article Topic</label>
                        <input
                            type="text"
                            name="topic"
                            value={formData.article.topic || ''}
                            onChange={handleArticleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Problem Statement</label>
                        <input
                            type="text"
                            name="problemStatement"
                            value={formData.article.problemStatement || ''}
                            onChange={handleArticleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Example</label>
                        <input
                            type="text"
                            name="example"
                            value={formData.article.example || ''}
                            onChange={handleArticleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Solutions */}
                    {formData.article.solutions && formData.article.solutions.length > 0 ? (
                        formData.article.solutions.map((item, index) => (
                            <div key={item._id} className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Approach {index + 1}
                                </label>
                                <input
                                    type="text"
                                    name="approach"
                                    value={item.approach || ''}
                                    onChange={(e) => handleSolutionChange(e)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                                <label className="block text-sm font-medium text-gray-700">
                                    Code {index + 1}
                                </label>
                                <input
                                    type="text"
                                    name="code"
                                    value={item.code || ''}
                                    onChange={(e) => handleSolutionChange(e)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => handleDeleteSolution(item._id)}
                                    className="bg-red-500 text-white p-2 rounded mt-2"
                                >
                                    Delete Solution
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleEditSolution(index)}
                                    className="bg-yellow-500 text-white p-2 rounded mt-2 ml-2"
                                >
                                    Edit Solution
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No solutions available</p>
                    )}

                    {/* Add New or Edit Solution */}
                    <div>
                        <h3 className="text-lg font-bold">{editingSolutionIndex !== null ? 'Edit Solution' : 'Add New Solution'}</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Approach</label>
                            <input
                                type="text"
                                name="approach"
                                value={newSolution.approach || ''}
                                onChange={handleSolutionChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Code</label>
                            <input
                                type="text"
                                name="code"
                                value={newSolution.code || ''}
                                onChange={handleSolutionChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <button
                            type="submit"
                            onClick={handleAddSolution}
                            className="bg-blue-500 text-white p-2 rounded mt-2"
                        >
                            {editingSolutionIndex !== null ? 'Update Solution' : 'Add Solution'}
                        </button>
                    </div>
                </div>

                {/* Video Link */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Video Link</label>
                    <input
                        type="text"
                        name="videoLink"
                        value={formData.videoLink || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Platform Link */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Platform Link</label>
                    <input
                        type="text"
                        name="platformLink"
                        value={formData.platformLink || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Difficulty */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                    <select
                        name="difficulty"
                        value={formData.difficulty || 'Easy'}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Sheet</label>
                    <input
                        type="text"
                        name="sheet"
                        value={formData.sheet || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>


                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Update Question
                </button>
            </form>
        </div>
    );
};

export default UpdateQuestion;
