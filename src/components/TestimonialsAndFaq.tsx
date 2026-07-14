import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, HelpCircle, ChevronDown, ChevronUp, Sparkles, Brain, Quote, CheckCircle, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface TestimonialsAndFaqProps {
  setActiveTab: (tab: ActiveTab, mode?: 'login' | 'register') => void;
}

export default function TestimonialsAndFaq({ setActiveTab }: TestimonialsAndFaqProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const testimonials = [
    {
      quote: "Balancing CBSE board exams with tough competitive test prep left me completely exhausted and easily distracted. Exefun's quick Stroop-inspired exercises and task-shifting modules have drastically cut down my cognitive transition times. My self-study sessions are far more structured now!",
      author: "Rohan Deshmukh",
      role: "Class 12 Student & IIT Aspirant, Pune",
      tag: "Academic Focus",
      avatarColor: "bg-blue-600",
      rating: 5,
    },
    {
      quote: "Since our college integrated this platform as part of the university's cognitive research program, I have been using it to boost my working memory. The sensory-friendly design makes it extremely comfortable to practice daily focus, helping me manage my ADHD symptoms naturally.",
      author: "Ananya Iyer",
      role: "First-Year BSc Student, Bengaluru",
      tag: "Student User",
      avatarColor: "bg-emerald-600",
      rating: 5,
    },
    {
      quote: "With intense board syllabus pressure, organizing tasks was a major struggle. Exefun taught me how to sequence physical study materials using active cognitive templates. I feel much more in control of my daily routines and semester prep.",
      author: "Aditya Verma",
      role: "B.Tech Undergrad, New Delhi",
      tag: "University Beta Tester",
      avatarColor: "bg-purple-600",
      rating: 5,
    }
  ];

  const faqs = [
    {
      question: "Is this platform free to use?",
      answer: "Yes, absolutely! The platform is 100% free, open-source, and accessible to everyone. There are no hidden fees, premium walls, or subscriptions."
    },
    {
      question: "Who can access and benefit from the platform?",
      answer: "It is open and available for all students, educators, and lifelong learners. Anyone looking to train, measure, or improve their core executive functioning skills is welcome to participate."
    },
    {
      question: "How is this platform connected to research?",
      answer: "This is an active academic research initiative investigating the impact of AI-enabled intervention programs on executive functioning skills in postsecondary environments. The anonymized metrics help validate modern cognitive models and support inclusive higher education."
    },
    {
      question: "How does the platform support inclusive practices?",
      answer: "We design and build according to Universal Design for Learning (UDL) guidelines. By providing sensory-friendly visuals, removing aggressive timing pressures, and incorporating personalized cognitive assistance, we accommodate the diverse learning and cognitive needs of all students."
    },
    {
      question: "Can I host this platform or contribute to its development?",
      answer: "Yes! Since the project is fully open-source, researchers and developers can explore, customize, or contribute to our responsive training algorithms to foster equity and further cognitive development in global education."
    }
  ];

  return (
    <div className="w-full bg-white text-slate-900 border-t border-slate-100" id="testimonials-faq-root">
      
      {/* Testimonials Section */}
      {/* <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="testimonials-section">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600">
            <Quote className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-[11px] font-mono font-bold tracking-wide uppercase">SUCCESS STORIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-slate-900 tracking-tight">
            Loved by Teens, Trusted by Parents & Professionals
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Read how Exefun is transforming focus, cognitive agility, and academic confidence around the world.
          </p>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-slate-50 border border-slate-100/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all relative group"
            >
              <div className="space-y-6">
               
                <div className="flex items-center space-x-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 text-amber-500 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic relative z-10 font-sans">
                  "{t.quote}"
                </p>
              </div>

            
              <div className="flex items-center space-x-3.5 mt-8 pt-6 border-t border-slate-200/60">
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-sm ${t.avatarColor}`}>
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    {t.author}
                  </h4>
                  <p className="text-xs text-slate-500 font-sans">
                    {t.role} • <span className="text-emerald-600 font-semibold">{t.tag}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="bg-slate-50 border-t border-slate-100/60 py-20 sm:py-24" id="faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* FAQ Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600">
              <HelpCircle className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-[11px] font-mono font-bold tracking-wide uppercase">FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Everything you need to know about Exefun games, framework, and usability.
            </p>
          </div>

          {/* Interactive Accordion list */}
          <div className="space-y-4" id="faq-accordion-container">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all shadow-sm hover:border-slate-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none cursor-pointer group"
                    id={`faq-btn-${idx}`}
                  >
                    <span className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors pr-4">
                      {faq.question}
                    </span>
                    <span className={`shrink-0 p-1.5 rounded-lg transition-all duration-200 ${
                      isOpen ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'
                    }`}>
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-slate-100"
                      >
                        <div className="p-5 sm:p-6 bg-slate-50/50 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Reworked academic significance and connect CTA block with aligned matching graphic */}
          <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden group">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Validity & Significance (7 Cols on desktop) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300">
                  <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-[10px] font-mono font-bold tracking-wide uppercase">SIGNIFICANCE</span>
                </div>
                
                <h4 className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight leading-tight">
                  Democratizing Cognitive Enhancement in Higher Education
                </h4>
                
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                  This academic initiative explores how adaptive, personalized tools can reinforce executive functioning skills directly in postsecondary environments. By implementing inclusive, universal design parameters, we strive to bridge cognitive gaps, support diverse learners, and validate next-generation intervention techniques.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-800/60">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Freely Accessible</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-800/60">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Empirical Verification</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => {
                      setActiveTab('contact');
                    }}
                    className="group inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl text-sm transition-all cursor-pointer shadow-md w-full sm:w-auto"
                  >
                    <span>Let's Connect</span>
                    <Sparkles className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('science');
                    }}
                    className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:text-white text-slate-300 font-bold rounded-xl text-sm transition-all cursor-pointer shadow-md w-full sm:w-auto"
                  >
                    <span>Explore the Process</span>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right Column: Beautiful Matching Neural Graphic (5 Cols on desktop) */}
              <div className="lg:col-span-5 flex items-center justify-center relative min-h-[220px]">
                <div className="w-full max-w-[280px] aspect-square relative flex items-center justify-center">
                  
                  {/* Decorative background rotating ring */}
                  <div className="absolute inset-0 border border-slate-800 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-4 border border-dashed border-slate-700/60 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                  <div className="absolute inset-10 border border-slate-800/40 rounded-full" />
                  
                  {/* Glowing central orb */}
                  <div className="absolute h-20 w-20 bg-blue-500/20 rounded-full filter blur-xl animate-pulse" />

                  {/* Interconnected Neural Nodes representation using absolute elements */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="h-10 w-10 bg-slate-950 border-2 border-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10">
                      <Brain className="h-5 w-5 text-blue-400" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 font-bold mt-1">COGNITION</span>
                  </div>

                  <div className="absolute bottom-6 left-6 flex flex-col items-center">
                    <div className="h-10 w-10 bg-slate-950 border-2 border-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/10">
                      <Sparkles className="h-5 w-5 text-indigo-400" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 font-bold mt-1">ADAPTIVE</span>
                  </div>

                  <div className="absolute bottom-6 right-6 flex flex-col items-center">
                    <div className="h-10 w-10 bg-slate-950 border-2 border-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/10">
                      <HelpCircle className="h-5 w-5 text-emerald-400" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 font-bold mt-1">INCLUSION</span>
                  </div>

                  {/* Linking SVGs lines to represent connection */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="50%" y1="20%" x2="28%" y2="72%" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                    <line x1="50%" y1="20%" x2="72%" y2="72%" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                    <line x1="28%" y1="72%" x2="72%" y2="72%" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                  </svg>
                  
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
