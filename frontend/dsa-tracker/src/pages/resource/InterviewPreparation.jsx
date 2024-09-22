import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/atoms/themeAtom.js';

const InterviewPreparation = () => {
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

    const sections = [
        {
            title: "Understand the Job Description",
            content: "Read the job description carefully and understand the required skills and responsibilities. Tailor your preparation to meet the specific needs of the role."
        },
        {
            title: "Review Common Interview Questions",
            content: "Familiarize yourself with common interview questions for your field. Practice articulating your answers clearly and concisely."
        },
        {
            title: "Brush Up on Technical Skills",
            content: "For technical roles, review key concepts, algorithms, and data structures. Utilize platforms like CodeCompass to practice coding problems."
        },
        {
            title: "Prepare Your Questions",
            content: "Have insightful questions ready to ask your interviewers. This shows your interest in the role and helps you gauge if it's the right fit for you."
        },
        {
            title: "Mock Interviews",
            content: "Conduct mock interviews with friends or use platforms that offer mock interviews. This practice can help you get comfortable with the interview format."
        },
        {
            title: "Dress Professionally",
            content: "Choose appropriate attire based on the company culture. Dressing well can boost your confidence and leave a good impression."
        },
        {
            title: "Follow Up After the Interview",
            content: "Send a thank-you email to express gratitude for the opportunity to interview. This can reinforce your interest in the position."
        }
    ];

    return (
        <div className="dark:bg-black dark:text-white min-h-screen pt-20">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">Interview Preparation Tips</h1>

                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4 dark:text-white">{section.title}</h2>
                            <p className="dark:text-gray-300">{section.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InterviewPreparation;
