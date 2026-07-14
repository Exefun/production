import React from 'react';
import { motion } from 'motion/react';
import { 
  UserPlus, Gamepad2, Trophy, LineChart, ChevronRight, ArrowRight,
  Sparkles, GraduationCap, ShieldCheck, CheckCircle2, FlaskConical, TestTube
} from 'lucide-react';
import { ActiveTab } from '../types';

interface FunProcessProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function FunProcess({ setActiveTab }: FunProcessProps) {
  const steps = [
    {
      step: "Step 1",
      title: "Register & Log In",
      description: "To begin, create your account and log in to the platform. Once logged in, you will have access to various brain games tailored to improve your executive functioning.",
      icon: UserPlus,
      color: "from-blue-500 to-indigo-500",
      bgLight: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      step: "Step 2",
      title: "Select Your Game",
      description: "Choose a game that fits your level and objectives. Each game is designed to challenge and stimulate your cognitive functions, helping you improve memory, focus, and problem-solving skills.",
      icon: Gamepad2,
      color: "from-indigo-500 to-purple-500",
      bgLight: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    {
      step: "Step 3",
      title: "Play Based on Your Skill Level",
      description: "Play the game according to your current level. As you progress, the difficulty will increase, pushing you to enhance your executive functioning skills with every challenge.",
      icon: Trophy,
      color: "from-purple-500 to-pink-500",
      bgLight: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      step: "Step 4",
      title: "Track Your Progress",
      description: "Keep track of your progress through the platform. You can see how well you're performing, what skills you're improving, and which areas need more attention. This will help you stay motivated and focused on your goals.",
      icon: LineChart,
      color: "from-pink-500 to-rose-500",
      bgLight: "bg-pink-50 text-pink-600 border-pink-100",
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 py-8 sm:py-12 text-left animate-fade-in"
      id="fun-process-root"
    >
      {/* Breadcrumb / Nav bar header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <nav className="flex items-center space-x-2 text-[11px] sm:text-xs font-mono tracking-wider text-slate-600 bg-white border border-slate-200 rounded-full py-1.5 px-4 shadow-sm w-fit">
          <button 
            onClick={() => setActiveTab('home')}
            className="hover:text-blue-600 hover:underline transition-colors cursor-pointer"
          >
            HOME
          </button>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-indigo-600 font-extrabold">OUR PROCESS & DESIGN</span>
        </nav>

        <button 
          onClick={() => setActiveTab('auth')}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold font-mono transition-all shadow-md shadow-blue-500/10 cursor-pointer active:scale-95"
        >
          <span>GET STARTED NOW</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Header Block */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block text-[10px] font-mono font-extrabold tracking-widest text-blue-600 bg-blue-50 border border-blue-100/50 px-3 py-1 rounded-full mb-4">
          SKILL BUILDING PATH
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Registration & Onboarding Process
        </h1>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-sans">
          Exefun is a platform specifically designed to help you improve your Executive Functioning Skills through a series of brain games. Here's how you can get started and begin enhancing your cognitive skills step by step.
        </p>
      </div>

      {/* Part 1: Onboarding Steps (Timeline visual block) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 relative">
        {/* Subtle connecting horizontal path for desktop view */}
        <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-slate-100 -translate-y-12 -z-10" />

        {steps.map((s, idx) => {
          const IconComponent = s.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-slate-200/80 flex flex-col justify-between h-full group"
            >
              <div>
                {/* Header badge & step marker */}
                <div className="flex items-center justify-between mb-4.5">
                  <span className="text-[10px] font-mono font-extrabold tracking-wider text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                    {s.step}
                  </span>
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${s.bgLight} group-hover:scale-110`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-base font-bold text-slate-800 tracking-tight mb-2.5 font-sans group-hover:text-blue-600 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {s.description}
                </p>
              </div>

              {/* Bottom detail decorative element */}
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center text-[10px] font-mono font-bold tracking-wide text-slate-400 group-hover:text-blue-500 transition-colors">
                <span>STAGE {idx + 1} DIRECTIVES</span>
                <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Part 2: Research Design & Quasi-Experimental Paradigm */}
   

      {/* Trust & Inclusivity section */}
      <div className="mt-12 text-center max-w-xl mx-auto space-y-6">
        <div className="flex items-center justify-center space-x-1">
          <CheckCircle2 className="h-4 w-4 text-blue-500" />
          <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
            Platform Mission Statement
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans italic">
          "At Exefun, we believe that every individual can unlock their cognitive potential when learning is interactive, personalized, and enjoyable. Our platform is built with inclusivity in mind, making it suitable for diverse learners, including those with ADHD, autism spectrum disorders, and other learning differences. Join us today and experience the fun of learning while exercising your brain!"
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setActiveTab('auth')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Get Started
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className="px-6 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      </div>
    </motion.div>
  );
}
