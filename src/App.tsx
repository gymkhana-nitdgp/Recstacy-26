import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
// Make sure this imports 'RoutingLoader', not 'SplineGateway'
import RoutingLoader from './components/RoutingLoader'; 
import { TransitionProvider } from './context/TransitionContext';

// Placeholder Pages
const AboutPage = () => <div className="h-screen flex items-center justify-center text-4xl font-bold text-[#FFEBD0]">About Us Page</div>;
const EventsPage = () => <div className="h-screen flex items-center justify-center text-4xl font-bold text-[#FFEBD0]">Events Page</div>;
const ContactPage = () => <div className="h-screen flex items-center justify-center text-4xl font-bold text-[#FFEBD0]">Contact Page</div>;

const App: React.FC = () => {
  return (
    <Router>
      {/* 1. Wrap EVERYTHING in the TransitionProvider */}
      <TransitionProvider>
        <div className="bg-black min-h-screen text-white">
          <Navbar />
          
          {/* 2. Place the RoutingLoader here. It stays loaded forever. */}
          <RoutingLoader />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </TransitionProvider>
    </Router>
  );
}

export default App;