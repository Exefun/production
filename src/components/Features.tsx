import React from 'react';
import { ActiveTab } from '../types';
import { motion } from 'motion/react';
import { 
  Brain, Shield, RefreshCw, PlayCircle, Clipboard, Heart, 
  CheckCircle2, ArrowRight, Sparkles, MessageCircle, Mail,
  HeartHandshake, Target, LayoutGrid
} from 'lucide-react';

interface FeaturesProps {
  setActiveTab: (tab: ActiveTab, mode?: 'login' | 'register') => void;
  setSelectedSkillId?: (skillId: string | null) => void;
}

export default function Features({ setActiveTab, setSelectedSkillId }: FeaturesProps) {
  // 6 Executive Functioning Skills
  const skills = [
    {
      id: 'working-memory',
      title: 'Working Memory',
      description: 'Working memory helps hold and manipulate information in the mind to complete tasks, solve problems, and follow instructions.',
      icon: Brain,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      id: 'inhibition',
      title: 'Inhibition',
      description: 'Inhibition involves controlling impulses, delaying immediate reactions, and focusing on appropriate behaviors.',
      icon: Shield,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10 border-indigo-500/20'
    },
    {
      id: 'shifting',
      title: 'Shifting',
      description: 'Shifting is the ability to adapt to changing situations, switch between tasks, and approach problems with flexibility.',
      icon: RefreshCw,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10 border-pink-500/20'
    },
    {
      id: 'initiation',
      title: 'Initiation',
      description: 'Initiating refers to the ability to start tasks independently and take action without procrastination or external prompts.',
      icon: PlayCircle,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      id: 'planning',
      title: 'Planning',
      description: 'Planning is the ability to create a roadmap for reaching a goal, determining which tasks are most important, and deciding on the sequence of steps to complete them.',
      icon: Clipboard,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      id: 'organizing',
      title: 'Organization',
      description: 'Organization is the ability to establish and maintain order in physical and digital environments, systematically arranging workspace, files, and tasks.',
      icon: LayoutGrid,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10 border-orange-500/20'
    },
    {
      id: 'emotional-control',
      title: 'Emotional Control',
      description: 'Emotional control helps to regulate emotions and respond calmly, avoiding impulsive reactions in challenging situations.',
      icon: Heart,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10 border-rose-500/20'
    }
  ];

  // List of Exefun Features
  const featuresList = [
    {
      title: 'Brain Games',
      desc: 'Interactive games designed to challenge and improve specific cognitive abilities.'
    },
    {
      title: 'Training Programs',
      desc: 'Structured modules targeting different aspects of executive functioning.'
    },
    {
      title: 'AI-Powered Personalization',
      desc: 'Adaptive algorithms that tailor exercises and difficulty levels to individual user needs and progress.'
    },
    {
      title: 'Real-Life Application',
      desc: 'Activities that help users transfer learned skills to everyday situations.'
    }
  ];

  return (
    <div className="w-full" id="features-root">
      
      {/* 1. Executive Functioning Skills Section (Light theme) */}
      <section className="bg-slate-50 text-slate-900 py-20 sm:py-24 border-b border-slate-200/60" id="skills-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-sans font-extrabold tracking-tight text-slate-900">
              Executive Functioning Skills
            </h2>
            <p className="text-slate-600 font-sans text-base sm:text-lg leading-relaxed">
              Executive functioning skills are essential for organizing, planning, and managing tasks effectively. 
              These cognitive skills help individuals with problem-solving, time management, and decision-making, 
              which are crucial for success in daily life.
            </p>
          </div>

          {/* Grid Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.id}
                  id={skill.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-white border border-slate-200/80 hover:border-indigo-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-indigo-500/5 group text-left scroll-mt-24"
                >
                  <div className="space-y-4">
                    {/* Circle Icon Badge */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${skill.bgColor} ${skill.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {skill.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setActiveTab('auth', 'register')}
                      className="inline-flex items-center space-x-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => {
                        if (setSelectedSkillId) {
                          setSelectedSkillId(skill.id);
                        }
                        setActiveTab('skills');
                      }}
                      className="text-xs font-mono font-bold text-slate-400 hover:text-indigo-600 transition-all cursor-pointer"
                    >
                      LEARN MORE →
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. Enhance Your Working Memory with EXE FUN! (Sky Blue Banner) */}
      <section className="bg-[#E6F4FF] text-slate-900 py-16 sm:py-20" id="working-memory-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-blue-100/80 p-8 sm:p-12 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-12 space-y-6 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold text-slate-900 tracking-tight leading-tight">
                Enhance Your Working Memory with EXE FUN!
              </h2>
              <p className="text-slate-600 font-sans text-sm sm:text-base max-w-xl" style={{padding:"auto", margin:"auto", marginBottom:"20px"}}>
                Elevate your capacity to track details, focus under pressure, and sequence steps seamlessly. 
                Our scientifically modeled exercises stimulate neural pathways to lock in focus and retention.
              </p>
              <button
                onClick={() => setActiveTab('auth', 'register')}
                className="group inline-flex items-center space-x-3 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/10 transition-all cursor-pointer text-sm"
              >
                <span>Get Started</span>
                <span className="font-mono tracking-tighter opacity-80 group-hover:translate-x-1 transition-transform">────────►</span>
              </button>
            </div>

            {/* Right Illustration: Cognitive Behavioral Therapy (CBT) Feedback Triangle */}
         

          </div>
        </div>
      </section>

      {/* 3. Exefun Features Section (White theme) */}
      <section className="bg-white text-slate-900 py-20 sm:py-24" id="features-list-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content List */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-slate-900 tracking-tight">
                  Exefun <span className="text-blue-600">Features</span>
                </h2>
                <p className="text-slate-600 text-base sm:text-lg">
                  Exefun incorporates a variety of engaging components to enhance executive functioning skills:
                </p>
              </div>

              {/* Verified Checklist */}
              <div className="space-y-6">
                {featuresList.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-start space-x-3.5"
                  >
                    <div className="mt-1 shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="h-4.5 w-4.5 fill-emerald-100" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Illustration: Team Board Meeting Collaboration SVG */}
            <div className="lg:col-span-5 flex justify-center" id="collaboration-vector">
              <div className="relative w-full max-w-sm aspect-square bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 400 400" className="w-full h-full max-h-[280px]">
                  {/* Corporate/Group Board chart representation */}
                  <rect x="80" y="60" width="240" height="150" rx="16" fill="#0f172a" />
                  
                  {/* Grid Lines inside board */}
                  <line x1="100" y1="110" x2="300" y2="110" stroke="#334155" strokeWidth="1" />
                  <line x1="100" y1="150" x2="300" y2="150" stroke="#334155" strokeWidth="1" />

                  {/* Colored progress bar bars */}
                  <rect x="110" y="85" width="180" height="12" rx="6" fill="#1e293b" />
                  <rect x="110" y="85" width="130" height="12" rx="6" fill="#3b82f6" />

                  <rect x="110" y="125" width="180" height="12" rx="6" fill="#1e293b" />
                  <rect x="110" y="125" width="160" height="12" rx="6" fill="#10b981" />

                  <rect x="110" y="165" width="180" height="12" rx="6" fill="#1e293b" />
                  <rect x="110" y="165" width="90" height="12" rx="6" fill="#f59e0b" />

                  {/* Mini floating avatar dots above board representing members */}
                  <circle cx="140" cy="260" r="16" fill="#64748b" />
                  <path d="M 115 310 C 115 285, 165 285, 165 310" fill="#94a3b8" />

                  <circle cx="260" cy="260" r="16" fill="#475569" />
                  <path d="M 235 310 C 235 285, 285 285, 285 310" fill="#64748b" />

                  <circle cx="200" cy="280" r="12" fill="#3b82f6" fillOpacity="0.2" />
                  <text x="195" y="284" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#3b82f6">💡</text>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Enquire Now Section */}
      <section className="bg-[#F8FAFC] text-slate-900 py-16 sm:py-20 border-t border-slate-100" id="enquire-now-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-white border border-slate-200/60 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-hidden">
            {/* Background absolute grids */}
            <div className="absolute top-0 right-0 w-48 h-full opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-6 text-left relative z-10">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Get In Touch
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold text-slate-900 tracking-tight leading-tight">
                Enquire Now
              </h2>
              <p className="text-slate-600 font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
                Have a question or need more details? Reach out to us, and our team will get back to you 
                as soon as possible to assist with your enquiry.
              </p>
              
              <button
                onClick={() => setActiveTab('contact')}
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Enquire Now</span>
                <Mail className="h-4 w-4" />
              </button>
            </div>

            {/* Right Column: Decorative Interactive Grid mockup */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end" id="enquire-visual-grid">
              <div className="grid grid-cols-3 gap-2.5 w-full max-w-[200px]">
                {[...Array(9)].map((_, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.1, backgroundColor: '#3b82f6', borderColor: '#3b82f6' }}
                    className={`aspect-square rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center transition-all ${
                      i % 4 === 0 ? 'bg-indigo-50 border-indigo-200 text-indigo-500 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {i === 0 && <Brain className="h-5 w-5" />}
                    {i === 4 && <Sparkles className="h-5 w-5 text-amber-500" />}
                    {i === 8 && <MessageCircle className="h-5 w-5 text-blue-500" />}
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
