import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/10 backdrop-blur-2xl border-t border-blue-500/20 mt-8"
    >
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="text-gray-400 mb-4 md:mb-0 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            © {new Date().getFullYear()} FirstJobly. All rights reserved.
          </motion.div>
          <motion.div 
            className="flex flex-wrap justify-center md:justify-end space-x-6 md:space-x-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              to="/privacy-policy" 
              className="text-gray-400 hover:text-blue-400 font-medium text-sm transition-all duration-300 relative group"
            >
              Privacy Policy
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/terms-and-conditions" 
              className="text-gray-400 hover:text-blue-400 font-medium text-sm transition-all duration-300 relative group"
            >
              Terms of Service
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/contact-us"
              className="text-gray-400 hover:text-blue-400 font-medium text-sm transition-all duration-300 relative group"
            >
              Contact Us
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:w-full transition-all duration-300"></span>
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border-t border-blue-500/20 mt-6 pt-4 text-center text-xs text-gray-400"
        >
          Made with ❤️ by LogicAlgo
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;