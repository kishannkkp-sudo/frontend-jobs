// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';

const BACKEND_URL = 'https://backendjobs-tau.vercel.app/posts';
const JOBS_PER_PAGE = 24;

function Home() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}?page=${page}`);
      if (!res.ok) throw new Error('Failed to fetch');
      
      const data = await res.json();
      
      setJobs(data.jobs || []);
      setCurrentPage(data.pagination.currentPage);
      setTotalPages(data.pagination.totalPages);
      setTotalJobs(data.pagination.totalJobs);
    } catch (err) {
      console.error(err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  const generateSlug = (job) => {
    if (!job?.id) return '#';
    const title = (job.title || 'job').toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const company = (job.company_name || 'company').toLowerCase().replace(/[^a-z0-9]/g, '-');
    const loc = (job.location || 'india').split(',')[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `/job/${title}-${company}-${loc}-${job.id}`;
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startJob = (currentPage - 1) * JOBS_PER_PAGE + 1;
  const endJob = Math.min(currentPage * JOBS_PER_PAGE, totalJobs);

  return (
    <>
      <Helmet>
        <title>{`Latest Jobs in India 2025 (Page ${currentPage}) | FirstJobly`}</title>
        <meta name="description" content="10,000+ latest job openings in India - Freshers, Experienced, Remote, IT, Non-IT jobs updated daily." />
        <meta property="og:title" content={`Latest Jobs in India 2025 (Page ${currentPage}) | FirstJobly`} />
        <meta property="og:description" content="Freshers, Experienced, Remote, Walk-in, MNC Jobs - Updated Daily" />
      </Helmet>

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Jobs in India 2025</span>
          </h1>
          <p className="text-xl text-gray-300">
            Showing {startJob}–{endJob} of {totalJobs.toLocaleString()} jobs
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 animate-pulse">
                <div className="flex gap-6">
                  <div className="w-20 h-20 bg-gray-700 rounded-2xl"></div>
                  <div className="flex-1 space-y-4">
                    <div className="h-8 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-5 bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No jobs found. Check back later!</p>
          </div>
        ) : (
          <>
            {/* 2×12 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {jobs.map(job => (
                <JobCard key={job.id} job={job} generateSlug={generateSlug} />
              ))}
            </div>

            {/* Google AdSense after every even page */}
            {currentPage % 2 === 0 && (
              <div className="my-20 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-3xl p-8 text-center shadow-2xl">
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3395385581782112"
                        crossOrigin="anonymous"></script>
                <ins className="adsbygoogle"
                     style={{ display: 'block' }}
                     data-ad-client="ca-pub-3395385581782112"
                     data-ad-slot="1442016748"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                <script dangerouslySetInnerHTML={{ __html: `(adsbygoogle = window.adsbygoogle || []).push({});` }} />
              </div>
            )}
          </>
        )}

        {/* Professional Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-24 flex-wrap">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${currentPage === 1 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-xl'}`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 7) {
                pageNum = i + 1;
              } else if (currentPage <= 4) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 3) {
                pageNum = totalPages - 6 + i;
              } else {
                pageNum = currentPage - 3 + i;
              }

              if (pageNum > totalPages) return null;

              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`w-14 h-14 rounded-xl font-bold text-lg transition-all ${
                    currentPage === pageNum
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl scale-110'
                      : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white shadow-lg'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 7 && currentPage < totalPages - 3 && (
              <>
                <span className="text-gray-500 text-2xl">...</span>
                <button onClick={() => goToPage(totalPages)} className="w-14 h-14 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold">
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${currentPage === totalPages 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl'}`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

// Beautiful Job Card (unchanged)
const JobCard = ({ job, generateSlug }) => {
  const skills = Array.isArray(job.skills)
    ? job.skills
    : typeof job.skills === 'string' ? JSON.parse(job.skills || '[]') : [];

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 group"
    >
      <Link to={generateSlug(job)}>
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            {job.company_logo ? (
              <img src={job.company_logo} alt={job.company_name} className="w-20 h-20 rounded-2xl object-contain bg-white/20 p-3 shadow-lg" loading="lazy" />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                {job.company_name?.[0] || 'C'}
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition">
              {job.title || 'Job Title'}
            </h3>
            <p className="text-xl font-semibold text-cyan-400 mb-3">{job.company_name || 'Company'}</p>

            <div className="flex flex-wrap gap-4 text-gray-300 mb-4 text-base">
              <span>Location: {job.location || 'Multiple Locations'}</span>
              <span>Experience: {job.experience || 'Any'}</span>
              {job.remote_type && <span className="text-green-400 font-medium">{job.remote_type}</span>}
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {skills.slice(0, 5).map((s, i) => (
                <span key={i} className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/50">
                  {s}
                </span>
              ))}
              {skills.length > 5 && <span className="text-gray-400 text-sm">+{skills.length - 5} more</span>}
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">
                {new Date(job.created_at || job.posted_date).toLocaleDateString('en-IN')}
              </span>
              <span className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl shadow-xl hover:shadow-cyan-500/50 transition transform hover:scale-105">
                View Details
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Home;