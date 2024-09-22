import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/atoms/themeAtom.js';

const CareerTips = () => {
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

    const tips = [
        {
            title: "1. Master Data Structures and Algorithms",
            description: "To excel in technical interviews, focus on understanding and practicing key data structures and algorithms. Sites like CodeCompass offer challenges to enhance your skills."
        },
        {
            title: "2. Build Projects",
            description: "Hands-on experience with real-world projects will help you understand coding in a practical environment. Showcase these projects in your portfolio to demonstrate your skills."
        },
        {
            title: "3. Keep Learning New Technologies",
            description: "The tech industry is ever-evolving. Stay up to date with the latest trends and technologies by constantly learning new frameworks, tools, and languages."
        },
        {
            title: "4. Networking is Key",
            description: "Connect with professionals in your field, attend meetups, and join coding communities. Networking can open up job opportunities and provide valuable insights."
        },
        {
            title: "5. Tailor Your Resume",
            description: "Customize your resume for every job application. Highlight relevant experience, skills, and projects that match the job description."
        },
        {
            title: "6. Practice Mock Interviews",
            description: "Mock interviews can help reduce anxiety and improve your problem-solving approach. Use platforms like Pramp or Interviewing.io for mock interview practice."
        },
        {
            title: "7. Focus on Soft Skills",
            description: "Communication, teamwork, and problem-solving skills are just as important as technical skills. Make sure you work on improving your soft skills for a balanced career growth."
        }
    ];

    return (
        <div className="dark:bg-black dark:text-white min-h-screen pt-20">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">Career Tips</h1>

                <div className="space-y-8">
                    {tips.map((tip, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4 dark:text-white">{tip.title}</h2>
                            <p className="dark:text-gray-300">{tip.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CareerTips;
