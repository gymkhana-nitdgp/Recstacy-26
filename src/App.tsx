// App.tsx
import React, { useLayoutEffect, useRef } from 'react';
// 1. Import useNavigate
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import SponsorsPage from './pages/SponsorsPage';
import RoutingLoader from './components/RoutingLoader'; 
import ForwardLoader from './components/ForwardLoader'; 
import { TransitionProvider, usePageTransition } from './context/TransitionContext';

const EventsPage = () => <div className="h-screen bg-black flex items-center justify-center text-4xl font-bold text-[#FFEBD0]">EVENTS PAGE</div>;

const AppContent: React.FC = () => {
  const location = useLocation();
  // 2. Initialize navigate
  const navigate = useNavigate(); 
  // 3. Extract targetPath and endTransition
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
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <RoutingLoader />

      {/* 4. Connect the ForwardLoader props */}
      {currentLoader === 'forward' && (
         <ForwardLoader 
            // Switches the page exactly when curtains are closed
            onMidway={() => navigate(targetPath)} 
            // Cleans up the loader state when animation finishes
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