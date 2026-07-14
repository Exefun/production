import React, { useState, useEffect } from 'react';
import { ActiveTab } from '../types';
import { 
  Brain, Menu, X, LogIn, ArrowUpRight, ChevronDown, ChevronUp,
  Shield, RefreshCw, PlayCircle, Clipboard, Heart, Microscope, Home, AlertTriangle, Sparkles, LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab, mode?: 'login' | 'register') => void;
  streak?: number;
  currentUser?: { name: string; email: string; avatarColor: string; avatarTag: string; focusArea: string } | null;
  onLogout?: () => void;
  setSelectedSkillId?: (skillId: string | null) => void;
}

export default function Navbar({ activeTab, setActiveTab, streak, currentUser, onLogout, setSelectedSkillId }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false);
  const [isMobileSkillsOpen, setIsMobileSkillsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom navigation items representing sections on our high-focus single-page solution
  const navItems = [
    { id: 'home', label: 'Home', isIcon: true },
    { id: 'skills', label: 'Executive Functioning Skills', hasDropdown: true },
    { id: 'science', label: 'The Approach' },
    { id: 'objectives', label: 'Research Objectives' },
    { id: 'process', label: 'The Fun Process' },
    { id: 'contact', label: 'Support' },
  ];

  // Detailed sub-skills list for the interactive dropdown
  const subSkills = [
    { id: 'working-memory', label: 'Working Memory', desc: 'Hold & manipulate instructions', icon: Brain, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { id: 'inhibition', label: 'Inhibition', desc: 'Manage impulses & distraction', icon: Shield, color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
    { id: 'shifting', label: 'Shifting', desc: 'Switch rules & transition tasks', icon: RefreshCw, color: 'text-pink-500', bgColor: 'bg-pink-50' },
    { id: 'initiation', label: 'Initiation', desc: 'Start assignments independently', icon: PlayCircle, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
    { id: 'planning', label: 'Planning', desc: 'Set goals & prioritize tasks', icon: Clipboard, color: 'text-amber-500', bgColor: 'bg-amber-50' },
    { id: 'organizing', label: 'Organization', desc: 'Arrange workspace & resources', icon: LayoutGrid, color: 'text-orange-500', bgColor: 'bg-orange-50' },
    { id: 'emotional-control', label: 'Emotional Control', desc: 'Regulate feeling & responses', icon: Heart, color: 'text-rose-500', bgColor: 'bg-rose-50' },
  ];

  // Smart Navigation Handler targeting single-page anchors
  const handleNavClick = (itemId: string) => {
    setIsMobileMenuOpen(false);
    setIsSkillsDropdownOpen(false);

    if (itemId === 'home') {
      setActiveTab('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (itemId === 'objectives') {
      setActiveTab('objectives');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (itemId === 'contact') {
      setActiveTab('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (itemId === 'skills') {
      if (setSelectedSkillId) {
        setSelectedSkillId(null);
      }
      setActiveTab('skills');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (itemId === 'science') {
      setActiveTab('science');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (itemId === 'process') {
      setActiveTab('process');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (itemId === 'faq') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById('faq-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Dedicated sub-skill click with precise scroll & routing to skills page
  const handleSubSkillClick = (subSkillId: string) => {
    setIsSkillsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileSkillsOpen(false);

    if (setSelectedSkillId) {
      setSelectedSkillId(subSkillId);
    }
    setActiveTab('skills');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Slimmer navbar container: h-14 sm:h-16 instead of h-16 sm:h-20 */}
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo (Left) */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center space-x-2 cursor-pointer group"
            id="nav-logo"
          >
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2 rounded-xl group-hover:rotate-3 transition-transform duration-300 shadow-sm shadow-blue-500/10">
              <Brain className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-lg font-sans font-extrabold tracking-tight text-slate-900">
              Exe<span className="text-blue-600">fun</span>
            </span>
          </div>

          {/* Desktop Navigation (Center) - Compact text-xs or text-sm */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isSkillsActive = item.id === 'skills' && activeTab === 'home';
              const isActive = activeTab === item.id || (item.id === 'skills' && isSkillsActive);
              
              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setIsSkillsDropdownOpen(true)}
                    onMouseLeave={() => setIsSkillsDropdownOpen(false)}
                  >
                    <button
                      id={`nav-item-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 outline-none cursor-pointer flex items-center space-x-1 ${
                        isActive 
                          ? 'text-blue-600 bg-blue-50/50' 
                          : 'text-black hover:text-blue-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isSkillsDropdownOpen ? 'rotate-180 text-blue-600' : 'opacity-70 text-slate-400'}`} />
                    </button>

                    {/* Animated Dropdown Menu */}
                    <AnimatePresence>
                      {isSkillsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 mt-1 w-80 bg-white border border-slate-150 rounded-2xl shadow-xl p-3 grid grid-cols-1 gap-1 z-50 text-left"
                        >
                          <div className="px-3.5 py-1.5 border-b border-slate-50 mb-1">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                              7 Cognitive Pillars
                            </span>
                          </div>

                          {subSkills.map((sub) => {
                            const SubIcon = sub.icon;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => handleSubSkillClick(sub.id)}
                                className="flex items-start space-x-3 p-2.5 rounded-xl text-left hover:bg-slate-50 transition-all group/sub cursor-pointer"
                              >
                                <div className={`p-2 rounded-lg ${sub.bgColor} ${sub.color} shrink-0 mt-0.5 border border-slate-100`}>
                                  <SubIcon className="h-4 w-4" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-slate-900 group-hover/sub:text-blue-600 transition-colors">
                                    {sub.label}
                                  </h5>
                                  <p className="text-[10px] text-slate-500 font-sans mt-0.5">
                                    {sub.desc}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 outline-none cursor-pointer flex items-center justify-center ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50/50' 
                      : 'text-black hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {item.isIcon ? <Home className="h-4.5 w-4.5 shrink-0" /> : item.label}
                </button>
              );
            })}
          </div>

          {/* Right Section: Auth Buttons (Slimmer padding / font sizes) */}
          <div className="hidden lg:flex items-center space-x-2.5">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200/60 rounded-xl p-1.5 pr-3">
                  <div className={`h-7 w-7 rounded-lg ${currentUser.avatarColor || 'bg-indigo-600'} text-white flex items-center justify-center text-[10px] font-mono font-bold tracking-tight shadow-inner`}>
                    {currentUser.avatarTag || 'ST'}
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-mono font-bold text-slate-800 leading-none truncate max-w-[100px]" title={currentUser.name}>
                      {currentUser.name}
                    </p>
                    <p className="text-[8px] font-sans text-slate-400 mt-0.5 max-w-[100px] truncate" title={currentUser.email}>
                      {currentUser.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onLogout) onLogout();
                    setActiveTab('home');
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200/50 hover:border-red-300 rounded-lg transition-all cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setActiveTab('auth', 'login')}
                  className="group flex items-center space-x-1 px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-all cursor-pointer border border-slate-200 rounded-lg hover:bg-slate-50"
                  id="nav-btn-login"
                >
                  <span>Login</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </button>
                
                <button 
                  onClick={() => setActiveTab('auth', 'register')}
                  className="group flex items-center space-x-1 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-sm shadow-blue-500/10 hover:shadow-md hover:shadow-blue-500/15 cursor-pointer"
                  id="nav-btn-start"
                >
                  <span>Get Started</span>
                  <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Thin warning banner strip below header but inside the sticky nav container */}
      <AnimatePresence initial={false}>
        {!isScrolled && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="bg-indigo-50/90 border-t border-b border-indigo-100/40 px-4 text-center overflow-hidden"
          >
            <div className="py-1.5 max-w-7xl mx-auto flex items-center justify-center space-x-1.5 text-[10px] sm:text-xs text-indigo-800 font-bold tracking-tight">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-pulse shrink-0" />
              <span>ACTIVE RESEARCH PHASE: Adaptive cognitive models under evaluation. Interactive modules arriving soon!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop & Sheet */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-slate-100 bg-white overflow-hidden shadow-inner"
            id="mobile-nav-menu"
          >
            <div className="px-3 pt-3 pb-6 space-y-1">
              {navItems.map((item) => {
                const isSkillsActive = item.id === 'skills' && activeTab === 'home';
                const isActive = activeTab === item.id || (item.id === 'skills' && isSkillsActive);
                
                if (item.hasDropdown) {
                  return (
                    <div key={item.id} className="space-y-0.5">
                      <button
                        onClick={() => setIsMobileSkillsOpen(!isMobileSkillsOpen)}
                        className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                          isActive 
                            ? 'text-blue-600 bg-blue-50/50' 
                            : 'text-black hover:text-blue-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isMobileSkillsOpen ? <ChevronUp className="h-4 w-4 text-blue-500" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                      </button>

                      <AnimatePresence>
                        {isMobileSkillsOpen && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/60 rounded-lg overflow-hidden"
                          >
                            {subSkills.map((sub) => {
                              const SubIcon = sub.icon;
                              return (
                                <button
                                  key={sub.id}
                                  onClick={() => handleSubSkillClick(sub.id)}
                                  className="flex items-center space-x-2.5 w-full py-2 px-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-md text-left"
                                >
                                  <SubIcon className={`h-3.5 w-3.5 ${sub.color}`} />
                                  <span>{sub.label}</span>
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50 border border-blue-100/60' 
                        : 'text-black hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.isIcon ? (
                      <span className="flex items-center space-x-2">
                        <Home className="h-4 w-4 text-inherit" />
                        <span>Home</span>
                      </span>
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </button>
                );
              })}

              <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
                {currentUser ? (
                  <>
                    <div className="flex items-center space-x-3 bg-slate-50 border border-slate-150 rounded-xl p-2">
                      <div className={`h-8 w-8 rounded-lg ${currentUser.avatarColor || 'bg-indigo-600'} text-white flex items-center justify-center text-xs font-mono font-bold shrink-0`}>
                        {currentUser.avatarTag || 'ST'}
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{currentUser.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        if (onLogout) onLogout();
                        setActiveTab('home');
                      }}
                      className="flex items-center justify-center space-x-1.5 w-full py-2.5 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 cursor-pointer"
                    >
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setActiveTab('auth', 'login');
                      }}
                      className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer border border-slate-200"
                    >
                      <span>Login</span>
                      <LogIn className="h-4 w-4 text-slate-400" />
                    </button>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setActiveTab('auth', 'register');
                      }}
                      className="flex items-center justify-center space-x-1.5 w-full py-3 text-xs font-bold text-white bg-blue-600 rounded-lg transition-all cursor-pointer shadow-sm"
                      id="mobile-nav-btn-start"
                    >
                      <span>Get Started</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
