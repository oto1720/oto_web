import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Navigation from './components/Navigation';
import Cursor from './components/Cursor';
import LoadingScreen from './components/LoadingScreen';

// Pages - Lazy loaded for code splitting
const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  const location = useLocation();

  // Update page title based on current route
  useEffect(() => {
    const pageName = location.pathname.slice(1) || 'home';
    document.title = `${pageName.charAt(0).toUpperCase() + pageName.slice(1)} | Personal Homepage`;
  }, [location]);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Cursor />
      <Navigation />

      <main className="w-full">
        <Suspense fallback={<LoadingScreen />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
    </div>
  );
}

export default App;