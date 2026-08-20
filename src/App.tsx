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
import ResetPassword from './components/ResetPassword';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import ResearchObjectives from './components/ResearchObjectives';
import Support from './components/Support';
import FunProcess from './components/FunProcess';
import Science from './components/Science';
import SkillsDetail from './components/SkillsDetail';
import ResearchTeam from './components/ResearchTeam';
import Dashboard from './components/Dashboard';


// --------------------------------------------------
// AUTHENTICATED USER TYPE
// --------------------------------------------------

interface CurrentUser {
  name: string;
  email: string;
  avatarColor: string;
  avatarTag: string;
  focusArea: string;
}


// --------------------------------------------------
// APP
// --------------------------------------------------

export default function App() {

    // --------------------------------------------------
  // PASSWORD RESET URL
  // --------------------------------------------------

  const resetPasswordMatch =
    window.location.pathname.match(
      /^\/reset-password\/([^/]+)\/?$/
    );

  const resetPasswordToken =
    resetPasswordMatch
      ? decodeURIComponent(
          resetPasswordMatch[1]
        )
      : null;

  const [activeTab, setActiveTab] =
    useState<ActiveTab>('home');

  const [authMode, setAuthMode] =
    useState<'login' | 'register'>('login');

  const [selectedSkillId, setSelectedSkillId] =
    useState<string | null>(null);

  const [currentUser, setCurrentUser] =
    useState<CurrentUser | null>(null);

  /**
   * Prevent the homepage from flashing briefly while
   * the application checks whether a previous login
   * session exists in localStorage.
   */
  const [isAuthRestoring, setIsAuthRestoring] =
    useState(true);

  const [stats, setStats] = useState<UserStats>({
    level: 2,
    xp: 1450,
    streak: 6,
    gamesPlayed: INITIAL_SCORES_HISTORY.length,
    scoresHistory: INITIAL_SCORES_HISTORY,
  });


  // --------------------------------------------------
  // RESTORE AUTHENTICATED SESSION
  // --------------------------------------------------

  useEffect(() => {

    const restoreSession = () => {

      try {

        const token =
          localStorage.getItem('exefun_token');

        const userId =
          localStorage.getItem('exefun_user_id');

        const storedUser =
          localStorage.getItem('exefun_user');


        // ------------------------------------------
        // NO SAVED SESSION
        // ------------------------------------------

        if (!token || !userId) {

          setCurrentUser(null);
          setActiveTab('home');

          return;
        }


        // ------------------------------------------
        // RESTORE SAVED USER
        // ------------------------------------------

        if (storedUser) {

          try {

            const parsedUser: CurrentUser =
              JSON.parse(storedUser);

            if (
              parsedUser &&
              parsedUser.name &&
              parsedUser.email
            ) {

              setCurrentUser(parsedUser);
              setActiveTab('dashboard');

              return;
            }

          } catch (parseError) {

            console.error(
              'Unable to parse saved Exefun user session:',
              parseError
            );

          }

        }


        // ------------------------------------------
        // INVALID / INCOMPLETE LOCAL SESSION
        // ------------------------------------------

        console.warn(
          'Authentication credentials were found, but the saved user information is unavailable.'
        );

        setCurrentUser(null);
        setActiveTab('home');

      } catch (error) {

        console.error(
          'Authentication session restoration error:',
          error
        );

        setCurrentUser(null);
        setActiveTab('home');

      } finally {

        setIsAuthRestoring(false);

      }

    };

    restoreSession();

  }, []);


  // --------------------------------------------------
  // CENTRAL NAVIGATION HANDLER
  // --------------------------------------------------

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


  // --------------------------------------------------
  // LOGOUT HANDLER
  // --------------------------------------------------

  /**
   * Completely clears the authenticated session.
   *
   * This removes both the React state and the persisted
   * browser authentication information.
   */
  const handleLogout = () => {

    localStorage.removeItem('exefun_token');
    localStorage.removeItem('exefun_user_id');
    localStorage.removeItem('exefun_user');

    setCurrentUser(null);
    setActiveTab('home');

  };


  // --------------------------------------------------
  // KEEP VIEWPORT AT TOP
  // --------------------------------------------------

  /**
   * Keep the viewport at the top whenever the active
   * page changes.
   */
  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  }, [activeTab]);


  // --------------------------------------------------
  // LIGHT BACKGROUND PAGES
  // --------------------------------------------------

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


  // --------------------------------------------------
  // PAGE TRANSITION
  // --------------------------------------------------

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


  // --------------------------------------------------
  // AUTH RESTORATION SCREEN
  // --------------------------------------------------

  /**
   * Do not render the homepage while the application
   * is checking localStorage for an existing session.
   *
   * This prevents a visible homepage flash during refresh.
   */
  if (isAuthRestoring) {

    return (
      <div className="min-h-screen bg-[#070913] flex items-center justify-center">

        <p className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
          Restoring Session...
        </p>

      </div>
    );

  }


  // --------------------------------------------------
  // MAIN APPLICATION
  // --------------------------------------------------

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

      {/* ------------------------------------------------ */}
      {/* NAVBAR */}
      {/* ------------------------------------------------ */}

      <Navbar
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
        streak={stats.streak}
        currentUser={currentUser}
        onLogout={handleLogout}
        setSelectedSkillId={setSelectedSkillId}
      />


      {/* ------------------------------------------------ */}
      {/* MAIN APPLICATION CONTENT */}
      {/* ------------------------------------------------ */}

      <main className="flex-grow">

        <AnimatePresence mode="wait">

                    {/* ------------------------------------------------ */}
          {/* PASSWORD RESET */}
          {/* ------------------------------------------------ */}

          {resetPasswordToken && (

            <motion.div
              key="reset-password-view"
              {...pageTransition}
            >

              <ResetPassword
                resetToken={resetPasswordToken}

                onBackToLogin={() => {

                  window.history.pushState(
                    {},
                    '',
                    '/'
                  );

                  setAuthMode('login');
                  setActiveTab('auth');

                }}
              />

            </motion.div>

          )}


          {/* ------------------------------------------------ */}
          {/* AUTHENTICATION */}
          {/* ------------------------------------------------ */}

          {activeTab === 'auth' && (

            <motion.div
              key="auth-view"
              {...pageTransition}
            >

              <Auth
                onLogin={(user) => {

                  /**
                   * Save the authenticated user in React state.
                   *
                   * Auth.tsx also persists the same user object
                   * to localStorage so the session can survive
                   * a browser refresh.
                   */
                  setCurrentUser(user);

                  setActiveTab('dashboard');

                }}

                setActiveTab={handleSetActiveTab}

                initialMode={authMode}
              />

            </motion.div>

          )}


          {/* ------------------------------------------------ */}
          {/* DASHBOARD */}
          {/* ------------------------------------------------ */}

          {activeTab === 'dashboard' && currentUser && (

            <motion.div
              key="dashboard-view"
              {...pageTransition}
            >

              <Dashboard
                user={currentUser}
                setActiveTab={handleSetActiveTab}
                onLogout={handleLogout}
              />

            </motion.div>

          )}


          {/* ------------------------------------------------ */}
          {/* PRIVACY POLICY */}
          {/* ------------------------------------------------ */}

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


          {/* ------------------------------------------------ */}
          {/* TERMS AND CONDITIONS */}
          {/* ------------------------------------------------ */}

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


          {/* ------------------------------------------------ */}
          {/* RESEARCH OBJECTIVES */}
          {/* ------------------------------------------------ */}

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


          {/* ------------------------------------------------ */}
          {/* CONTACT / SUPPORT */}
          {/* ------------------------------------------------ */}

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


          {/* ------------------------------------------------ */}
          {/* PROCESS */}
          {/* ------------------------------------------------ */}

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


          {/* ------------------------------------------------ */}
          {/* SCIENCE */}
          {/* ------------------------------------------------ */}

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


          {/* ------------------------------------------------ */}
          {/* SKILLS */}
          {/* ------------------------------------------------ */}

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


          {/* ------------------------------------------------ */}
          {/* HOMEPAGE */}
          {/* ------------------------------------------------ */}

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


      {/* ------------------------------------------------ */}
      {/* FOOTER */}
      {/* ------------------------------------------------ */}

      <Footer
        setActiveTab={handleSetActiveTab}
        setSelectedSkillId={setSelectedSkillId}
      />

    </div>

  );
}