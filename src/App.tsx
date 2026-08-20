import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import {
  ActiveTab,
  UserStats,
} from './types';

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
import Dashboard from './components/Dashboard';

export default function App() {
  const [activeTab, setActiveTab] =
    useState<ActiveTab>('home');

  const [authMode, setAuthMode] =
    useState<'login' | 'register'>('login');

  const [selectedSkillId, setSelectedSkillId] =
    useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    avatarColor: string;
    avatarTag: string;
    focusArea: string;
  } | null>(null);

  const [stats, setStats] = useState<UserStats>({
    level: 2,
    xp: 1450,
    streak: 6,
    gamesPlayed: INITIAL_SCORES_HISTORY.length,
    scoresHistory: INITIAL_SCORES_HISTORY,
  });

  /**
   * Central navigation handler.
   *
   * The optional mode parameter is used by authentication
   * navigation to choose between login and registration.
   */
  const handleSetActiveTab = (
    tab: ActiveTab,
    mode?: 'login' | 'register'
  ) => {
    setActiveTab(tab);

    if (mode) {
      setAuthMode(mode);
    }
  };

  /**
   * Keep the viewport at the top whenever the active page changes.
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [activeTab]);

  /**
   * Pages that use the light application background.
   */
  const isLightBg =
    activeTab === 'privacy' ||
    activeTab === 'terms' ||
    activeTab === 'auth' ||
    activeTab === 'objectives' ||
    activeTab === 'contact' ||
    activeTab === 'process' ||
    activeTab === 'science' ||
    activeTab === 'skills';

  /**
   * Shared page transition wrapper.
   */
  const pageTransition = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -10,
    },
    transition: {
      duration: 0.2,
    },
  };

  return (
    <div
      className={`
        min-h-screen
        ${
          isLightBg
            ? 'bg-slate-50 text-slate-900'
            : 'bg-[#070913] text-white'
        }
        flex flex-col
        selection:bg-indigo-500
        selection:text-white
        transition-colors
        duration-200
      `}
    >
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
        streak={stats.streak}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          setActiveTab('home');
        }}
        setSelectedSkillId={setSelectedSkillId}
      />

      {/* Main application content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">

          {/* Authentication */}
          {activeTab === 'auth' && (
            <motion.div
              key="auth-view"
              {...pageTransition}
            >
            <Auth
  onLogin={(user) => {
    setCurrentUser(user);
    setActiveTab('dashboard');
  }}
  setActiveTab={handleSetActiveTab}
  initialMode={authMode}
/>
            </motion.div>
          )}

          {/* Dashboard */}
{activeTab === 'dashboard' && currentUser && (
  <motion.div
    key="dashboard-view"
    {...pageTransition}
  >
    <Dashboard
      user={currentUser}
      setActiveTab={handleSetActiveTab}
      onLogout={() => {
        setCurrentUser(null);
        setActiveTab('home');
      }}
    />
  </motion.div>
)}

          {/* Privacy Policy */}
          {activeTab === 'privacy' && (
            <motion.div
              key="privacy-view"
              {...pageTransition}
            >
              <PrivacyPolicy
                setActiveTab={handleSetActiveTab}
              />
            </motion.div>
          )}

          {/* Terms and Conditions */}
          {activeTab === 'terms' && (
            <motion.div
              key="terms-view"
              {...pageTransition}
            >
              <TermsAndConditions
                setActiveTab={handleSetActiveTab}
              />
            </motion.div>
          )}

          {/* Research Objectives */}
          {activeTab === 'objectives' && (
            <motion.div
              key="objectives-view"
              {...pageTransition}
            >
              <ResearchObjectives
                setActiveTab={handleSetActiveTab}
              />
            </motion.div>
          )}

          {/* Contact / Support */}
          {activeTab === 'contact' && (
            <motion.div
              key="support-view"
              {...pageTransition}
            >
              <Support
                setActiveTab={handleSetActiveTab}
              />
            </motion.div>
          )}

          {/* Process */}
          {activeTab === 'process' && (
            <motion.div
              key="process-view"
              {...pageTransition}
            >
              <FunProcess
                setActiveTab={handleSetActiveTab}
              />
            </motion.div>
          )}

          {/* Science */}
          {activeTab === 'science' && (
            <motion.div
              key="science-view"
              {...pageTransition}
            >
              <Science
                setActiveTab={handleSetActiveTab}
              />
            </motion.div>
          )}

          {/* Skills */}
          {activeTab === 'skills' && (
            <motion.div
              key="skills-view"
              {...pageTransition}
            >
              <SkillsDetail
                setActiveTab={handleSetActiveTab}
                selectedSkillId={selectedSkillId}
                setSelectedSkillId={setSelectedSkillId}
              />
            </motion.div>
          )}

          {/* Homepage */}
         {activeTab !== 'auth' &&
  activeTab !== 'dashboard' &&
  activeTab !== 'privacy' &&
  activeTab !== 'terms' &&
  activeTab !== 'objectives' &&
  activeTab !== 'contact' &&
  activeTab !== 'process' &&
  activeTab !== 'science' &&
  activeTab !== 'skills' && (
              <motion.div
                key="homepage-single-view"
                {...pageTransition}
              >
                <Hero
                  setActiveTab={handleSetActiveTab}
                />

                <Features
                  setActiveTab={handleSetActiveTab}
                  setSelectedSkillId={setSelectedSkillId}
                />

                <TestimonialsAndFaq
                  setActiveTab={handleSetActiveTab}
                />

                <ResearchTeam
                  lightMode={false}
                />
              </motion.div>
            )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={handleSetActiveTab}
        setSelectedSkillId={setSelectedSkillId}
      />
    </div>
  );
}