import { useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';

function PrivacyPolicy() {
  // Animated Background Orbs
  const Orb = ({ className, delay }) => (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      animate={{
        y: [0, -20, 0],
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.3, 0.2]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: 'loop',
        delay
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-gray-100">
      <Navbar />
      <div className="container mx-auto px-6 py-20 flex-grow relative overflow-hidden lg:px-40">
        {/* Animated Background Orbs */}
        <Orb className="w-64 h-64 bg-blue-500 left-10 top-20" delay={0} />
        <Orb className="w-80 h-80 bg-purple-500 right-20 top-40" delay={1} />
        <Orb className="w-48 h-48 bg-pink-500 left-40 bottom-20" delay={2} />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-100 mb-4 leading-tight">
            Privacy Policy{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Your Data, Our Priority
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We are committed to protecting your privacy and handling your data responsibly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-2xl p-8 rounded-2xl shadow-lg border border-blue-500/20 max-w-4xl mx-auto prose prose-lg text-gray-300"
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Privacy Policy</h2>
          <p className="mb-6">
            At FirstJobly, accessible from https://www.firstjobly.in/, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that are collected and recorded by us and how we use it.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-100 mb-4">1. Information We Collect</h2>
          <p className="mb-6">
            When you visit our website or use our tools (such as the Website Audit, Backlinks Checker, Article Rewriter, Meta Description Maker, Keyword Position Checker, and Sitemap Generator), we may collect the following information:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li><strong>Personal Information:</strong> When you fill out forms or interact with our tools, we may collect personal information such as your name, email address, or other contact details.</li>
            <li><strong>Non-personal Information:</strong> This may include information such as IP addresses, browser types, device information, and site usage data that helps us improve the performance and functionality of our site and services.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-100 mb-4">2. How We Use Your Information</h2>
          <p className="mb-6">
            We use the information we collect in the following ways:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>To provide and maintain our services (such as running the SEO tools you use).</li>
            <li>To improve, personalize, and optimize your experience on our website.</li>
            <li>To analyze trends and site usage.</li>
            <li>To send you important updates about our tools and services (if you have opted in to receive them).</li>
            <li>To comply with legal obligations and resolve any disputes.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-100 mb-4">3. Cookies and Tracking Technologies</h2>
          <p className="mb-6">
            We use cookies and other tracking technologies to enhance your experience on our website. Cookies help us track your preferences and actions on our website, enabling us to provide a better user experience. You can choose to disable cookies through your browser settings, but this may affect your ability to use certain features of our website.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-100 mb-4">4. Third-Party Services</h2>
          <p className="mb-6">
            We may use third-party tools and services, such as analytics providers, advertising partners, or social media integration. These third parties may have access to your data as necessary to perform their services but are obligated not to disclose or use it for any other purpose.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-100 mb-4">5. Data Security</h2>
          <p className="mb-6">
            We take reasonable precautions to protect the information you provide on our website. However, please be aware that no method of transmission over the internet is 100% secure. We cannot guarantee absolute security, but we make every effort to keep your data safe.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-100 mb-4">6. Your Rights</h2>
          <p className="mb-6">
            You have the right to access, update, or delete your personal information at any time. If you wish to exercise these rights or have any concerns regarding your personal data, please contact us at kishann.kkp@gmail.com.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-100 mb-4">7. Changes to This Privacy Policy</h2>
          <p className="mb-6">
            We may update this Privacy Policy from time to time. When we do, we will post the updated policy on this page with a new "Effective Date." We encourage you to review this policy periodically to stay informed about how we are protecting your information.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-100 mb-4">8. Contact Us</h2>
          <p className="mb-6">
            If you have any questions or concerns about this Privacy Policy or how we handle your data, please feel free to contact us at:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li><strong>Email:</strong> kishann.kkp@gmail.com</li>
            <li><strong>Address:</strong> Lucknow Uttar Pradesh</li>
          </ul>
          
          <p className="mt-6 text-sm text-gray-400">
            <strong>Effective Date:</strong> October 26, 2025
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;