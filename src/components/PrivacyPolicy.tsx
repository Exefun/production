import React from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowLeft, ChevronRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface PrivacyPolicyProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function PrivacyPolicy({ setActiveTab }: PrivacyPolicyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-4 py-8 sm:py-12 text-left animate-fade-in"
    >
      {/* Breadcrumb & Back button strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <nav className="flex items-center space-x-2 text-[11px] sm:text-xs font-mono tracking-wider text-slate-600 bg-white border border-slate-200 rounded-full py-1.5 px-4 shadow-sm w-fit">
          <button 
            onClick={() => setActiveTab('home')}
            className="hover:text-blue-600 hover:underline transition-colors cursor-pointer"
          >
            HOME
          </button>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-indigo-600 font-extrabold">PRIVACY POLICY</span>
        </nav>

        <button 
          onClick={() => setActiveTab('home')}
          className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-500 hover:text-slate-900 transition-all cursor-pointer group w-fit"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>BACK TO HOME</span>
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Glow accents */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-10 pb-8 border-b border-slate-100">
          <div className="bg-blue-500/10 p-3 rounded-2xl mb-4 border border-blue-500/20 text-blue-600">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-sans mt-3 max-w-xl leading-relaxed">
            Exefun values your privacy and is committed to protecting your personal information while you enjoy our brain games and related services.
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 font-sans text-slate-600 text-sm sm:text-base leading-relaxed">
          <p>
            Exefun is a platform dedicated to providing exciting brain games and cognitive development tools. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website or play our games.
          </p>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              <span>Information We Collect</span>
            </h2>
            <p className="pl-3 text-slate-500 text-sm">
              When you sign up for Exefun or interact with our games, we may collect personal data such as your name, email address, and device information. We may also collect non-personal information related to your gameplay, such as scores, preferences, and in-game activities.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
              <span>How We Use Your Information</span>
            </h2>
            <p className="pl-3 text-slate-500 text-sm">
              We use your information to personalize your gaming experience, improve our games, provide customer support, and communicate with you about new features or updates. We also use your information to analyze usage patterns and enhance the performance of our platform.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500 shrink-0" />
              <span>Data Protection</span>
            </h2>
            <p className="pl-3 text-slate-500 text-sm">
              Exefun is committed to ensuring the security of your data. We implement strong technical and organizational measures to protect your personal information from unauthorized access, alteration, or disclosure.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Third-Party Sharing</span>
            </h2>
            <p className="pl-3 text-slate-500 text-sm">
              We do not share your personal information with third parties for marketing purposes. However, we may share data with trusted partners for operational purposes, such as game analytics or customer service, while ensuring that they follow the same data protection standards as Exefun.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
              <span>Your Rights</span>
            </h2>
            <p className="pl-3 text-slate-500 text-sm">
              You have the right to access, correct, or delete your personal data at any time. If you have any concerns or requests regarding your privacy, you can contact our support team, and we will assist you promptly.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />
              <span>Changes to This Privacy Policy</span>
            </h2>
            <p className="pl-3 text-slate-500 text-sm">
              Exefun may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We encourage you to review this policy periodically to stay informed about how we are protecting your data.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 text-xs sm:text-sm text-slate-500 italic">
            By using Exefun's games and services, you consent to the collection and use of your data as outlined in this Privacy Policy.
          </div>
        </div>
      </div>
    </motion.div>
  );
}
