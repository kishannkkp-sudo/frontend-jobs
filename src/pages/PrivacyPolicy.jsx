import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';

function PrivacyPolicy() {
  const [adsVisible, setAdsVisible] = useState(true);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAdsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

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
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Introduction</h2>
          <p className="mb-6">
            This Privacy Policy explains how we collect, use, and protect your personal information when you use our job search platform. By using our services, you agree to the terms outlined below.
          </p>
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Information We Collect</h2>
          <p className="mb-6">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>Personal details (e.g., name, email) provided during inquiries.</li>
            <li>Usage data (e.g., pages visited, search queries) to improve our services.</li>
            <li>Cookies to enhance your browsing experience.</li>
          </ul>
          <h2 className="text-2xl font-bold text-gray-100 mb-4">How We Use Your Information</h2>
          <p className="mb-6">
            Your information is used to:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>Provide personalized job recommendations.</li>
            <li>Respond to your inquiries and support requests.</li>
            <li>Analyze platform usage to improve functionality.</li>
          </ul>
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Data Sharing and Security</h2>
          <p className="mb-6">
            We do not sell your personal information. We may share data with trusted partners for operational purposes, such as analytics or email services, under strict confidentiality agreements. We implement industry-standard security measures to protect your data.
          </p>
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Your Rights</h2>
          <p className="mb-6">
            You have the right to access, update, or delete your personal information. Contact us at support@jobplatform.com to exercise these rights.
          </p>
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date.
          </p>
          <p className="mt-6 text-sm text-gray-400">
            <strong>Effective Date:</strong> October 23, 2025
          </p>
        </motion.div>
      </div>

      {/* Ad Placeholders */}
      <motion.div
        animate={{ opacity: adsVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block fixed left-0 top-16 w-36 h-[80vh] bg-white/10 border-r border-blue-500/20 rounded-r-xl backdrop-blur-2xl flex items-center justify-center text-gray-300 text-xs font-medium"
      >
        Sponsored Ad
      </motion.div>
      <motion.div
        animate={{ opacity: adsVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block fixed right-0 top-16 w-36 h-[80vh] bg-white/10 border-l border-blue-500/20 rounded-l-xl backdrop-blur-2xl flex items-center justify-center text-gray-300 text-xs font-medium"
      >
        Sponsored Ad
      </motion.div>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}

export default PrivacyPolicy;