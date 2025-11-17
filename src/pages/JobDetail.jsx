// src/pages/JobDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';

const BACKEND_URL = 'https://backendjobs-tau.vercel.app/posts';

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

  return (
    <>
      <Helmet>
        <title>{job.title} at {job.company_name} | Apply Now - FirstJobly</title>
        <meta name="description" content={`${job.title} - ${job.company_name} | ${job.location || 'India'}`} />
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-900">

        {/* Side Ads */}
        <div className="fixed left-0 top-20 bottom-0 w-48 hidden 2xl:block z-10 bg-gradient-to-r from-black/50 to-transparent">
          <div className="p-6">
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3395385581782112" crossOrigin="anonymous"></script>
            <ins className="adsbygoogle" style={{display:"block"}} data-ad-client="ca-pub-3395385581782112" data-ad-slot="1442016748" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script dangerouslySetInnerHTML={{ __html: `(adsbygoogle = window.adsbygoogle || []).push({});` }} />
          </div>
        </div>

        <div className="fixed right-0 top-20 bottom-0 w-48 hidden 2xl:block z-10 bg-gradient-to-l from-black/50 to-transparent">
          <div className="p-6">
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3395385581782112" crossOrigin="anonymous"></script>
            <ins className="adsbygoogle" style={{display:"block"}} data-ad-client="ca-pub-3395385581782112" data-ad-slot="1442016748" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script dangerouslySetInnerHTML={{ __html: `(adsbygoogle = window.adsbygoogle || []).push({});` }} />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">

          <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-lg mb-10 transition">
            Back to Jobs
          </Link>

          <div className="bg-white/8 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 p-10 border-b border-white/10">
              <div className="flex flex-col lg:flex-row gap-10 items-start">
                <div className="flex-shrink-0">
                  {job.company_logo ? (
                    <img src={job.company_logo} alt={job.company_name} className="w-36 h-36 rounded-3xl object-contain bg-white/20 p-5 shadow-2xl" loading="lazy" />
                  ) : (
                    <div className="w-36 h-36 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-3xl flex items-center justify-center text-6xl font-bold text-white shadow-2xl">
                      {job.company_name?.[0]?.toUpperCase() || 'C'}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                    {job.title}
                  </h1>
                  <p className="text-3xl font-bold text-cyan-300 mb-6">{job.company_name}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-200">
                    <div><p className="text-gray-400 text-sm">Location</p><p className="text-xl font-semibold text-white">{job.location || 'Multiple Locations'}</p></div>
                    <div><p className="text-gray-400 text-sm">Experience</p><p className="text-xl font-semibold text-white">{job.experience || 'Not Specified'}</p></div>
                    <div><p className="text-gray-400 text-sm">Work Mode</p><p className="text-xl font-semibold text-white">{job.remote_type || 'In-Office'}</p></div>
                    <div><p className="text-gray-400 text-sm">Posted On</p><p className="text-xl font-semibold text-white">{new Date(postedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-10 space-y-12">

              {/* Skills */}
              {skills.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Required Skills</h3>
                  <div className="flex flex-wrap gap-4">
                    {skills.map((skill, i) => (
                      <span key={i} className="px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-200 rounded-full text-sm font-medium border border-cyan-500/40 shadow-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Job Description</h3>
                <div className="prose prose-invert prose-lg max-w-none text-gray-200 leading-relaxed space-y-5"
                     dangerouslySetInnerHTML={{ __html: job.description || '<p>No description available.</p>' }} />
              </div>

              {/* ONLY ONE APPLY BUTTON – BIG, CENTERED, GORGEOUS */}
              
              {/* Footer Info */}
              <div className="text-center text-gray-400 border-t border-white/10 pt-10 text-sm">
                <p>
                  Posted on: {new Date(postedDate).toLocaleDateString('en-IN')} | 
                  Last updated: November 17, 2025 | 
                  Source: {job.company_name} Official Careers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

// Small & Centered Loading
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-purple-900 flex items-center justify-center z-50">
    <div className="text-center">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-t-cyan-400 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-sm font-medium text-gray-400 tracking-wider">
        Loading Job Details...
      </p>
    </div>
  </div>
);

const NotFoundScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-900 flex items-center justify-center px-6 text-center">
    <div>
      <h2 className="text-5xl font-bold text-red-400 mb-6">Job Not Found</h2>
      <Link to="/" className="text-2xl text-cyan-400 hover:text-cyan-300 underline">Back to All Jobs</Link>
    </div>
  </div>
);

export default JobDetail;