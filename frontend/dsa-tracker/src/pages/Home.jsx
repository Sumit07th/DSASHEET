import Navbar from '../components/Navbar';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/atoms/authAtoms';
import { themeState } from '../recoil/atoms/themeAtom';
import { FaChevronLeft, FaChevronRight, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import Icon1 from '../assets/icons/icon-1.jpeg';
import Icon2 from '../assets/icons/icon-2.jpeg';
import Icon3 from '../assets/icons/icon-3.jpeg';
import Footer from './Footer.jsx';



const Home = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useRecoilValue(authState);
    const theme = useRecoilValue(themeState);

    // Apply dark mode class to the <html> element based on the theme state
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Dummy data for success stories and FAQs
    const [currentSlide, setCurrentSlide] = useState(0);
    const testimonials = [
        {
            name: 'Amit Kumar',
            review: 'This platform is a game-changer for DSA preparation. I cracked my dream job!',
        },
        {
            name: 'Priya Singh',
            review: 'The DSA sheets here helped me level up my coding skills in no time.',
        },
        {
            name: 'Rahul Sharma',
            review: 'The intuitive UI and comprehensive questions make this platform my go-to for practice.',
        },
    ];

    const faqData = [
        {
            question: 'What is CodeCompass?',
            answer: 'CodeCompass is your ultimate tool for mastering Data Structures and Algorithms.',
        },
        {
            question: 'Is it free to use?',
            answer: 'Yes, you can try it for free and access our basic features to enhance your coding skills.',
        },
        {
            question: 'Can I track my progress?',
            answer: 'Absolutely! You can track your progress with our user-friendly dashboard.',
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleButtonClick = (name) => {
        if (isLoggedIn) {
            navigate(`/dashboard/${name}`);
        } else {
            navigate('/login');
        }
    };

    const cardData = [
        {
            name: 'BASIC',
            description: 'Foundational concepts to kickstart your DSA journey.'
        },
        {
            name: 'A2Z',
            description: 'Comprehensive coverage of all essential DSA topics.'
        },
        {
            name: 'TCS',
            description: 'Tailored for TCS interview preparation.'
        },
        {
            name: 'SDE',
            description: 'Advanced problems for aspiring Software Development Engineers.'
        },
        {
            name: 'CP',
            description: 'Strategies to excel in competitive programming contests.'
        }
    ];




    return (
        <div className="min-h-screen bg-gray-100 hover:bg-black">


            <section className="hero-section bg-gradient-to-r from-blue-500 to-purple-600 py-20 text-center relative">
                <div
                    className="absolute inset-0 bg-gradient-to-br from-transparent to-white opacity-10 animate-pulse dark:bg-black dark:text-white"></div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 relative">
                    <span className="text-yellow-300">MASTER</span> DATA STRUCTURES & ALGORITHMS:
                    <span className="block md:inline text-pink-400"> BUILD YOUR FUTURE</span>
                </h1>

            </section>

            {/* Cards Section */}
            <section className="py-16 bg-gray-100 dark:bg-black dark:text-white">
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 dark:bg-black dark:text-white">
                    {cardData.map((card, index) => (
                        <div
                            key={index}
                            className="border-4 bg-white p-8 shadow-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:bg-black dark:text-white dark:border-white"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:bg-black dark:text-white">{card.name}</h2>
                            <p className="text-gray-600 mb-6 dark:bg-black dark:text-white">{card.description}</p>
                            <button
                                onClick={() => handleButtonClick(card.name)}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-md hover:from-purple-600 hover:to-blue-500 transition-all duration-300 dark:bg-black dark:text-white"
                            >
                                Start Practicing
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 bg-gray-100 dark:bg-black dark:text-white">
                <div className="container mx-auto text-center dark:bg-black dark:text-white">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-8 dark:bg-black dark:text-white">Why Choose Us?</h2>
                    <div className="border-t-4 border-blue-500 w-24 mx-auto mb-8 dark:bg-black dark:text-white"></div>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10 dark:bg-black dark:text-white">
                        Our platform is designed to make your DSA preparation smooth, efficient, and effective. We offer
                        high-quality questions, an intuitive UI, progress tracking, and a strong community that helps
                        you throughout your learning journey. Whether you're a beginner or an advanced coder, we've got
                        you covered.
                    </p>
                    <div className="flex justify-center space-x-6 dark:bg-black dark:text-white">
                        <div className="border-4 bg-white p-6 rounded-lg  max-w-xs dark:bg-black dark:text-white dark:border-white">
                            <img src={Icon1} alt="Quality Questions"
                                 className="w-12 h-12 mx-auto mb-4 dark:bg-black dark:text-white"/>
                            <h3 className="font-bold text-xl mb-2 dark:bg-black dark:text-white">Quality Questions</h3>
                            <p className="text-gray-600 dark:bg-black dark:text-white">Carefully curated questions to enhance your problem-solving
                                skills.</p>
                        </div>
                        <div className="border-4 bg-white p-6 rounded-lg shadow-md max-w-xs dark:bg-black dark:text-white dark:border-white">
                            <img src={Icon2} alt="Intuitive UI"
                                 className="w-12 h-12 mx-auto mb-4 dark:bg-black dark:text-white"/>
                            <h3 className="font-bold text-xl mb-2 dark:bg-black dark:text-white">Intuitive UI</h3>
                            <p className="text-gray-600 dark:bg-black dark:text-white">Designed with simplicity in mind to focus on your learning.</p>
                        </div>
                        <div className="border-4 bg-white p-6 rounded-lg shadow-md max-w-xs dark:bg-black dark:text-white dark:border-white">
                            <img src={Icon3} alt="Progress Tracking"
                                 className="w-12 h-12 mx-auto mb-4 dark:bg-black dark:text-white"/>
                            <h3 className="font-bold text-xl mb-2 dark:bg-black dark:text-white">Progress Tracking</h3>
                            <p className="text-gray-600 dark:bg-black dark:text-white">Easily monitor your progress and stay motivated.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories */}
            <section className="py-16 bg-gray-100 dark:bg-black dark:text-white">
                <div className="container mx-auto text-center ">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8 dark:bg-black dark:text-white">Success Stories</h2>
                    <div className="relative max-w-2xl mx-auto bg-black p-8 rounded-lg shadow-lg ">
                        <div className="absolute inset-0 flex items-center justify-between px-4 ">
                            <button
                                onClick={prevSlide}
                                className="bg-black text-gray-600 hover:bg-gray-300 p-3 rounded-full shadow-md transform transition-transform duration-300 hover:scale-110 dark:bg-black dark:text-white"
                            >
                                <FaChevronLeft className="text-2xl dark:bg-black dark:text-white"/>
                            </button>
                            <button
                                onClick={nextSlide}
                                className="bg-gray-200 text-gray-600 hover:bg-gray-300 p-3 rounded-full shadow-md transform transition-transform duration-300 hover:scale-110 dark:bg-black dark:text-white"
                            >
                                <FaChevronRight className="text-2xl dark:bg-black dark:text-white"/>
                            </button>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="mx-6 dark:bg-black dark:text-white">
                                <p className="text-xl text-white italic">"{testimonials[currentSlide].review}"</p>
                                <p className="mt-4 text-white font-semibold">- {testimonials[currentSlide].name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-100 dark:bg-black dark:text-white">
                <div className="container mx-auto dark:bg-black dark:text-white">
                    <h2 className="text-4xl font-bold text-center mb-8 dark:bg-black dark:text-white">Frequently Asked Questions</h2>
                    <div className="max-w-2xl mx-auto dark:bg-black dark:text-white">
                        {faqData.map((faq, index) => (
                            <div key={index} className="mb-6 dark:bg-black dark:text-white">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2 dark:bg-black dark:text-white">{faq.question}</h3>
                                <p className="text-gray-600 dark:bg-black dark:text-white">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
           <Footer />
        </div>
    );
};

export default Home;
