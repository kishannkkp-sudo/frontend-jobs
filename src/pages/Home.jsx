// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';

const BACKEND_URL = 'https://autoback-pearl.vercel.app/posts';
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
      </Helmet>

      <Navbar />

      <div className="pt-20 lg:pt-24 min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Hero */}
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Jobs in India 2025</span>
            </h1>
            <p className="mt-3 text-lg text-gray-300">
              Showing {startJob}–{endJob} of {totalJobs.toLocaleString()} active openings
            </p>
          </div>

          {/* Loading or Jobs */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-gray-700 rounded-xl"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-gray-700 rounded w-4/5"></div>
                      <div className="h-4 bg-gray-600 rounded w-3/5"></div>
                      <div className="h-3 bg-gray-600 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20 text-gray-400 text-xl">No jobs found. Please check back later!</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                {jobs.map(job => (
                  <JobCard key={job.id} job={job} generateSlug={generateSlug} />
                ))}
              </div>

              {/* Ad Block */}
              {currentPage % 2 === 0 && (
                <div className="my-16 bg-gray-800/60 border border-gray-700 rounded-2xl p-6 text-center">
                  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3395385581782112" crossOrigin="anonymous"></script>
                  <ins className="adsbygoogle"
                       style={{ display: "block" }}
                       data-ad-client="ca-pub-3395385581782112"
                       data-ad-slot="1442016748"
                       data-ad-format="auto"
                       data-full-width-responsive="true"></ins>
                  <script dangerouslySetInnerHTML={{ __html: `(adsbygoogle = window.adsbygoogle || []).push({});` }} />
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-3 mt-16">
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${currentPage === 1 ? 'bg-gray-700 text-gray-500' : 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg'}`}>
                Previous
              </button>

              <div className="flex gap-2 flex-wrap justify-center">
                {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                  let pageNum = totalPages <= 7 ? i + 1 : currentPage <= 4 ? i + 1 : currentPage >= totalPages - 3 ? totalPages - 6 + i : currentPage - 3 + i;
                  if (pageNum > totalPages || pageNum < 1) return null;

                  return (
                    <button key={pageNum} onClick={() => goToPage(pageNum)}
                      className={`w-12 h-12 rounded-lg font-bold transition-all ${currentPage === pageNum ? 'bg-purple-600 text-white shadow-xl scale-110' : 'bg-white/10 hover:bg-white/20 text-gray-300'}`}>
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 7 && currentPage < totalPages - 3 && (
                  <>
                    <span className="text-gray-500 px-2">...</span>
                    <button onClick={() => goToPage(totalPages)} className="w-12 h-12 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold">{totalPages}</button>
                  </>
                )}
              </div>

              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${currentPage === totalPages ? 'bg-gray-700 text-gray-500' : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'}`}>
                Next
              </button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

// PROFESSIONAL & COMPACT JOB CARD
const JobCard = ({ job, generateSlug }) => {
  const skills = Array.isArray(job.skills)
    ? job.skills
    : typeof job.skills === 'string' ? JSON.parse(job.skills || '[]') : [];

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-2xl"
    >
      <Link to={generateSlug(job)} className="block">
        <div className="flex gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            {job.company_logo ? (
              <img src={job.company_logo} alt={job.company_name}
                className="w-14 h-14 rounded-xl object-contain bg-white/10 p-2 border border-white/20"
                loading="lazy"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white shadow-md">
                {job.company_name?.[0]?.toUpperCase() || 'J'}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-white truncate group-hover:text-cyan-400 transition">
              {job.title || 'Job Title'}
            </h3>
            <p className="text-cyan-400 font-medium text-sm mt-0.5 truncate">
              {job.company_name || 'Company'}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 mt-2">
              <span className="flex items-center gap-1">
                {job.location?.split(',')[0] || 'India'}
              </span>
              <span>•</span>
              <span>{job.experience || 'Fresher'}</span>
              {job.remote_type && (
                <>
                  <span>•</span>
                  <span className="text-green-400 font-medium">{job.remote_type}</span>
                </>
              )}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {skills.slice(0, 4).map((skill, i) => (
                <span key={i} className="px-2.5 py-1 bg-cyan-500/10 text-cyan-300 text-xs rounded-lg border border-cyan-500/30">
                  {skill.trim()}
                </span>
              ))}
              {skills.length > 4 && (
                <span className="text-gray-500 text-xs self-center">+{skills.length - 4}</span>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-gray-500">
                {new Date(job.created_at || job.posted_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
              <span className="text-xs font-medium text-cyan-400 group-hover:text-cyan-300 transition">
                View Details →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Home;
