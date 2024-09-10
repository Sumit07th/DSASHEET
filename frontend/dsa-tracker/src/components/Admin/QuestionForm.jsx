import React, { useState } from 'react';
import { createQuestion } from '../../api/adminApi';

const QuestionForm = () => {
    const [formData, setFormData] = useState({
        topic: '',
        question: '',
        article: {
            topic: '',
            problemStatement: '',
            example: '',
            solutions: [{ approach: '', code: '' }]
        },
        videoLink: '',
        platformLink: '',
        difficulty: 'Easy',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('article.')) {
            const articleField = name.split('.')[1];
            setFormData(prevData => ({
                ...prevData,
                article: {
                    ...prevData.article,
                    [articleField]: value
                }
            }));
        } else if (name.startsWith('solution.')) {
            const [index, field] = name.split('.').slice(1);
            setFormData(prevData => {
                const updatedSolutions = [...prevData.article.solutions];
                updatedSolutions[index] = { ...updatedSolutions[index], [field]: value };
                return {
                    ...prevData,
                    article: {
                        ...prevData.article,
                        solutions: updatedSolutions
                    }
                };
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSolutionChange = (index, field, value) => {
        setFormData(prevData => {
            const updatedSolutions = [...prevData.article.solutions];
            updatedSolutions[index] = { ...updatedSolutions[index], [field]: value };
            return {
                ...prevData,
                article: {
                    ...prevData.article,
                    solutions: updatedSolutions
                }
            };
        });
    };

    const addSolution = () => {
        setFormData(prevData => ({
            ...prevData,
            article: {
                ...prevData.article,
                solutions: [...prevData.article.solutions, { approach: '', code: '' }]
            }
        }));
    };

    const removeSolution = (index) => {
        setFormData(prevData => {
            const updatedSolutions = prevData.article.solutions.filter((_, i) => i !== index);
            return {
                ...prevData,
                article: {
                    ...prevData.article,
                    solutions: updatedSolutions
                }
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createQuestion(formData);
            alert('Question created successfully');
        } catch (error) {
            alert(`Error creating question: ${error.message}`);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Create a New Question</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Topic</label>
                        <input
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            placeholder="Topic"
                            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Question</label>
                        <input
                            name="question"
                            value={formData.question}
                            onChange={handleChange}
                            placeholder="Question"
                            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                            required
                        />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Article Details</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Article Topic</label>
                            <input
                                name="article.topic"
                                value={formData.article.topic}
                                onChange={handleChange}
                                placeholder="Article Topic"
                                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Problem Statement</label>
                            <textarea
                                name="article.problemStatement"
                                value={formData.article.problemStatement}
                                onChange={handleChange}
                                placeholder="Problem Statement"
                                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Example</label>
                            <input
                                name="article.example"
                                value={formData.article.example}
                                onChange={handleChange}
                                placeholder="Example"
                                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                            />
                        </div>
                        {formData.article.solutions.map((solution, index) => (
                            <div key={index} className="border-t pt-4">
                                <h4 className="text-md font-semibold mb-2">Solution {index + 1}</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Approach</label>
                                        <input
                                            name={`solution.${index}.approach`}
                                            value={solution.approach}
                                            onChange={(e) => handleSolutionChange(index, 'approach', e.target.value)}
                                            placeholder="Approach"
                                            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Code</label>
                                        <textarea
                                            name={`solution.${index}.code`}
                                            value={solution.code}
                                            onChange={(e) => handleSolutionChange(index, 'code', e.target.value)}
                                            placeholder="Code"
                                            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeSolution(index)}
                                        className="text-red-600 hover:text-red-800 mt-2"
                                    >
                                        Remove Solution
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addSolution}
                            className="bg-green-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-700"
                        >
                            Add Solution
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Video Link</label>
                        <input
                            name="videoLink"
                            value={formData.videoLink}
                            onChange={handleChange}
                            placeholder="Video Link"
                            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Platform Link</label>
                        <input
                            name="platformLink"
                            value={formData.platformLink}
                            onChange={handleChange}
                            placeholder="Platform Link"
                            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                    <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default QuestionForm;
