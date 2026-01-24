import React, { useLayoutEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { TransitionProvider, usePageTransition } from './context/TransitionContext';
import Navbar from './components/Navbar';
import ForwardLoader from './components/ForwardLoader'; 
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import SponsorsPage from './components/sponsor/Sponsor';
import EventsPage from './pages/EventsPage';

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { currentLoader, startTransition, targetPath, endTransition } = usePageTransition(); 
  const prevPath = useRef<string | null>(null);

  useLayoutEffect(() => {
      // BACK BUTTON LOGIC
      if (location.pathname === '/' && prevPath.current && prevPath.current !== '/') {
           if (currentLoader === 'none') {
               // FIX: Changed 'routing' to 'forward'
               startTransition('forward', '/'); 
           }
      }
      prevPath.current = location.pathname;
  }, [location, currentLoader, startTransition]);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-indigo-500/30">
      <Navbar />

      {/* FIX: Ensure ForwardLoader is used when state is 'forward' */}
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