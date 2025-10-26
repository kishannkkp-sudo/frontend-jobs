import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';

function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '600d2cc0-b4bb-43df-b1ef-91fc6ed887e5',
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    const json = await response.json();

    if (json.success) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

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
              <p className="text-gray-400 mb-2"><strong>Email:</strong> kishann.kkp@gmail.com</p>
              <p className="text-gray-400"><strong>Address:</strong> 123 Tech Lane, Bengaluru, India</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-100 mb-4">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-white/20 bg-white/10 backdrop-blur-sm p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 text-gray-100 placeholder-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-white/20 bg-white/10 backdrop-blur-sm p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 text-gray-100 placeholder-gray-400"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-white/20 bg-white/10 backdrop-blur-sm p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 text-gray-100 placeholder-gray-400"
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-sm shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
                {submitStatus === 'success' && (
                  <p className="text-green-400 text-sm">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-sm">Error sending message. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactUs;