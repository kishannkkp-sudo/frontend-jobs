// src/pages/JobDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const BACKEND_URL = 'https://autoback-cakl.vercel.app/posts';

function JobDetail() {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const jobId = slug?.split('-').pop();

  useEffect(() => {
    if (!jobId) {
      setLoading(false);
      return;
    }

    fetch(`${BACKEND_URL}/${jobId}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        if (data.skills && typeof data.skills === 'string') {
          try { data.skills = JSON.parse(data.skills); } catch { data.skills = []; }
        }
        setJob(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [jobId]);

  if (loading) return <LoadingScreen />;
  if (!job) return <NotFoundScreen />;

  const applyLink = job.apply_link || '#';
  const postedDate = job.created_at || job.posted_date || new Date().toISOString();
  const skills = Array.isArray(job.skills) ? job.skills : [];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${diffDays >= 14 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <>
      <Helmet>
        <title>{job.title} at {job.company_name} - Apply Now | FirstJobly</title>
        <meta name="description" content={`${job.title} job at ${job.company_name} in ${job.location}. Experience: ${job.experience}. Apply now!`} />
        <meta property="og:title" content={`${job.title} at ${job.company_name}`} />
        <meta property="og:description" content="Latest job opening • Apply directly on company website" />
      </Helmet>

      <Navbar />

      {/* Sticky Apply Button - Mobile & Desktop */}
      

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-violet-900 pt-20 pb-32 md:pb-10">

        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">

          {/* Back Link */}
          <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium mb-8 transition">
            ← Back to Jobs
          </Link>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/8 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 sm:p-10 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 border-b border-white/10">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  {job.company_logo ? (
                    <img
                      src={job.company_logo}
                      alt={job.company_name}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-contain bg-white/10 p-4 shadow-xl border border-white/20"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl font-bold text-white shadow-xl">
                      {job.company_name?.[0]?.toUpperCase() || 'C'}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                    {job.title}
                  </h1>
                  <p className="text-xl sm:text-2xl font-bold text-cyan-300 mt-2">{job.company_name}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-sm sm:text-base">
                    <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                      <p className="text-gray-400 text-xs sm:text-sm">Location</p>
                      <p className="font-semibold text-white truncate">{job.location || 'India'}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                      <p className="text-gray-400 text-xs sm:text-sm">Experience</p>
                      <p className="font-semibold text-white">{job.experience || 'Any'}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                      <p className="text-gray-400 text-xs sm:text-sm">Work Mode</p>
                      <p className="font-semibold text-white capitalize">{job.remote_type || 'Office'}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                      <p className="text-gray-400 text-xs sm:text-sm">Posted</p>
                      <p className="font-semibold text-green-400 text-sm sm:text-base">{formatDate(postedDate)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-10 space-y-10">

              {/* Skills */}
              {skills.length > 0 && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-5">Required Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-2.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 
                                 text-cyan-200 font-medium rounded-xl text-sm border border-cyan-500/30 
                                 shadow-md hover:shadow-lg transition"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Job Description */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Job Description</h3>
                <div
                  className="prose prose-invert prose-lg max-w-none text-gray-200 leading-relaxed space-y-4 
                           text-sm sm:text-base"
                  dangerouslySetInnerHTML={{ __html: job.description || '<p>No description provided.</p>' }}
                />
              </div>

              {/* Footer Info */}
              <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
                <p>
                  Posted {formatDate(postedDate)} • 
                  Source: {job.company_name} Careers • 
                  Last updated: November 17, 2025
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bottom Apply Button (Desktop Duplicate - Optional) */}
          
        </div>
      </div>

      <Footer />
    </>
  );
}

// Loading & Not Found
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-purple-900 flex items-center justify-center z-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
      <div className="absolute w-16 h-16 border-4 border-t-cyan-400 border-r-purple-500 rounded-full animate-spin"></div>
      <p className="mt-8 text-lg font-medium text-gray-300">Loading job details...</p>
    </div>
  </div>
);

const NotFoundScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex items-center justify-center px-6 text-center">
    <div>
      <h2 className="text-4xl sm:text-5xl font-bold text-red-400 mb-6">Job Not Found</h2>
      <p className="text-gray-300 mb-8">This job may have expired or been removed.</p>
      <Link to="/" className="text-xl text-cyan-400 hover:text-cyan-300 underline font-medium">
        ← Back to Latest Jobs
      </Link>
    </div>
  </div>
);

export default JobDetail;
