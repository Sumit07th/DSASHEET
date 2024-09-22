import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/atoms/themeAtom.js';

const TermsConditions = () => {
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
        <div className={`min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black dark:text-white`}>
            <div className="max-w-7xl mx-auto p-8 bg-white dark:bg-black rounded-lg shadow-md mt-20">
                <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">Terms & Conditions</h1>

                <p className="mb-4 text-gray-700 dark:text-white">
                    Welcome to <strong>CodeCompass</strong>. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
                </p>

                <h2 className="text-2xl font-semibold mb-3 dark:text-white">1. Acceptance of Terms</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    By using our website, you agree to accept and comply with these terms. If you do not agree to these terms, please do not use our website or services.
                </p>

                <h2 className="text-2xl font-semibold mb-3 dark:text-white">2. Use of Services</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    You agree to use our services only for lawful purposes and in accordance with the terms. You must not use our site in any way that causes or may cause harm to the site or impairs access to it.
                </p>

                <h2 className="text-2xl font-semibold mb-3 dark:text-white">3. Account Responsibility</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    When you create an account on CodeCompass, you are responsible for maintaining the security of your account. You must notify us immediately of any unauthorized use of your account.
                </p>

                <h2 className="text-2xl font-semibold mb-3 dark:text-white">4. Intellectual Property</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    The content, design, logos, and other intellectual property on the site are owned by CodeCompass and are protected by copyright and other laws. You are not allowed to use any of our content without prior written permission.
                </p>

                <h2 className="text-2xl font-semibold mb-3 dark:text-white">5. Termination</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    We reserve the right to terminate or suspend access to our services immediately, without prior notice, for any reason, including violation of these terms.
                </p>

                <h2 className="text-2xl font-semibold mb-3 dark:text-white">6. Limitation of Liability</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    CodeCompass will not be held responsible or liable for any damages arising from your use of the website, including but not limited to direct, indirect, or consequential damages.
                </p>

                <h2 className="text-2xl font-semibold mb-3 dark:text-white">7. Modifications to Terms</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    We reserve the right to modify these terms at any time. Changes will be posted on this page, and the date of the last update will be noted at the bottom. Continued use of the site after changes indicates your acceptance of the new terms.
                </p>

                <h2 className="text-2xl font-semibold mb-3 dark:text-white">8. Governing Law</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    These terms and conditions are governed by the laws of the country in which CodeCompass operates. Any disputes will be resolved in the courts of this country.
                </p>

                <h2 className="text-2xl font-semibold mb-3 dark:text-white">9. Contact Information</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    If you have any questions or concerns regarding these terms, please contact us:
                </p>
                <ul className="list-inside mb-4 text-gray-700 dark:text-white">
                    <li><strong>Email:</strong> <a href="mailto:support@codecompass.com" className="text-blue-600 hover:underline dark:text-blue-400">support@codecompass.com</a></li>
                    <li><strong>Phone:</strong> +1 (555) 987-6543</li>
                    <li><strong>Address:</strong> 456 Developer Lane, Tech City, USA</li>
                </ul>

                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Last Updated: {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default TermsConditions;
