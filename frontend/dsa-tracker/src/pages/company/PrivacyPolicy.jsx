import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/atoms/themeAtom.js';

const PrivacyPolicy = () => {
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
                <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">Privacy Policy</h1>

                <p className="mb-4 text-gray-700 dark:text-white">
                    At <strong>CodeCompass</strong>, we value your privacy and are committed to protecting your personal information.
                    This privacy policy outlines how we collect, use, and protect your data when you use our website and services.
                </p>

                <h2 className="text-2xl font-semibold mb-3 dark:text-white">1. Information We Collect</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    We collect personal data that you provide directly to us when you create an account, update your profile, or communicate
                    with us. This may include your name, email address, phone number, and other information that you voluntarily share with us.
                </p>

                <h2 className="text-2xl font-semibold mb-3 dark:text-white">2. How We Use Your Information</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    We use the information we collect to:
                </p>
                <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-white">
                    <li>Provide and improve our services</li>
                    <li>Communicate with you regarding updates, promotions, or support</li>
                    <li>Ensure security and prevent fraud</li>
                    <li>Comply with legal obligations</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-3 dark:text-white">3. Cookies and Tracking Technologies</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    We use cookies and similar tracking technologies to monitor activity on our website and improve user experience.
                    You can manage your cookie preferences through your browser settings.
                </p>

                <h2 className="text-2xl font-semibold mb-3 dark:text-white">4. Sharing Your Information</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    We do not share your personal data with third parties except in the following situations:
                </p>
                <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-white">
                    <li>With your consent</li>
                    <li>For legal reasons, such as complying with a subpoena or other legal processes</li>
                    <li>To trusted partners who assist us in providing services, under confidentiality agreements</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-3 dark:text-white">5. Data Security</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    We take the security of your data seriously and use industry-standard practices to protect your information
                    from unauthorized access, alteration, or destruction. However, no method of transmission over the Internet or
                    method of electronic storage is 100% secure.
                </p>

                <h2 className="text-2xl font-semibold mb-3 dark:text-white">6. Your Rights</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    You have the right to access, update, or delete the personal information we have about you. You can exercise these
                    rights by logging into your account or contacting us directly.
                </p>

                <h2 className="text-2xl font-semibold mb-3 dark:text-white">7. Changes to This Privacy Policy</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    We may update this privacy policy from time to time to reflect changes in our practices. When we make changes,
                    we will notify you by updating the "Last Updated" date at the bottom of this policy.
                </p>

                <h2 className="text-2xl font-semibold mb-3 dark:text-white">8. Contact Us</h2>
                <p className="mb-4 text-gray-700 dark:text-white">
                    If you have any questions or concerns about this privacy policy, please contact us at:
                </p>
                <ul className="list-inside mb-4 text-gray-700 dark:text-white">
                    <li><strong>Email:</strong> <a href="mailto:privacy@codecompass.com" className="text-blue-600 hover:underline dark:text-blue-400">privacy@codecompass.com</a></li>
                    <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                    <li><strong>Address:</strong> 123 Coding St, Tech City, USA</li>
                </ul>

                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Last Updated: {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
