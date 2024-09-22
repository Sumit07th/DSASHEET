import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/atoms/themeAtom.js';

const AboutUs = () => {
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
        <div className={`min-h-screen flex flex-col items-center justify-center bg dark:bg-black`}>
            <div className=" max-w-7xl flex-grow mx-auto p-6 bg-white dark:bg-black rounded-lg shadow-md mt-20  ">
                <h1 className="text-3xl font-bold mb-4 text-center dark:text-white">About Us</h1>
                <p className="mb-4 text-gray-700 dark:text-white">
                    Welcome to CodeCompass, your ultimate guide to mastering Data Structures and Algorithms (DSA).
                    We are dedicated to providing you with the best resources, tools, and community support to
                    enhance your coding skills and prepare for technical interviews.
                </p>

                <h2 className="text-2xl font-semibold mb-2 dark:text-white">Our Mission</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    Our mission is to empower aspiring software engineers with the knowledge and skills necessary
                    to excel in their careers. We aim to create a platform that not only helps users learn DSA
                    concepts but also allows them to apply their knowledge through practical coding challenges.
                </p>

                <h2 className="text-2xl font-semibold mb-2 dark:text-white">Our Vision</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    We envision a world where every software engineer has access to high-quality educational
                    resources and a supportive community. Our goal is to be the go-to platform for anyone looking
                    to improve their coding skills and succeed in technical interviews.
                </p>

                <h2 className="text-2xl font-semibold mb-2 dark:text-white">What We Offer</h2>
                <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-white">
                    <li>Comprehensive tutorials on DSA concepts</li>
                    <li>Interactive coding challenges to practice your skills</li>
                    <li>A community forum for discussing problems and solutions</li>
                    <li>Regular blogs and resources on career tips and interview preparation</li>
                    <li>Progress tracking to help you stay motivated</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2 dark:text-white">Meet the Team</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    Our team is composed of experienced software engineers, educators, and industry professionals
                    who are passionate about teaching and mentoring. Together, we strive to build a platform that
                    is both effective and enjoyable for our users.
                </p>

                <h2 className="text-2xl font-semibold mb-2 dark:text-white">Join Us</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    Whether you are a beginner or an experienced coder, we invite you to join our community and
                    start your journey with CodeCompass. Together, we can achieve your coding goals and pave
                    the way for your success in the tech industry.
                </p>

                <h2 className="text-2xl font-semibold mb-2 dark:text-white">Why Choose Us?</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    At CodeCompass, we understand the challenges faced by aspiring coders. Our platform is designed
                    with your needs in mind. We provide:
                </p>
                <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-white">
                    <li>Expert guidance from experienced professionals</li>
                    <li>Interactive learning tools that make coding fun</li>
                    <li>A supportive community to help you along the way</li>
                    <li>Up-to-date resources that reflect the latest industry trends</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2 dark:text-white">Contact Us</h2>
                <p className="text-gray-700 dark:text-white">
                    If you have any questions, suggestions, or feedback, feel free to reach out to us at -
                    <a href="mailto:support@codecompass.com" className="text-blue-600 hover:underline dark:text-blue-400">
                        support@codecompass.com
                    </a>.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
