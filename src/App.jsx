import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/job/:id" element={<JobDetail />} />

      <Route path="/about" element={<About />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
    </Routes>
  );
}

export default App;