import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

// Placeholder Components for routes other than Home
const AboutPage = () => <div className="h-screen flex items-center justify-center text-4xl font-bold text-[#FFEBD0]">About Us Page</div>;
const EventsPage = () => <div className="h-screen flex items-center justify-center text-4xl font-bold text-[#FFEBD0]">Events Page</div>;
const ContactPage = () => <div className="h-screen flex items-center justify-center text-4xl font-bold text-[#FFEBD0]">Contact Page</div>;

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;