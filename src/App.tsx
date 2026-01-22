// src/App.tsx
import React, { useLayoutEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

// Context
import { TransitionProvider, usePageTransition } from './context/TransitionContext';

// Components
import Navbar from './components/Navbar';
// import RoutingLoader from './components/RoutingLoader'; 
import ForwardLoader from './components/ForwardLoader'; 

// Pages
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
// import SponsorsPage from './pages/SponsorsPage';
import SponsorsPage from './components/sponsor/Sponsor';
import EventsPage from './pages/EventsPage'; // <--- This imports the optimized carousel page

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { currentLoader, startTransition, targetPath, endTransition } = usePageTransition(); 
  const prevPath = useRef<string | null>(null);

  useLayoutEffect(() => {
      // BACK BUTTON LOGIC
      if (location.pathname === '/' && prevPath.current && prevPath.current !== '/') {
           if (currentLoader === 'none') {
               startTransition('routing', '/'); 
           }
      }
      prevPath.current = location.pathname;
  }, [location, currentLoader, startTransition]);

  return (
    // Added selection color here to apply globally
    <div className="bg-black min-h-screen text-white selection:bg-indigo-500/30">
      <Navbar />

      {/* <RoutingLoader /> */}

      {currentLoader === 'forward' && (
         <ForwardLoader 
            onMidway={() => navigate(targetPath)} 
            onComplete={() => endTransition()} 
         />
      )}
      
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
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