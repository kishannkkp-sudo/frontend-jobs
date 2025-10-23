import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-xl shadow-lg border border-white/20 fixed w-full z-50 top-0"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent"
        >
          <Link to="/">FirstJobly</Link>
        </motion.div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <Link 
              to="/" 
              className="text-gray-100 font-medium group-hover:text-blue-400 transition-all duration-300 relative"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:w-full transition-all duration-300"></span>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <Link 
              to="/about" 
              className="text-gray-100 font-medium group-hover:text-blue-400 transition-all duration-300 relative"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:w-full transition-all duration-300"></span>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <Link 
              to="/contact-us" 
              className="text-gray-100 font-medium group-hover:text-blue-400 transition-all duration-300 relative"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:w-full transition-all duration-300"></span>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <Link 
              to="/privacy-policy" 
              className="text-gray-100 font-medium group-hover:text-blue-400 transition-all duration-300 relative"
            >
              Privacy Policy
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:w-full transition-all duration-300"></span>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <Link 
              to="/terms-and-conditions" 
              className="text-gray-100 font-medium group-hover:text-blue-400 transition-all duration-300 relative"
            >
              Terms
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:w-full transition-all duration-300"></span>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
        className="lg:hidden bg-white/10 backdrop-blur-xl border-t border-white/20 overflow-hidden"
      >
        <div className="px-6 py-4 space-y-4">
          <Link to="/" className="block text-gray-100 font-medium hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/about" className="block text-gray-100 font-medium hover:text-blue-400 transition-colors">About</Link>
          <Link to="/contact-us" className="block text-gray-100 font-medium hover:text-blue-400 transition-colors">Contact</Link>
          <Link to="/privacy-policy" className="block text-gray-100 font-medium hover:text-blue-400 transition-colors">Privacy Policy</Link>
          <Link to="/terms-and-conditions" className="block text-gray-100 font-medium hover:text-blue-400 transition-colors">Terms</Link>
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;