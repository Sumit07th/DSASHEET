import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/atoms/themeAtom.js';

const FAQs = () => {
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

    const faqs = [
        {
            question: "What is CodeCompass?",
            answer: "CodeCompass is an online platform designed to help users practice data structures and algorithms through coding challenges and progress tracking."
        },
        {
            question: "How do I create an account?",
            answer: "You can create an account by clicking the 'Sign Up' button on the homepage and filling out the registration form."
        },
        {
            question: "Can I reset my password?",
            answer: "Yes, if you forget your password, you can click on 'Forgot Password' to receive a password reset email."
        },
        {
            question: "What kind of coding challenges are available?",
            answer: "We offer a variety of coding challenges across different topics including arrays, strings, algorithms, and data structures."
        },
        {
            question: "How can I track my progress?",
            answer: "Once logged in, you can view your progress on your dashboard, which shows completed challenges and overall performance."
        }
    ];

    return (
        <div className="dark:bg-black dark:text-white min-h-screen pt-20">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">Frequently Asked Questions</h1>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4 dark:text-white">{faq.question}</h2>
                            <p className="dark:text-gray-300">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQs;
