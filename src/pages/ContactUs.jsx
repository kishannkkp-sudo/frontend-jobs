import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';

function ContactUs() {
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
            Contact Us{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              We're Here to Help
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Reach out to us with any questions or feedback about our platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-2xl p-8 rounded-2xl shadow-lg border border-blue-500/20 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Get in Touch</h2>
          <p className="text-gray-300 mb-6">
            We'd love to hear from you! Please fill out the form below or use our contact details.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-100 mb-4">Contact Information</h3>
              <p className="text-gray-400 mb-2"><strong>Email:</strong> support@jobplatform.com</p>
              <p className="text-gray-400 mb-2"><strong>Phone:</strong> +1 (800) 123-4567</p>
              <p className="text-gray-400"><strong>Address:</strong> 123 Tech Lane, Bengaluru, India</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-100 mb-4">Send a Message</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-white/20 bg-white/10 backdrop-blur-sm p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 text-gray-100 placeholder-gray-400"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-white/20 bg-white/10 backdrop-blur-sm p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 text-gray-100 placeholder-gray-400"
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full border border-white/20 bg-white/10 backdrop-blur-sm p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 text-gray-100 placeholder-gray-400"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-sm shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </div>
            </div>
          </div>
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

export default ContactUs;