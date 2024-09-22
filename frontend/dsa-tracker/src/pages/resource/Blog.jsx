import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/atoms/themeAtom.js';

const Blog = () => {
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

    return (
        <div className="dark:bg-black dark:text-white min-h-screen pt-20">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">CodeCompass Blog</h1>

                <p className="text-center text-lg mb-12 dark:text-gray-300">
                    Explore articles and insights about data structures, algorithms, coding tips, and more!
                </p>

                {/* Placeholder for future blogs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Example blog post */}
                    <div className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Mastering Recursion in Algorithms</h2>
                        <p className="dark:text-gray-300 mb-4">
                            Dive deep into the concept of recursion, its advantages, and how to implement it effectively in solving complex problems.
                        </p>
                        <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Read More</a>
                    </div>

                    {/* Another blog post */}
                    <div className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Tips for Cracking the Coding Interview</h2>
                        <p className="dark:text-gray-300 mb-4">
                            Learn the essential tips to prepare for your next coding interview and secure your dream job.
                        </p>
                        <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Read More</a>
                    </div>

                    {/* Another blog post */}
                    <div className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Data Structures You Must Know</h2>
                        <p className="dark:text-gray-300 mb-4">
                            A comprehensive guide on the most important data structures, their use cases, and time complexities.
                        </p>
                        <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
