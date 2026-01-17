import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RoutingLoader from './components/RoutingLoader'; 
import { TransitionProvider } from './context/TransitionContext';

// Placeholder Pages
const AboutPage = () => <div className="h-screen flex items-center justify-center text-4xl font-bold text-[#FFEBD0]">About Us Page</div>;
const EventsPage = () => <div className="h-screen flex items-center justify-center text-4xl font-bold text-[#FFEBD0]">Events Page</div>;
const ContactPage = () => <div className="h-screen flex items-center justify-center text-4xl font-bold text-[#FFEBD0]">Contact Page</div>;

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      
      {/* The Spline Loader - Stays mounted to handle transitions */}
      <RoutingLoader />
      
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <TransitionProvider>
        <AppContent />
      </TransitionProvider>
    </Router>
  );
}

export default App;