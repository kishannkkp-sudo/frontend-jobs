import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    location: '',
    date: 'newest'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New: Track errors
  const [adsVisible, setAdsVisible] = useState(true);
  const footerRef = useRef(null);
  const jobsPerPage = 12;

  // Retry function for fetch errors
  const retryFetch = async (url, maxRetries = 3) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors', // Explicitly enable CORS
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return await response.json();
      } catch (err) {
        if (i === maxRetries - 1) throw err; // Last retry failed
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
      }
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await retryFetch('https://autopostnodejs-8aql.vercel.app/posts');
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError(error.message.includes('CORS') ? 'Connection blocked. Please check backend CORS settings.' : 'Failed to load jobs. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Rest of your useEffects (filtering, observer) remain unchanged
  useEffect(() => {
    let filtered = jobs;

    if (filters.search) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter(job =>
        job.description.toLowerCase().includes(filters.type.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter(job => {
        const location = job.description.match(/Locations: (.*?)(?=<br>|$)/i)?.[1] || '';
        return location.toLowerCase().includes(filters.location.toLowerCase());
      });
    }

    if (filters.date) {
      filtered = [...filtered].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return filters.date === 'newest' ? dateB - dateA : dateA - dateB;
      });
    }

    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [filters, jobs]);

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

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleTypeFilter = (type) => {
    setFilters({ ...filters, type });
  };

  // Retry button handler
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Re-run fetchJobs from useEffect deps, but trigger manually
    const fetchJobs = async () => {
      try {
        const data = await retryFetch('https://autopostnodejs-8aql.vercel.app/posts');
        setJobs(data);
        setFilteredJobs(data);
        setError(null);
      } catch (error) {
        setError('Retry failed. Ensure backend CORS is configured.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  };

  // Your existing SkeletonJob and Orb components remain unchanged
  const SkeletonJob = () => (
    <motion.div
      className="bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-lg border border-blue-500/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="animate-pulse">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gray-300/20 rounded-full mr-4"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-300/20 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300/20 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-gray-100">
        <Navbar />
        <div className="container mx-auto px-6 py-16 flex-grow flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 animate-spin"></div>
            <h1 className="text-3xl font-bold text-gray-100 mb-4">Loading Jobs...</h1>
            <p className="text-gray-400">Finding the best opportunities for you</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-6xl w-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonJob key={i} />
            ))}
          </div>
        </div>
        <div ref={footerRef}>
          <Footer />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-gray-100">
        <Navbar />
        <div className="container mx-auto px-6 py-16 flex-grow flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-yellow-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-100 mb-3">Unable to Load Jobs</h3>
            <p className="text-gray-400 max-w-xl mx-auto mb-6">{error}</p>
            <motion.button
              onClick={handleRetry}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Retry Loading Jobs
            </motion.button>
            <p className="text-sm text-gray-500 mt-4">
              If the issue persists, check your backend CORS configuration.
            </p>
          </motion.div>
        </div>
        <div ref={footerRef}>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-gray-100">
      <Navbar />
      <div className="mx-auto max-w-[1600px] px-6 pt-16 pb-8 flex-grow relative overflow-hidden lg:px-40">

        {/* Animated Background Orbs */}
        <Orb className="w-64 h-64 bg-blue-500 left-10 top-20" delay={0} />
        <Orb className="w-80 h-80 bg-purple-500 right-20 top-40" delay={1} />
        <Orb className="w-48 h-48 bg-pink-500 left-40 bottom-20" delay={2} />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 relative z-10"
        >
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-gray-100 mb-4 leading-tight"
          >
            Find Your Dream Job{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              with AI Precision
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Discover thousands of verified openings tailored to your skills.
          </motion.p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-2xl p-4 rounded-xl shadow-lg border border-blue-500/20 mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                name="search"
                placeholder="Search jobs or companies..."
                value={filters.search}
                onChange={handleFilterChange}
                className="w-full border border-white/20 bg-white/10 backdrop-blur-sm p-3 pl-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/50 text-gray-100 placeholder-gray-400 transition-all duration-300"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
              </svg>
              <input
                type="text"
                name="location"
                placeholder="Filter by location..."
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full border border-white/20 bg-white/10 backdrop-blur-sm p-3 pl-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/50 text-gray-100 placeholder-gray-400 transition-all duration-300"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <select
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="w-full border border-white/20 bg-white/10 backdrop-blur-sm p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/50 text-gray-100 placeholder-gray-400 transition-all duration-300"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </motion.div>
          </div>
          <div className="flex flex-wrap gap-3">
            {['Remote', 'Full-time', 'Internship'].map(type => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTypeFilter(type.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  filters.type === type.toLowerCase()
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Job Tiles */}
        <AnimatePresence>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {currentJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.05,
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.2)"
                }}
                className="group bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-lg border border-blue-500/20 hover:shadow-xl transition-all duration-500"
              >
                <Link to={`/job/${job.id}`} className="block">
                  <div className="flex items-start mb-4">
                    {job.company_logo ? (
                      <motion.img
                        src={job.company_logo}
                        alt="Company Logo"
                        className="w-12 h-12 rounded-xl mr-5 flex-shrink-0 shadow-md"
                        whileHover={{ scale: 1.1 }}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-5 flex-shrink-0 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">🏢</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-bold text-gray-100 group-hover:text-blue-400 transition-all duration-300 line-clamp-2">
                        {job.title}
                      </h2>
                      <p className="text-sm text-gray-400 mt-1">
                        {job.description.match(/Locations: (.*?)(?=<br>|$)/i)?.[1] || 'Location not specified'}
                      </p>
                      <p className="text-sm text-gray-400">
                        Posted {new Date(job.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
                <Link to={`/job/${job.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-sm shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    Apply Now
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Pagination */}
        {filteredJobs.length > jobsPerPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex justify-center"
          >
            <div className="bg-white/10 backdrop-blur-xl p-3 rounded-xl shadow-lg border border-blue-500/20 flex space-x-2">
              {Array.from(
                { length: Math.ceil(filteredJobs.length / jobsPerPage) },
                (_, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => paginate(i + 1)}
                    className={`px-5 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                      currentPage === i + 1
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-white/10 text-gray-400 hover:bg-white/20'
                    }`}
                  >
                    {i + 1}
                  </motion.button>
                )
              )}
            </div>
          </motion.div>
        )}

        {filteredJobs.length === 0 && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold text-gray-100 mb-3">No jobs found</h3>
            <p className="text-gray-400 max-w-xl mx-auto">
              Try adjusting your search filters or check back later.
            </p>
          </motion.div>
        )}
      </div>

      {/* Ad Placeholders */}
      <motion.div
        animate={{ opacity: adsVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block fixed left-0 top-16 w-32 h-[100vh] bg-white/10 border-r border-blue-500/20 rounded-r-xl backdrop-blur-2xl flex items-center justify-center"
      >
        <div>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3395385581782112"
            crossorigin="anonymous"></script>
          <ins className="adsbygoogle"
            style={{display: 'block'}}
            data-ad-client="ca-pub-3395385581782112"
            data-ad-slot="1442016748"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        </div>
      </motion.div>
      <motion.div
        animate={{ opacity: adsVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block fixed right-0 top-16 w-32 h-[100vh] bg-white/10 border-l border-blue-500/20 rounded-l-xl backdrop-blur-2xl flex items-center justify-center"
      >
        <div>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3395385581782112"
            crossorigin="anonymous"></script>
          <ins className="adsbygoogle"
            style={{display: 'block'}}
            data-ad-client="ca-pub-3395385581782112"
            data-ad-slot="1442016748"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        </div>
      </motion.div>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;