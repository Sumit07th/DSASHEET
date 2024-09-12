import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticle } from '../../api/userApi'; // You need to create this API function

const ArticlePage = () => {
    const { questionId } = useParams();
    const [article, setArticle] = useState(null);

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

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">{article.topic}</h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Problem Statement:</h2>
                <p>{article.problemStatement}</p>
                <h3 className="text-lg font-semibold mt-4">Example:</h3>
                <p>{article.example}</p>
                <h3 className="text-lg font-semibold mt-4">Solutions:</h3>
                {article.solutions.map((solution, index) => (
                    <div key={index} className="mb-4">
                        <h4 className="font-semibold">Approach {index + 1}:</h4>
                        <p>{solution.approach}</p>
                        <h4 className="font-semibold">Code:</h4>
                        <pre className="bg-gray-100 p-2 rounded">{solution.code}</pre>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticlePage;
