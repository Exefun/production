import React, { useState, useEffect } from 'react';
import { ActiveTab, UserStats, GameScore } from './types';
import { INITIAL_SCORES_HISTORY } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import TestimonialsAndFaq from './components/TestimonialsAndFaq';
import Auth from './components/Auth';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import ResearchObjectives from './components/ResearchObjectives';
import Support from './components/Support';
import FunProcess from './components/FunProcess';
import Science from './components/Science';
import SkillsDetail from './components/SkillsDetail';
import ResearchTeam from './components/ResearchTeam';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; avatarColor: string; avatarTag: string; focusArea: string } | null>(null);
  const [stats, setStats] = useState<UserStats>({
    level: 2,
    xp: 1450,
    streak: 6,
    gamesPlayed: INITIAL_SCORES_HISTORY.length,
    scoresHistory: INITIAL_SCORES_HISTORY
  });

  const handleSetActiveTab = (tab: ActiveTab, mode?: 'login' | 'register') => {
    setActiveTab(tab);
    if (mode) {
      setAuthMode(mode);
    }
  };

  // Handle section scrolling when activeTab changes
  useEffect(() => {
    if (activeTab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Since only the homepage is remaining, smoothly bring user to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  const isLightBg = activeTab === 'privacy' || activeTab === 'terms' || activeTab === 'auth' || activeTab === 'objectives' || activeTab === 'contact' || activeTab === 'process' || activeTab === 'science' || activeTab === 'skills';

  return (
    <div className={`min-h-screen ${isLightBg ? 'bg-slate-50 text-slate-900' : 'bg-[#070913] text-white'} flex flex-col selection:bg-indigo-500 selection:text-white transition-colors duration-200`}>
      {/* Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleSetActiveTab} 
        streak={stats.streak} 
        currentUser={currentUser} 
        onLogout={() => setCurrentUser(null)} 
        setSelectedSkillId={setSelectedSkillId}
      />

      {/* Main Container rendering either Auth, Privacy, Terms or Homepage elements */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'auth' ? (
            <motion.div
              key="auth-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Auth onLogin={setCurrentUser} setActiveTab={handleSetActiveTab} initialMode={authMode} />
            </motion.div>
          ) : activeTab === 'privacy' ? (
            <motion.div
              key="privacy-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <PrivacyPolicy setActiveTab={handleSetActiveTab} />
            </motion.div>
          ) : activeTab === 'terms' ? (
            <motion.div
              key="terms-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TermsAndConditions setActiveTab={handleSetActiveTab} />
            </motion.div>
          ) : activeTab === 'objectives' ? (
            <motion.div
              key="objectives-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ResearchObjectives setActiveTab={handleSetActiveTab} />
            </motion.div>
          ) : activeTab === 'contact' ? (
            <motion.div
              key="support-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Support setActiveTab={handleSetActiveTab} />
            </motion.div>
          ) : activeTab === 'process' ? (
            <motion.div
              key="process-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <FunProcess setActiveTab={handleSetActiveTab} />
            </motion.div>
          ) : activeTab === 'science' ? (
            <motion.div
              key="science-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Science setActiveTab={handleSetActiveTab} />
            </motion.div>
          ) : activeTab === 'skills' ? (
            <motion.div
              key="skills-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <SkillsDetail 
                setActiveTab={handleSetActiveTab} 
                selectedSkillId={selectedSkillId} 
                setSelectedSkillId={setSelectedSkillId} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="homepage-single-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Hero setActiveTab={handleSetActiveTab} />
              <Features setActiveTab={handleSetActiveTab} setSelectedSkillId={setSelectedSkillId} />
              <TestimonialsAndFaq setActiveTab={handleSetActiveTab} />
              <ResearchTeam lightMode={false} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer component */}
      <Footer setActiveTab={handleSetActiveTab} setSelectedSkillId={setSelectedSkillId} />
    </div>
  );
}
