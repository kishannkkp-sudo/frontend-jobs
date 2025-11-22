// src/pages/JobDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const BACKEND_URL = 'https://autoback-781i.vercel.app/posts';

function JobDetail() {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedJobs, setRelatedJobs] = useState([]);

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
        
        // Fetch related jobs based on skills or company
        fetchRelatedJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [jobId]);

  const fetchRelatedJobs = (currentJob) => {
    // This would be an actual API call in a real implementation
    // For now, we'll simulate it
    fetch(`${BACKEND_URL}?limit=5&exclude=${jobId}`)
      .then(r => r.ok ? r.json() : Promise.resolve({ jobs: [] }))
      .then(data => {
        setRelatedJobs(data.jobs || []);
      })
      .catch(() => setRelatedJobs([]));
  };

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
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={job.company_logo || ''} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            "title": job.title,
            "description": job.description,
            "hiringOrganization": {
              "@type": "Organization",
              "name": job.company_name,
              "logo": job.company_logo
            },
            "datePosted": postedDate,
            "employmentType": job.job_type || "FULL_TIME",
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": job.location?.split(',')[0] || "India",
                "addressRegion": job.location?.split(',')[1] || "",
                "addressCountry": "IN"
              }
            },
            "baseSalary": {
              "@type": "MonetaryAmount",
              "currency": "INR",
              "value": {
                "@type": "QuantitativeValue",
                "minValue": job.salary_min || 0,
                "maxValue": job.salary_max || 0,
                "unitText": "YEAR"
              }
            }
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* Sticky Apply Button - Mobile & Desktop */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-600 to-purple-600 p-4 z-50 md:hidden">
        <a 
          href={applyLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full bg-white text-gray-900 font-bold py-3 px-6 rounded-xl text-center hover:bg-gray-100 transition"
        >
          Apply Now
        </a>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-violet-900 pt-20 pb-32 md:pb-10">
        <div className=" mx-auto px-5 sm:px-8 lg:px-10">
          {/* Back Link */}
          <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium mb-8 transition">
            ← Back to Jobs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Main Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/8 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden mb-8"
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

                  {/* Responsibilities */}
                  {job.responsibilities && (
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Key Responsibilities</h3>
                      <div
                        className="prose prose-invert prose-lg max-w-none text-gray-200 leading-relaxed space-y-4 
                                 text-sm sm:text-base"
                        dangerouslySetInnerHTML={{ __html: job.responsibilities }}
                      />
                    </div>
                  )}

                  {/* Requirements */}
                  {job.requirements && (
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Requirements</h3>
                      <div
                        className="prose prose-invert prose-lg max-w-none text-gray-200 leading-relaxed space-y-4 
                                 text-sm sm:text-base"
                        dangerouslySetInnerHTML={{ __html: job.requirements }}
                      />
                    </div>
                  )}

                  {/* Benefits */}
                  {job.benefits && (
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Benefits</h3>
                      <div
                        className="prose prose-invert prose-lg max-w-none text-gray-200 leading-relaxed space-y-4 
                                 text-sm sm:text-base"
                        dangerouslySetInnerHTML={{ __html: job.benefits }}
                      />
                    </div>
                  )}

                  {/* Footer Info */}
                  <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
                    <p>
                      Posted {formatDate(postedDate)} • 
                      Source: {job.company_name} Careers • 
                      Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* AdSense Ad - In Content */}
              <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 mb-8">
                <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
                <ins className="adsbygoogle"
                     style={{ display: "block", textAlign: "center" }}
                     data-ad-layout="in-article"
                     data-ad-format="fluid"
                     data-ad-client="ca-pub-3395385581782112"
                     data-ad-slot="1442016748"></ins>
                <script dangerouslySetInnerHTML={{ __html: `(adsbygoogle = window.adsbygoogle || []).push({});` }} />
              </div>

              {/* Related Jobs */}
              {relatedJobs.length > 0 && (
                <div className="bg-white/8 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Similar Job Openings</h2>
                  <div className="space-y-4">
                    {relatedJobs.map(relatedJob => (
                      <RelatedJobCard key={relatedJob.id} job={relatedJob} />
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition">
                      View More Jobs →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Apply Button */}
              <div className="bg-white/8 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden p-6 mb-6 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-4">Apply for this Position</h3>
                <a 
                  href={applyLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl text-center hover:from-cyan-600 hover:to-purple-700 transition mb-4"
                >
                  Apply Now
                </a>
                <p className="text-gray-400 text-sm text-center">
                  You will be redirected to the company's official application page
                </p>
              </div>

              {/* AdSense Ad - Sidebar */}
              <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 mb-6">
                <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
                <ins className="adsbygoogle"
                     style={{ display: "block" }}
                     data-ad-client="ca-pub-3395385581782112"
                     data-ad-slot="1442016748"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                <script dangerouslySetInnerHTML={{ __html: `(adsbygoogle = window.adsbygoogle || []).push({});` }} />
              </div>

              {/* Company Info */}
              <div className="bg-white/8 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">About {job.company_name}</h3>
                <div className="space-y-3">
                  {job.company_website && (
                    <div>
                      <p className="text-gray-400 text-sm">Website</p>
                      <a 
                        href={job.company_website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 transition"
                      >
                        {job.company_website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  {job.company_size && (
                    <div>
                      <p className="text-gray-400 text-sm">Company Size</p>
                      <p className="text-white">{job.company_size}</p>
                    </div>
                  )}
                  {job.industry && (
                    <div>
                      <p className="text-gray-400 text-sm">Industry</p>
                      <p className="text-white">{job.industry}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Job Tips */}
              <div className="bg-white/8 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden p-6">
                <h3 className="text-xl font-bold text-white mb-4">Application Tips</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">✓</span>
                    <span className="text-sm">Tailor your resume to highlight relevant skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">✓</span>
                    <span className="text-sm">Research the company before applying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">✓</span>
                    <span className="text-sm">Prepare a cover letter explaining your interest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">✓</span>
                    <span className="text-sm">Follow up after a week if you don't hear back</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

// Related Job Card Component
const RelatedJobCard = ({ job }) => {
  const generateSlug = (job) => {
    if (!job?.id) return '#';
    const title = (job.title || 'job').toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const company = (job.company_name || 'company').toLowerCase().replace(/[^a-z0-9]/g, '-');
    const loc = (job.location || 'india').split(',')[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `/job/${title}-${company}-${loc}-${job.id}`;
  };

  return (
    <Link to={generateSlug(job)} className="block">
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition">
        <h4 className="font-bold text-white">{job.title}</h4>
        <p className="text-cyan-400 text-sm">{job.company_name}</p>
        <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
          <span>{job.location?.split(',')[0] || 'India'}</span>
          <span>•</span>
          <span>{job.experience || 'Any'}</span>
        </div>
      </div>
    </Link>
  );
};

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
