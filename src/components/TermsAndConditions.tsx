import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronRight, Scale } from 'lucide-react';
import { ActiveTab } from '../types';

interface TermsAndConditionsProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function TermsAndConditions({ setActiveTab }: TermsAndConditionsProps) {
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
          <span className="text-indigo-600 font-extrabold">TERMS & CONDITIONS</span>
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
            <Scale className="h-6 w-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-sans mt-3 max-w-xl leading-relaxed">
            By accessing and using Exefun's platform, you agree to comply with and be bound by the following Terms and Conditions. Please read these terms carefully before using our services.
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 font-sans text-slate-600 text-sm sm:text-base leading-relaxed">
          
          <div className="space-y-2">
            <h2 className="text-base font-extrabold text-slate-900">
              1. Acceptance of Terms
            </h2>
            <p className="text-slate-500 text-sm pl-4">
              By using Exefun's website and games, you agree to abide by these Terms and Conditions. If you do not agree with these terms, you should not use our platform.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-extrabold text-slate-900">
              2. Use of Services
            </h2>
            <p className="text-slate-500 text-sm pl-4">
              Exefun grants you a non-exclusive, non-transferable right to use our games and services for personal, non-commercial purposes. You agree not to use our services for any illegal or unauthorized purpose.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-extrabold text-slate-900">
              3. Account Responsibility
            </h2>
            <p className="text-slate-500 text-sm pl-4">
              To access certain features of Exefun, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-extrabold text-slate-900">
              4. User Content
            </h2>
            <p className="text-slate-500 text-sm pl-4">
              You retain ownership of any content you submit or upload to Exefun's platform. By submitting content, you grant Exefun a worldwide, royalty-free license to use, display, and distribute the content within the scope of the services provided.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-extrabold text-slate-900">
              5. Data Privacy
            </h2>
            <p className="text-slate-500 text-sm pl-4">
              Exefun respects your privacy and is committed to protecting your personal data. Please refer to our Privacy Policy for detailed information on how we collect, use, and protect your data.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-extrabold text-slate-900">
              6. Prohibited Activities
            </h2>
            <div className="text-slate-500 text-sm pl-4 space-y-2">
              <p>You agree not to engage in any of the following activities:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Accessing or using our platform for fraudulent, illegal, or harmful purposes.</li>
                <li>Attempting to gain unauthorized access to other users' accounts or data.</li>
                <li>Interfering with or disrupting the functionality of the Exefun platform.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-extrabold text-slate-900">
              7. Termination
            </h2>
            <p className="text-slate-500 text-sm pl-4">
              Exefun reserves the right to suspend or terminate your access to the platform if you violate these Terms and Conditions. We may also suspend services at any time for maintenance or improvements.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-extrabold text-slate-900">
              8. Disclaimers and Limitation of Liability
            </h2>
            <p className="text-slate-500 text-sm pl-4">
              Exefun is provided "as is" without warranties of any kind, either express or implied. We are not responsible for any damages or losses that may occur from using our platform or services.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-extrabold text-slate-900">
              9. Modifications to Terms
            </h2>
            <p className="text-slate-500 text-sm pl-4">
              Exefun may update these Terms and Conditions from time to time. We encourage you to review them periodically. Your continued use of the platform after any changes will signify your acceptance of the updated terms.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-extrabold text-slate-900">
              10. Governing Law
            </h2>
            <p className="text-slate-500 text-sm pl-4">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction where Exefun operates.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 text-xs sm:text-sm text-slate-500 italic">
            By using Exefun's services, you acknowledge that you have read and understood these Terms and Conditions and agree to be bound by them.
          </div>
        </div>
      </div>
    </motion.div>
  );
}
