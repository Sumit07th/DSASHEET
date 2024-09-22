import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/atoms/themeAtom.js';

const CodingChallenges = () => {
    const theme = useRecoilValue(themeState);

    // Apply dark mode class to the <html> element based on the theme state
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const challenges = [
        {
            title: "1. Two Sum",
            description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target."
        },
        {
            title: "2. Reverse String",
            description: "Write a function that reverses a string. The input string is given as an array of characters."
        },
        {
            title: "3. Merge Intervals",
            description: "Given a collection of intervals, merge all overlapping intervals."
        },
        {
            title: "4. Valid Parentheses",
            description: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid."
        },
        {
            title: "5. Best Time to Buy and Sell Stock",
            description: "Say you have an array for which the ith element is the price of a given stock on day i. Find the maximum profit you can achieve."
        },
        {
            title: "6. Maximum Subarray",
            description: "Find the contiguous subarray (containing at least one number) which has the largest sum and return its sum."
        },
        {
            title: "7. Climbing Stairs",
            description: "You are climbing a staircase. It takes N steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?"
        }
    ];

    return (
        <div className="dark:bg-black dark:text-white min-h-screen pt-20">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">Coding Challenges</h1>

                <div className="space-y-8">
                    {challenges.map((challenge, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4 dark:text-white">{challenge.title}</h2>
                            <p className="dark:text-gray-300">{challenge.description}</p>
                            <a
                                href={`/challenge/${index + 1}`}
                                className="mt-4 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Solve Challenge
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CodingChallenges;
