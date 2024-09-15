import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticle } from '../../api/userApi'; // You need to create this API function
import { ChevronDownIcon, ChevronUpIcon, ClipboardIcon } from '@heroicons/react/24/solid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbar from "../Navbar.jsx";

const ArticlePage = () => {
    const { questionId } = useParams();
    const [article, setArticle] = useState(null);
    const [expandedSolution, setExpandedSolution] = useState(null);

    useEffect(() => {
        const loadArticle = async () => {
            try {
                const data = await fetchArticle(questionId);
                setArticle(data);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        loadArticle();
    }, [questionId]);

    const toggleSolution = (index) => {
        setExpandedSolution(expandedSolution === index ? null : index);
    };

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            alert('Code copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy code: ', err);
        });
    };

    if (!article) {
        return <div className="p-4 bg-gray-100 min-h-screen">Loading...</div>;
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <Navbar />
            <h1 className="text-3xl font-bold mb-6 text-gray-800">{article.topic}</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Problem Statement:</h2>
                <p className="text-gray-700 mb-4">{article.problemStatement}</p>
                <h3 className="text-lg font-semibold mt-4">Example:</h3>
                <p className="text-gray-700 mb-4">{article.example}</p>
                <h3 className="text-lg font-semibold mt-4">Solutions:</h3>
                {article.solutions.map((solution, index) => (
                    <div key={index} className="border-b border-gray-200 mb-4">
                        <button
                            onClick={() => toggleSolution(index)}
                            className="w-full p-4 text-left bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 focus:outline-none flex justify-between items-center"
                        >
                            <span>Approach {index + 1}</span>
                            {expandedSolution === index ? (
                                <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                            ) : (
                                <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                            )}
                        </button>
                        {expandedSolution === index && (
                            <div className="p-4 bg-gray-50 rounded-b-lg relative">
                                <h4 className="font-semibold mb-2">Approach {index + 1}:</h4>
                                <p className="text-gray-700 mb-2">{solution.approach}</p>
                                <h4 className="font-semibold mb-2">Code:</h4>
                                <div className="relative">
                                    <ClipboardIcon
                                        className="w-5 h-5 text-gray-500 absolute right-2 top-2 cursor-pointer hover:text-gray-700"
                                        onClick={() => copyToClipboard(solution.code)}
                                    />
                                    <SyntaxHighlighter language="javascript" style={solarizedlight} showLineNumbers>
                                        {solution.code}
                                    </SyntaxHighlighter>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticlePage;
