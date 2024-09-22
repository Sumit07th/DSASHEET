import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticle } from '../../api/userApi'; // You need to create this API function
import { ChevronDownIcon, ChevronUpIcon, ClipboardIcon } from '@heroicons/react/24/solid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbar from "../Navbar.jsx";
import {useRecoilValue} from "recoil";
import {themeState} from "../../recoil/atoms/themeAtom.js";

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

    const theme = useRecoilValue(themeState);

    // Apply dark mode class to the <html> element based on the theme state
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

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
        <div className="p-4 bg-gray-100 min-h-screen dark:bg-black dark:text-white">

            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:bg-black dark:text-white">{article.topic}</h1>
            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-black dark:text-white">
                <h2 className="text-xl font-semibold mb-4 dark:bg-black dark:text-white">Problem Statement:</h2>
                <p className="text-gray-700 mb-4 dark:bg-black dark:text-white">{article.problemStatement}</p>
                <h3 className="text-lg font-semibold mt-4 dark:bg-black dark:text-white">Example:</h3>
                <p className="text-gray-700 mb-4 dark:bg-black dark:text-white">{article.example}</p>
                <h3 className="text-lg font-semibold mt-4 dark:bg-black dark:text-white">Solutions:</h3>
                {article.solutions.map((solution, index) => (
                    <div key={index} className="border-b border-gray-200 mb-4 dark:bg-black dark:text-white">
                        <button
                            onClick={() => toggleSolution(index)}
                            className="w-full p-4 text-left bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 focus:outline-none flex justify-between items-center dark:bg-black dark:text-white"
                        >
                            <span>Approach {index + 1}</span>
                            {expandedSolution === index ? (
                                <ChevronUpIcon className="w-5 h-5 text-gray-500 dark:bg-black dark:text-white" />
                            ) : (
                                <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:bg-black dark:text-white" />
                            )}
                        </button>
                        {expandedSolution === index && (
                            <div className="p-4 bg-gray-50 rounded-b-lg relative dark:bg-black dark:text-white">
                                <h4 className="font-semibold mb-2 dark:bg-black dark:text-white">Approach {index + 1}:</h4>
                                <p className="text-gray-700 mb-2 dark:bg-black dark:text-white">{solution.approach}</p>
                                <h4 className="font-semibold mb-2 dark:bg-black dark:text-white">Code:</h4>
                                <div className="relative">
                                    <ClipboardIcon
                                        className="w-5 h-5 text-gray-500 absolute right-2 top-2 cursor-pointer hover:text-gray-700 dark:bg-black dark:text-white"
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
