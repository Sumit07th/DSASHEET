import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/atoms/authAtoms';
import { FaChevronLeft, FaChevronRight, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';


const Home = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useRecoilValue(authState);

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
            question: 'What is DSA Tracker?',
            answer: 'DSA Tracker is your ultimate tool for mastering Data Structures and Algorithms.',
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

    const handleButtonClick = () => {
        if (isLoggedIn) {
            navigate('/user-dashboard');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar/>

            <section className="hero-section bg-gradient-to-r from-blue-500 to-purple-600 py-20 text-center relative">
                <div
                    className="absolute inset-0 bg-gradient-to-br from-transparent to-white opacity-10 animate-pulse"></div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 relative">
                    <span className="text-yellow-300">MASTER</span> DATA STRUCTURES & ALGORITHMS:
                    <span className="block md:inline text-pink-400"> BUILD YOUR FUTURE</span>
                </h1>
                <button
                    onClick={handleButtonClick}
                    className="bg-white text-purple-700 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-purple-700 hover:text-white transition-transform transform hover:scale-105 duration-300 relative"
                >
                    Try it Free
                </button>
            </section>

            {/* Cards Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array(6)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 shadow-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">DSA Sheet {index + 1}</h2>
                                <p className="text-gray-600 mb-6">
                                    The most comprehensive DSA sheet to master algorithms and data structures.
                                </p>
                                <button
                                    onClick={handleButtonClick}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-md hover:from-purple-600 hover:to-blue-500 transition-all duration-300"
                                >
                                    Start Practicing
                                </button>
                            </div>
                        ))}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Why Choose Us?</h2>
                    <div className="border-t-4 border-blue-500 w-24 mx-auto mb-8"></div>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
                        Our platform is designed to make your DSA preparation smooth, efficient, and effective. We offer
                        high-quality questions, an intuitive UI, progress tracking, and a strong community that helps
                        you throughout your learning journey. Whether you're a beginner or an advanced coder, we've got
                        you covered.
                    </p>
                    <div className="flex justify-center space-x-6">
                        <div className="bg-white p-6 rounded-lg shadow-md max-w-xs">
                            <img src="../assets/icons/icon-1.jpeg" alt="Quality Questions" className="w-12 h-12 mx-auto mb-4"/>
                            <h3 className="font-bold text-xl mb-2">Quality Questions</h3>
                            <p className="text-gray-600">Carefully curated questions to enhance your problem-solving
                                skills.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md max-w-xs">
                            <img src="../assets/icons/icon-2.jpeg" alt="Intuitive UI" className="w-12 h-12 mx-auto mb-4"/>
                            <h3 className="font-bold text-xl mb-2">Intuitive UI</h3>
                            <p className="text-gray-600">Designed with simplicity in mind to focus on your learning.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md max-w-xs">
                            <img src="../assets/icons/icon-3.jpeg" alt="Progress Tracking" className="w-12 h-12 mx-auto mb-4"/>
                            <h3 className="font-bold text-xl mb-2">Progress Tracking</h3>
                            <p className="text-gray-600">Easily monitor your progress and stay motivated.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8">Success Stories</h2>
                    <div className="relative max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                        <div className="absolute inset-0 flex items-center justify-between px-4">
                            <button
                                onClick={prevSlide}
                                className="bg-gray-200 text-gray-600 hover:bg-gray-300 p-3 rounded-full shadow-md transform transition-transform duration-300 hover:scale-110"
                            >
                                <FaChevronLeft className="text-2xl"/>
                            </button>
                            <button
                                onClick={nextSlide}
                                className="bg-gray-200 text-gray-600 hover:bg-gray-300 p-3 rounded-full shadow-md transform transition-transform duration-300 hover:scale-110"
                            >
                                <FaChevronRight className="text-2xl"/>
                            </button>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="mx-6">
                                <p className="text-xl text-gray-700 italic">"{testimonials[currentSlide].review}"</p>
                                <p className="mt-4 text-gray-600 font-semibold">- {testimonials[currentSlide].name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                    <div className="max-w-2xl mx-auto">
                        {faqData.map((faq, index) => (
                            <div key={index} className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto text-center">
                    <div className="mb-4">
                        <a href="https://facebook.com" className="text-gray-400 hover:text-white mx-2">
                            <FaFacebookF className="text-xl"/>
                        </a>
                        <a href="https://twitter.com" className="text-gray-400 hover:text-white mx-2">
                            <FaTwitter className="text-xl"/>
                        </a>
                        <a href="https://linkedin.com" className="text-gray-400 hover:text-white mx-2">
                            <FaLinkedinIn className="text-xl"/>
                        </a>
                        <a href="https://instagram.com" className="text-gray-400 hover:text-white mx-2">
                            <FaInstagram className="text-xl"/>
                        </a>
                    </div>
                    <p className="text-gray-400">© {new Date().getFullYear()} DSA Tracker. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
