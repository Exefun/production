import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  HelpCircle
} from 'lucide-react';
import { ActiveTab } from '../types';

interface SupportProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Support({ setActiveTab }: SupportProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('bug');
  const [affiliation, setAffiliation] = useState('');
  const [message, setMessage] = useState('');

  const [error, setError] = useState<string | null>(null);

  const [fieldErrors, setFieldErrors] = useState<{
    name?: boolean;
    email?: boolean;
    message?: boolean;
  }>({});

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const validateEmail = (emailStr: string) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(emailStr);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setError(null);
  setFieldErrors({});

  const newFieldErrors: typeof fieldErrors = {};

  if (!name.trim()) {
    newFieldErrors.name = true;
  }

  if (!email.trim()) {
    newFieldErrors.email = true;
  }

  if (!message.trim()) {
    newFieldErrors.message = true;
  }

  if (Object.keys(newFieldErrors).length > 0) {
    setFieldErrors(newFieldErrors);
    setError(
      'Please fill in all the required fields (Name, Email, and Message).'
    );
    return;
  }

  if (!validateEmail(email)) {
    setFieldErrors({ email: true });
    setError('Please enter a valid academic or personal email address.');
    return;
  }

  setIsLoading(true);

  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const response = await fetch(
      `${API_BASE_URL}/submitsupportform`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: name.trim(),
          email: email.trim(),
          category,
          affiliation: affiliation.trim(),
          message: message.trim(),
        }),
      }
    );

 
    const contentType = response.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
      const text = await response.text();

      console.error('Unexpected server response:', text);

      throw new Error(
        'The support server returned an unexpected response. Please check the API URL.'
      );
    }

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || 'Unable to submit your support request.'
      );
    }

    setTicketId(data.ticketId);
    setIsSuccess(true);

    // Reset form
    setName('');
    setEmail('');
    setCategory('bug');
    setAffiliation('');
    setMessage('');
  } catch (err) {
    console.error('Support submission error:', err);

    setError(
      err instanceof Error
        ? err.message
        : 'Unable to submit your support request. Please try again.'
    );
  } finally {
    setIsLoading(false);
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 py-8 sm:py-12 text-left animate-fade-in"
      id="support-root"
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

          <span className="text-indigo-600 font-extrabold">
            SUPPORT PORTAL
          </span>
        </nav>

        <button
          onClick={() => setActiveTab('home')}
          className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-500 hover:text-slate-900 transition-all cursor-pointer group w-fit"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>BACK TO HOME</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-5 space-y-6">

          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">

            <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-500/10 p-2.5 rounded-xl border border-blue-500/20 text-blue-600 shrink-0">
                <HelpCircle className="h-5 w-5" />
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                  HELP & INQUIRIES
                </span>

                <h2 className="text-xl font-extrabold text-slate-900 font-sans tracking-tight">
                  Support Commitment
                </h2>
              </div>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed mb-6 font-sans">
              As an academic initiative, we prioritize transparency, empirical rigor, and patient, expert assistance. We ensure that your data remains absolutely protected, while delivering direct solutions from our development cohort.
            </p>

            <div className="space-y-5">

              <div className="flex gap-4">
                <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/50">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-800 font-sans">
                    Privacy
                  </h4>

                  <p className="text-xs text-slate-500 leading-normal font-sans">
                    Your queries and support logs are managed separately from cognitive game baselines. No personal identifiers are linked back to testing data.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-9 w-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100/50">
                  <Clock className="h-4.5 w-4.5" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-800 font-sans">
                    Direct Cohort SLA
                  </h4>

                  <p className="text-xs text-slate-500 leading-normal font-sans">
                    You won't talk to automated chatbots or outsourced ticket farms. Your ticket is routed straight to our lead developmental psychologists and system engineers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/50">
                  <Building2 className="h-4.5 w-4.5" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-800 font-sans">
                    Institutional Governance
                  </h4>

                  <p className="text-xs text-slate-500 leading-normal font-sans">
                    Governed by ethical review parameters. We commit to zero diagnostic selling, zero dark patterns, and completely clear, honest disclosure.
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 text-left">
              <div>
                <span className="text-[9px] font-mono font-bold text-slate-400 block tracking-wider uppercase">
                  OPERATING HOURS
                </span>

                <span className="text-xs font-sans font-semibold text-slate-700">
                  Mon - Fri, 9AM - 5PM IST
                </span>
              </div>

              <div>
                <span className="text-[9px] font-mono font-bold text-slate-400 block tracking-wider uppercase">
                  TYPICAL REPLY
                </span>

                <span className="text-xs font-sans font-semibold text-slate-700">
                  &lt; 24 Working Hours
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 text-xs text-slate-500 leading-relaxed font-sans">
            <span className="font-extrabold text-slate-800 block mb-2 font-mono tracking-wider text-[10px] uppercase text-indigo-600">
              DID YOU KNOW?
            </span>

            Our executive functioning diagnostic tasks operate entirely in your local browser cache to preserve bandwidth. No gaming analytics are uploaded without your permission. If a module fails to load, clearing your browser site cache or refreshing solves 95% of issues!
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-7">

          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden min-h-[500px] flex flex-col justify-between">

            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 w-full h-full flex flex-col justify-center">

              <AnimatePresence mode="wait">

                {isSuccess ? (

                  <motion.div
                    key="success-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-8 w-8 text-emerald-600 animate-bounce" />
                    </div>

                    <h3 className="text-xl font-sans font-extrabold text-slate-900 tracking-tight">
                      Support Ticket Generated
                    </h3>

                    <div className="my-4 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-indigo-600 font-bold tracking-widest">
                      {ticketId}
                    </div>

                    <p className="text-slate-500 text-sm font-sans max-w-md leading-relaxed mb-8">
                      Thank you for contacting us. Your support request has been securely received and recorded. A confirmation email has been sent to your email address. Our team will review your inquiry and respond within 24 working hours.
                    </p>

                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setError(null);
                        setFieldErrors({});
                      }}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-blue-500/10 active:scale-95"
                    >
                      Submit Another Query
                    </button>
                  </motion.div>

                ) : (

                  <motion.div
                    key="active-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-sans tracking-tight flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5 text-indigo-600" />
                        <span>Support Inquiry Form</span>
                      </h3>

                      <p className="text-slate-500 text-xs font-sans mt-1">
                        Complete the fields below to transmit an encrypted support or inquiry ticket.
                      </p>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2.5 text-left text-xs text-red-600"
                      >
                        <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />

                        <span className="font-sans leading-relaxed">
                          {error}
                        </span>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* NAME */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                            Your Name <span className="text-red-500">*</span>
                          </label>

                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);

                              if (fieldErrors.name) {
                                setFieldErrors(prev => ({
                                  ...prev,
                                  name: false
                                }));
                              }
                            }}
                            placeholder="Aarav Sharma"
                            className={`w-full bg-slate-50 border ${
                              fieldErrors.name
                                ? 'border-red-500 bg-red-50/20 focus:border-red-500'
                                : 'border-slate-200 focus:border-blue-500'
                            } rounded-xl py-2.5 px-3.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all font-sans`}
                          />
                        </div>

                        {/* EMAIL */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                            Email Address <span className="text-red-500">*</span>
                          </label>

                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);

                              if (fieldErrors.email) {
                                setFieldErrors(prev => ({
                                  ...prev,
                                  email: false
                                }));
                              }
                            }}
                            placeholder="aarav@xyz.com"
                            className={`w-full bg-slate-50 border ${
                              fieldErrors.email
                                ? 'border-red-500 bg-red-50/20 focus:border-red-500'
                                : 'border-slate-200 focus:border-blue-500'
                            } rounded-xl py-2.5 px-3.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all font-sans`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* CATEGORY */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                            Inquiry Category <span className="text-red-500">*</span>
                          </label>

                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-sans appearance-none cursor-pointer"
                          >
                            <option value="bug">
                              Report Cognitive Module Bug
                            </option>

                            <option value="research">
                              Academic Research Inquiry
                            </option>

                            <option value="collaboration">
                              Institutional Collaboration
                            </option>

                            <option value="feedback">
                              General Platform Feedback
                            </option>
                          </select>
                        </div>

                        {/* AFFILIATION */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                            Institution / Affiliation{' '}
                            <span className="text-slate-400 font-medium">
                              (Optional)
                            </span>
                          </label>

                          <input
                            type="text"
                            value={affiliation}
                            onChange={(e) =>
                              setAffiliation(e.target.value)
                            }
                            placeholder="e.g. IIT Delhi, Christ University"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-sans"
                          />
                        </div>
                      </div>

                      {/* MESSAGE */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                          Detailed Message <span className="text-red-500">*</span>
                        </label>

                        <textarea
                          required
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);

                            if (fieldErrors.message) {
                              setFieldErrors(prev => ({
                                ...prev,
                                message: false
                              }));
                            }
                          }}
                          placeholder="Please formulate your details here. If reporting a module crash, please specify the game and your system browser details."
                          rows={5}
                          className={`w-full bg-slate-50 border ${
                            fieldErrors.message
                              ? 'border-red-500 bg-red-50/20 focus:border-red-500'
                              : 'border-slate-200 focus:border-blue-500'
                          } rounded-xl py-2.5 px-3.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all font-sans resize-none`}
                        />
                      </div>

                      <div className="text-[10px] text-slate-400 leading-normal text-left pt-2 font-sans">
                        By submitting this support request, you agree that our system administrators may process your contact credentials solely for resolving your inquiry. Your private records are protected.
                      </div>

                      {/* SUBMIT */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-blue-500/10 flex items-center justify-center space-x-2 active:scale-98 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />

                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>

                            <span>
                              Sending Support Ticket...
                            </span>
                          </>
                        ) : (
                          <>
                            <span>
                              Transmit Support Ticket
                            </span>

                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </button>

                    </form>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}