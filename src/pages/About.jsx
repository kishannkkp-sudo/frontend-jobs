import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';

function About() {
  const footerRef = useRef(null);

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
      <div className="container mx-auto px-6 py-20 flex-grow relative  lg:px-40">
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
            About Us{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              AI-Powered Job Discovery
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Connecting talent with opportunity through cutting-edge AI technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-2xl p-8 rounded-2xl shadow-lg border border-blue-500/20 "
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Our Mission</h2>
          <p className="text-gray-300 mb-6">
            We are dedicated to revolutionizing the job search experience by leveraging artificial intelligence to match candidates with their dream careers. Our platform aggregates thousands of verified job listings from trusted sources, ensuring you find opportunities that align with your skills and aspirations.
          </p>
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Who We Are</h2>
          <p className="text-gray-300 mb-6">
            Founded by a team of tech enthusiasts and career experts, our platform combines advanced algorithms with a user-centric design to provide a seamless job search experience. We believe in empowering individuals to take control of their career paths.
          </p>
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>AI-driven job matching tailored to your skills.</li>
            <li>Real-time job updates from global employers.</li>
            <li>Intuitive interface with powerful filtering tools.</li>
            <li>Commitment to transparency and user privacy.</li>
          </ul>
        </motion.div>
      </div>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}

export default About;