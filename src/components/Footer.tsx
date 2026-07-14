import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { 
  Brain, ArrowUp, ArrowUpRight, Mail, Send, CheckCircle2,
  Globe, Shield, GraduationCap, Heart, Sparkles, Lock
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab, mode?: 'login' | 'register') => void;
  setSelectedSkillId?: (skillId: string | null) => void;
}

export default function Footer({ setActiveTab, setSelectedSkillId }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Smooth scroll to top of window
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSkillsScroll = () => {
    if (setSelectedSkillId) {
      setSelectedSkillId(null);
    }
    setActiveTab('skills');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubSkillClick = (subSkillId: string) => {
    if (setSelectedSkillId) {
      setSelectedSkillId(subSkillId);
    }
    setActiveTab('skills');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 py-16 text-left" id="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8 pb-6 border-b border-slate-900">
          
          {/* Column 1: Brand details & Social (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div 
              onClick={() => handleNavClick('home')}
              className="inline-flex items-center space-x-2.5 cursor-pointer group"
              id="footer-logo-btn"
            >
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2.5 rounded-xl group-hover:rotate-6 transition-transform duration-300 shadow-md shadow-blue-500/10">
                <Brain className="h-5.5 w-5.5 text-white" />
              </div>
              <span className="text-xl font-sans font-extrabold tracking-tight text-white">
                Exe<span className="text-blue-400">fun</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed font-sans max-w-sm">
              An academic research initiative by a Government of India governed Educational Institution. We study and deploy localized, evidence-based cognitive training modules targeting executive functioning skills in Indian Higher Education Institutes.
            </p>

            {/* Scientific Credentials badge */}
            <div className="flex flex-col space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono w-fit">
                <Shield className="h-3.5 w-3.5 text-emerald-400 fill-emerald-500/20" />
                <span>FREELY ACCESSIBLE RESEARCH INITIATIVE</span>
              </div>
            </div>
          </div>

          {/* Column 2: Platform Sitemap (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <button 
                  onClick={() => handleNavClick('home')}
                  className="hover:text-blue-400 transition-colors cursor-pointer flex items-center space-x-1 text-slate-400 hover:text-white"
                >
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleSkillsScroll}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left text-slate-400 hover:text-white"
                >
                  <span>Executive Functioning</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('science')}
                  className="hover:text-blue-400 transition-colors cursor-pointer flex items-center space-x-1 text-slate-400 hover:text-white"
                >
                  <span>The Approach</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('process')}
                  className="hover:text-blue-400 transition-colors cursor-pointer flex items-center space-x-1 text-slate-400 hover:text-white"
                >
                  <span>The Fun Process</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('objectives')}
                  className="hover:text-blue-400 transition-colors cursor-pointer flex items-center space-x-1 text-slate-400 hover:text-white"
                >
                  <span>Research Objectives</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('contact')}
                  className="hover:text-blue-400 transition-colors cursor-pointer flex items-center space-x-1 text-slate-400 hover:text-white"
                >
                  <span>Support</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Cognitive Focus Areas (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Cognitive Focus
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-sans">
              <li className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <button 
                  onClick={() => handleSubSkillClick('working-memory')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Working Memory
                </button>
              </li>
              <li className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                <button 
                  onClick={() => handleSubSkillClick('inhibition')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Inhibition
                </button>
              </li>
              <li className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                <button 
                  onClick={() => handleSubSkillClick('shifting')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Shifting
                </button>
              </li>
              <li className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <button 
                  onClick={() => handleSubSkillClick('initiation')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Initiation
                </button>
              </li>
              <li className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                <button 
                  onClick={() => handleSubSkillClick('planning')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Planning
                </button>
              </li>
              <li className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <button 
                  onClick={() => handleSubSkillClick('organizing')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Organization
                </button>
              </li>
              <li className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                <button 
                  onClick={() => handleSubSkillClick('emotional-control')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Emotional Control
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Security Compliance
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              The platformed is protected by advanced measures and the data is securely stored on no third party access server securely. 
            </p>

            {/* Trust and Security Badges */}
            <div className="mt-1.5 flex flex-col space-y-2.5">
              {/* PCI DSS Compliant Badge */}
              <div className="flex items-center space-x-3 bg-slate-950/40 border border-slate-900 rounded-xl p-2.5 hover:border-slate-800/80 transition-all">
                <svg className="h-7 w-7 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="15" fill="url(#pci-grad)" stroke="#10b981" strokeWidth="1.5"/>
                  <path d="M12 16L15 19L21 13" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="pci-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#064e3b"/>
                      <stop offset="1" stopColor="#022c22"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] font-sans font-extrabold tracking-wider text-slate-200">PCI DSS COMPLIANT</span>
                  <span className="text-[9px] font-mono font-medium text-slate-500">SECURE ACCOUNT ACCESS</span>
                </div>
              </div>

              {/* SSL Secure Badge */}
              <div className="flex items-center space-x-3 bg-slate-950/40 border border-slate-900 rounded-xl p-2.5 hover:border-slate-800/80 transition-all">
                <svg className="h-7 w-7 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="15" fill="url(#ssl-grad)" stroke="#3b82f6" strokeWidth="1.5"/>
                  <rect x="11" y="15" width="10" height="7" rx="1.5" fill="#ffffff"/>
                  <path d="M13 15V12.5C13 10.8431 14.3431 9.5 16 9.5C17.6569 9.5 19 10.8431 19 12.5V15" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="ssl-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1e3a8a"/>
                      <stop offset="1" stopColor="#0f172a"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] font-sans font-extrabold tracking-wider text-slate-200">256-BIT SSL SECURED</span>
                  <span className="text-[9px] font-mono font-medium text-slate-500">ENCRYPTED DATA CHANNEL</span>
                </div>
              </div>

              {/* Malware Safe Badge */}
              <div className="flex items-center space-x-3 bg-slate-950/40 border border-slate-900 rounded-xl p-2.5 hover:border-slate-800/80 transition-all">
                <svg className="h-7 w-7 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="15" fill="url(#safe-grad)" stroke="#6366f1" strokeWidth="1.5"/>
                  <path d="M16 8L10 10V16C10 20.5 16 23.5 16 23.5C16 23.5 22 20.5 22 16V10L16 8Z" fill="#ffffff"/>
                  <path d="M14 15.5L15.5 17L18.5 14" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="safe-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#312e81"/>
                      <stop offset="1" stopColor="#0f172a"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] font-sans font-extrabold tracking-wider text-slate-200">MALWARE SHIELD</span>
                  <span className="text-[9px] font-mono font-medium text-slate-500">DAILY SYSTEM AUDITS</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright details, quick legal links, and the scroll back to top button */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-sans space-y-4 md:space-y-0" id="footer-root">
          
          {/* Copyright */}
          <div className="max-w-md">
            © {new Date().getFullYear()} Exefun. All participant data is processed strictly in accordance with ethical research guidelines. <strong className="font-bold">IT Partner: Lyndata Systems LLP.</strong>
          </div>

          {/* Legal Links & Scroll Top */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => handleNavClick('privacy')} 
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => handleNavClick('terms')} 
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button 
              onClick={() => handleNavClick('contact')} 
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <a 
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors cursor-pointer flex items-center"
            >
              GitHub
            </a>

            {/* Scroll back to top */}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer shadow-md"
              aria-label="Scroll back to top"
              id="footer-scroll-top-btn"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
