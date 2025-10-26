import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adsVisible, setAdsVisible] = useState(true);
  const footerRef = useRef(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://autopostnodejs-yqqc.vercel.app/posts/${id}`);
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-gray-100">
        <Navbar />
        <div className="container mx-auto px-6 py-20 flex-grow flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotateY: [0, 10, -10, 0]
            }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <div className="w-28 h-28 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-8 flex items-center justify-center">
              <span className="text-4xl">📄</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-100 mb-4">Loading Job Details...</h1>
            <p className="text-gray-400">Getting all the important information</p>
          </motion.div>
        </div>
        <div ref={footerRef}>
          <Footer />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-gray-100">
        <Navbar />
        <div className="mx-auto max-w-[1600px] px-6 py-20 flex-grow flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full mx-auto mb-8 flex items-center justify-center">
              <span className="text-5xl">😕</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-100 mb-4">Job Not Found</h3>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg shadow-blue-500/25 transition-all duration-300"
            >
              ← Back to Jobs
            </Link>
          </motion.div>
        </div>
        <div ref={footerRef}>
          <Footer />
        </div>
      </div>
    );
  }

  const applyLink = job.description.match(/href='(.*?)'/)?.[1] || '#';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-gray-100">
      <Navbar />
      <div className="container mx-auto px-6 py-20 flex-grow relative lg:px-40">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-xl rounded-xl font-semibold text-gray-100 hover:bg-white/20 shadow-lg border border-blue-500/20 hover:shadow-xl transition-all duration-300 group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Jobs
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl border border-blue-500/20 overflow-hidden"
        >
          <div className="p-8 lg:p-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-center mb-6 lg:mb-0">
                {job.company_logo ? (
                  <motion.img
                    src={job.company_logo}
                    alt="Company Logo"
                    className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl shadow-lg mr-6 flex-shrink-0"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                  />
                ) : (
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mr-6 flex-shrink-0 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">🏢</span>
                  </div>
                )}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-100 leading-tight">{job.title}</h1>
                  <p className="text-sm text-gray-400 mt-2">
                    Posted on {new Date(job.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-400">
                    {job.description.match(/Locations: (.*?)(?=<br>|$)/i)?.[1] || 'Location not specified'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg max-w-none text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />

            {/* Apply Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="mr-3">🚀</span>
                Apply Now
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.div>
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

export default JobDetail;