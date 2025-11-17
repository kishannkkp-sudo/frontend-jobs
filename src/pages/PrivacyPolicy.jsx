// src/pages/PrivacyPolicy.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | FirstJobly - Latest Jobs in India 2025</title>
        <meta name="description" content="Read FirstJobly's Privacy Policy to understand how we collect, use, and protect your personal information when you visit https://www.firstjobly.in/" />
        <meta property="og:title" content="Privacy Policy - FirstJobly" />
        <meta property="og:description" content="We respect your privacy. Learn how FirstJobly collects and uses your data." />
        <link rel="canonical" href="https://www.firstjobly.in/privacy-policy" />
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-violet-900 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-12">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Privacy Policy for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">FirstJobly</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Last Updated: November 17, 2025
            </p>
          </div>

          <div className="bg-white/8 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-12 space-y-10 text-gray-200 leading-relaxed">
            
            <section>
              <p className="text-lg">
                One of our top priorities at <strong>FirstJobly</strong>, accessible from <a href="https://www.firstjobly.in" className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">https://www.firstjobly.in</a>, is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by <strong>FirstJobly</strong> and how we use it.
              </p>
              <p className="mt-4">
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to <a href="/contact-us" className="text-cyan-400 hover:underline">contact us</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Consent</h2>
              <p>
                By using our website <a href="https://www.firstjobly.in" className="text-cyan-400 hover:underline">https://www.firstjobly.in</a>, you hereby consent to our Privacy Policy and agree to its terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <p>
                The personal information you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              </p>
              <p className="mt-3">
                If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p>We use the information we collect in various ways, including to:</p>
              <ul className="mt-4 space-y-2 list-disc list-inside text-gray-300">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new features, services, and functionality</li>
                <li>Communicate with you for customer service, updates, and marketing purposes</li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Log Files</h2>
              <p>
                FirstJobly follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes IP addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. This data is not linked to any personally identifiable information and is used for analyzing trends, administering the site, and gathering demographic information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Cookies and Web Beacons</h2>
              <p>
                Like most websites, <strong>FirstJobly</strong> uses "cookies" to enhance user experience. These cookies store information including visitors' preferences and the pages they visited. This helps us optimize content based on browser type and other visitor information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Advertising Partners</h2>
              <p>
                Third-party ad servers or ad networks (such as Google AdSense) may use technologies like cookies, JavaScript, or Web Beacons in their advertisements. These are sent directly to your browser and automatically receive your IP address. These technologies measure the effectiveness of advertising campaigns.
              </p>
              <p className="mt-3">
                Note that <strong>FirstJobly</strong> has no access to or control over these cookies used by third-party advertisers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Privacy Policies</h2>
              <p>
                FirstJobly's Privacy Policy does not apply to other advertisers or websites. We recommend reviewing the respective Privacy Policies of these third-party ad servers for more detailed information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">CCPA & GDPR Privacy Rights</h2>
              <p>Under CCPA (California) and GDPR (EU), you have the right to:</p>
              <ul className="mt-4 space-y-2 list-disc list-inside text-gray-300">
                <li>Request access to your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Request data portability</li>
              </ul>
              <p className="mt-4">
                We will respond to any valid request within one month. To exercise these rights, please <a href="/contact-us" className="text-cyan-400 hover:underline">contact us</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Children's Information</h2>
              <p>
                Protecting children online is a top priority. We do not knowingly collect personal information from children under 13 years of age. If you believe your child has provided such information on our site, please contact us immediately, and we will remove it promptly.
              </p>
            </section>

            <div className="border-t border-white/20 pt-8 text-center">
              <p className="text-gray-400">
                Thank you for trusting <strong className="text-cyan-300">FirstJobly</strong> — Your career journey starts here.
              </p>
              <p className="mt-4">
                <a href="https://www.firstjobly.in" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  www.firstjobly.in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;