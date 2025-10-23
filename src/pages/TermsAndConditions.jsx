import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';

function TermsAndConditions() {
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
            Terms and Conditions{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Our Commitment to You
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Please read these terms carefully before using our platform.
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
            These Terms and Conditions govern your use of our job search platform. By accessing or using our services, you agree to be bound by these terms.
          </p>
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Use of the Platform</h2>
          <p className="mb-6">
            You agree to use the platform for lawful purposes only. You may not:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>Use the platform to post or transmit harmful or illegal content.</li>
            <li>Attempt to interfere with the platform's functionality.</li>
            <li>Use automated tools to scrape data without permission.</li>
          </ul>
          <h2 className="text-2xl font-bold text-gray-100 mb-4">User Responsibilities</h2>
          <p className="mb-6">
            You are responsible for maintaining the confidentiality of your account information and for any activity under your account.
          </p>
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Third-Party Links</h2>
          <p className="mb-6">
            Our platform may contain links to third-party websites (e.g., job application links). We are not responsible for the content or practices of these sites.
          </p>
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Limitation of Liability</h2>
          <p className="mb-6">
            We provide job listings as-is and are not liable for inaccuracies in job postings or outcomes of job applications. Use the platform at your own risk.
          </p>
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Changes to Terms</h2>
          <p>
            We may update these Terms and Conditions periodically. Changes will be posted on this page with an updated effective date.
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

export default TermsAndConditions;