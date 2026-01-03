import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Details from './pages/Details';
import Read from './pages/Read';
import Profile from './pages/Profile';
import Discover from './pages/Discover';
import Popular from './pages/Popular';
import Latest from './pages/Latest';
import { AppMode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.MANGA);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout mode={mode} setMode={setMode} isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
              <Home mode={mode} />
            </Layout>
          } 
        />
        <Route 
          path="/discover" 
          element={
            <Layout mode={mode} setMode={setMode} isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
              <Discover mode={mode} />
            </Layout>
          } 
        />
        <Route 
          path="/popular" 
          element={
            <Layout mode={mode} setMode={setMode} isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
              <Popular mode={mode} />
            </Layout>
          } 
        />
        <Route 
          path="/latest" 
          element={
            <Layout mode={mode} setMode={setMode} isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
              <Latest mode={mode} />
            </Layout>
          } 
        />
        <Route 
          path="/details/:id" 
          element={
            <Layout mode={mode} setMode={setMode} isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
              <Details />
            </Layout>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <Layout mode={mode} setMode={setMode} isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
              <Profile />
            </Layout>
          } 
        />
        {/* Reader routes are typically full screen, so they might not use the main layout */}
        <Route path="/read/:mode/:id/:chapter" element={<Read />} />
        
        {/* Catch-all redirects */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;