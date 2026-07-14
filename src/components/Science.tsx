import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, ChevronRight, ArrowRight, Sparkles, BookOpen, 
  Activity, CheckCircle2, RotateCcw, ArrowRightLeft,
  Eye, Calendar, ClipboardCheck, Compass, Sliders, ShieldCheck
} from 'lucide-react';
import { ActiveTab } from '../types';

interface ScienceProps {
  setActiveTab: (tab: ActiveTab) => void;
}

interface CognitivePillar {
  id: string;
  name: string;
  laypersonName: string;
  definition: string;
  realLifeImpact: string;
  howWeTrainIt: string;
  color: string;
}

export default function Science({ setActiveTab }: ScienceProps) {
  // Active state for 8 Core Pillars
  const [selectedPillar, setSelectedPillar] = useState<string>('inhibition');

  // Interactive Research Simulator State
  const [playFrequency, setPlayFrequency] = useState<'low' | 'medium' | 'high'>('high');
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState<boolean>(true);
  const [scaffoldingEnabled, setScaffoldingEnabled] = useState<boolean>(true);

  // 7 Cognitive Pillars from research specifications
  const cognitivePillars: CognitivePillar[] = [
    {
      id: 'working_memory',
      name: 'Working Memory',
      laypersonName: 'Mental Scratchpad',
      definition: 'Holding, tracking, and updating pieces of information in mind while actively working on a task.',
      realLifeImpact: 'Used when taking lecture notes, following multi-step scientific instructions, or keeping mental track of ideas while writing an essay.',
      howWeTrainIt: 'Trained using sequence recall challenges (like N-Back spatial patterns) that require remembering earlier positions as new ones appear.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'inhibition',
      name: 'Inhibition',
      laypersonName: 'Impulse Control ("The Brain’s Brakes")',
      definition: 'The ability to stop, resist immediate urges, and think before acting or speaking.',
      realLifeImpact: 'Helps students resist distractions (like phone alerts), stay focused on class material, and ignore irrelevant impulses during homework.',
      howWeTrainIt: 'Trained using tasks where the brain must override an automatic response—such as focusing on actual text color while ignoring the spelt-out word.',
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 'shifting',
      name: 'Shifting',
      laypersonName: 'Cognitive Flexibility ("Mental Pivoting")',
      definition: 'The mental capability to switch smoothly between different tasks, perspectives, or sets of rules.',
      realLifeImpact: 'Crucial for adapting to sudden timetable changes, transitioning between different academic subjects, or correcting errors once new info is provided.',
      howWeTrainIt: 'Trained through rapid rule-switching activities, where the matching criteria changes dynamically from color to shape or size.',
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: 'initiation',
      name: 'Initiation',
      laypersonName: 'Task Starter ("The Procrastination Buster")',
      definition: 'The ability to begin a task, project, or homework independently and on time without procrastination.',
      realLifeImpact: 'Enables starting homework immediately after school, breaking down large assignments, and avoiding last-minute cramming sessions.',
      howWeTrainIt: 'Trained through reaction speed triggers and dynamic action prompts that challenge and lower cognitive start resistance.',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'planning',
      name: 'Planning',
      laypersonName: 'Goal Setting & Preparation',
      definition: 'The ability to create structural steps to reach a goal and decide what is most important to focus on.',
      realLifeImpact: 'Enables drafting an essay outline, scheduling project checkpoints, or keeping an accurate academic calendar.',
      howWeTrainIt: 'Trained using spatial maze-building, puzzle-solving games, and task sequencing exercises that reward looking multiple steps ahead.',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'organizing',
      name: 'Organization',
      laypersonName: 'Workspace Coordination',
      definition: 'Establishing and maintaining clean, logical order in physical or digital workspaces, folders, and resources.',
      realLifeImpact: 'Keeps files sorted, avoids messy computer desktops, and ensures study sheets, notes, and logins are instantly retrievable.',
      howWeTrainIt: 'Trained via systematic categorized storage systems, cleanly arranged interface modules, and custom task-sorting games.',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'emotional_control',
      name: 'Emotional Control',
      laypersonName: 'Mood Regulation',
      definition: 'The capacity to manage feelings and impulses, allowing goals to be achieved without emotional disruptions.',
      realLifeImpact: 'Allows students to cope with tough exam pressure, keep calm after receiving feedback, and push through academic frustration without giving up.',
      howWeTrainIt: 'Trained using micro-feedback systems that reward calm, paced, and steady response rhythms rather than erratic panicking.',
      color: 'from-fuchsia-500 to-pink-600'
    }
  ];

  // Layperson Simulator Logic representing the Pre-Test -> Treatment -> Post-Test
  const runResearchProjection = () => {
    // Baseline pre-test scores are generally low-to-moderate
    const preTestScore = 42;
    
    // Improvement multipliers based on treatment variables
    let gainMultiplier = 0;
    if (playFrequency === 'low') gainMultiplier += 5;
    else if (playFrequency === 'medium') gainMultiplier += 18;
    else if (playFrequency === 'high') gainMultiplier += 34;

    if (adaptiveDifficulty) gainMultiplier += 10;
    if (scaffoldingEnabled) gainMultiplier += 8;

    const postTestScore = Math.min(preTestScore + gainMultiplier, 96);
    const growthPercent = Math.round(((postTestScore - preTestScore) / preTestScore) * 100);

    return {
      preTestScore,
      postTestScore,
      growthPercent,
      insightMessage: growthPercent > 80 
        ? "Excellent growth! High consistency combined with adaptive, gamified training shows the strongest potential for positive neural adaptation."
        : growthPercent > 40
          ? "Steady progress. Adaptive matching helps push the brain’s comfort zone, though high frequency is key to lock in durable pathways."
          : "Minimal change. Spacing exercises too far apart makes it hard for the brain to build strong, automated neural habits."
    };
  };

  const projection = runResearchProjection();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto px-4 py-8 sm:py-12 text-left animate-fade-in"
      id="science-root"
    >
      {/* Navigation Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <nav className="flex items-center space-x-2 text-[11px] sm:text-xs font-mono tracking-wider text-slate-600 bg-white border border-slate-200 rounded-full py-1.5 px-4 shadow-sm w-fit">
          <button 
            onClick={() => setActiveTab('home')}
            className="hover:text-blue-600 hover:underline transition-colors cursor-pointer"
          >
            HOME
          </button>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-indigo-600 font-extrabold">THE APPROACH</span>
        </nav>

        <button 
          onClick={() => setActiveTab('auth')}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold font-mono transition-all shadow-md shadow-blue-500/10 cursor-pointer active:scale-95"
        >
          <span>TEST YOUR STATUS</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Main Header Block */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block text-[10px] font-mono font-extrabold tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-3 py-1 rounded-full mb-4">
          SIMPLE & SYSTEMATIC
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          How Cognitive Training Works
        </h1>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-sans">
          Our research is based on a straightforward principle: just like a muscle, the brain can be trained to improve its focus, self-regulation, and organization. Here is how our research evaluates and builds these critical skills.
        </p>
      </div>

      {/* Section 1: The Research Framework (Quasi-Experimental Design) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm mb-16">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-blue-500/10 p-2 text-blue-600 rounded-lg shrink-0">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[9px] font-mono font-bold text-blue-500 uppercase tracking-widest block">
              RESEARCH METHODOLOGY
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 font-sans tracking-tight">
              Pre-Test, Intervention, and Post-Test Design
            </h2>
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          To measure how effective our intervention program is, our research uses a <strong>Quasi-Experimental design</strong>. We track progress across three clear stages, verifying the exact cognitive gains for each participating student:
        </p>

        {/* Dynamic Visual Journey Map */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Connector Arrows for Desktop */}
          <div className="hidden md:block absolute top-[44px] left-[28%] w-[12%] h-[2px] bg-slate-200" />
          <div className="hidden md:block absolute top-[44px] left-[61%] w-[12%] h-[2px] bg-slate-200" />

          {/* Step 1: Pre-Test */}
          <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-5 relative">
            <div className="flex items-center space-x-3 mb-3">
              <span className="h-8 w-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs font-mono">
                01
              </span>
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">Pre-Test</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              We measure the student's initial cognitive status across the 7 executive functioning skills to establish an accurate baseline.
            </p>
            <div className="mt-3.5 inline-flex items-center space-x-1 text-[10px] font-semibold text-slate-500 bg-slate-200/50 px-2.5 py-1 rounded-full">
              <ClipboardCheck className="h-3 w-3" />
              <span>Pre Intervention Status</span>
            </div>
          </div>

          {/* Step 2: Treatment */}
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 relative">
            <div className="flex items-center space-x-3 mb-3">
              <span className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs font-mono">
                02
              </span>
              <h3 className="font-bold text-indigo-900 text-sm tracking-tight">The AI Intervention</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Students play personalized, gamified training exercises built with adaptive difficulty and visual scaffolding to stimulate growth.
            </p>
            <div className="mt-3.5 inline-flex items-center space-x-1 text-[10px] font-semibold text-indigo-600 bg-indigo-100/50 px-2.5 py-1 rounded-full">
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>Intervention Implementation</span>
            </div>
          </div>

          {/* Step 3: Post-Test */}
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5 relative">
            <div className="flex items-center space-x-3 mb-3">
              <span className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs font-mono">
                03
              </span>
              <h3 className="font-bold text-emerald-900 text-sm tracking-tight">Post-Test</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              After the training phase, students retake the cognitive assessment to calculate the exact progress and check real-world outcomes.
            </p>
            <div className="mt-3.5 inline-flex items-center space-x-1 text-[10px] font-semibold text-emerald-600 bg-emerald-100/50 px-2.5 py-1 rounded-full">
              <Eye className="h-3 w-3" />
              <span>Post-Intervention Status</span>
            </div>
          </div>

        </div>
      </div>

      {/* Section 2: The 7 Cognitive Pillars We Train */}
 

      {/* Section 3: Layperson Interactive Research Simulator */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-500 p-2 rounded-lg text-white">
                <Sliders className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">
                  INTERACTIVE LAB
                </span>
                <h2 className="text-lg font-extrabold tracking-tight font-sans">
                  The Intervention Effectiveness
                </h2>
              </div>
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              Simulate pre-test and post-test scores
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Control Panel (Layperson Variables) */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Adjust Program Parameters
              </h3>

              {/* Var 1: Practice Frequency */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">How often do they play?</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'low', label: '1x / week' },
                    { id: 'medium', label: '3x / week' },
                    { id: 'high', label: 'Daily' }
                  ].map((freq) => (
                    <button
                      key={freq.id}
                      onClick={() => setPlayFrequency(freq.id as any)}
                      className={`py-2 px-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        playFrequency === freq.id 
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {freq.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Var 2: Adaptive Matching Toggle */}
              <div className="flex items-center justify-between bg-slate-950 border border-slate-800 p-3 rounded-xl">
                <div className="space-y-0.5">
                  <span className="block text-xs font-bold text-slate-300">Adaptive Matching</span>
                  <span className="block text-[10px] text-slate-500">Games get easier/harder automatically</span>
                </div>
                <button
                  onClick={() => setAdaptiveDifficulty(!adaptiveDifficulty)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none cursor-pointer ${
                    adaptiveDifficulty ? 'bg-indigo-600' : 'bg-slate-800'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    adaptiveDifficulty ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Var 3: Scaffolding Toggle */}
              <div className="flex items-center justify-between bg-slate-950 border border-slate-800 p-3 rounded-xl">
                <div className="space-y-0.5">
                  <span className="block text-xs font-bold text-slate-300">Motivation Scaffolding</span>
                  <span className="block text-[10px] text-slate-500">Points, badges & friendly rewards</span>
                </div>
                <button
                  onClick={() => setScaffoldingEnabled(!scaffoldingEnabled)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none cursor-pointer ${
                    scaffoldingEnabled ? 'bg-indigo-600' : 'bg-slate-800'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    scaffoldingEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <button
                onClick={() => {
                  setPlayFrequency('high');
                  setAdaptiveDifficulty(true);
                  setScaffoldingEnabled(true);
                }}
                className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset to optimal setup</span>
              </button>
            </div>

            {/* Results Display (Layperson Charts) */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  STUDY CASE PROJECTION
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Comparing bpre-test and post-test scores, after the implementation of intervention programme.
                </p>
              </div>

              {/* Graphical representation of pre vs post */}
              <div className="grid grid-cols-2 gap-4 py-6 text-center items-end h-36">
                
                {/* Pre-Test Column */}
                <div className="space-y-2">
                  <div className="text-xs text-slate-400 font-mono">Pre-Test</div>
                  <div className="relative bg-slate-900 rounded-lg h-24 flex items-end justify-center overflow-hidden border border-slate-800">
                    <motion.div 
                      className="w-12 bg-slate-400/40 rounded-t"
                      animate={{ height: `${projection.preTestScore}%` }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="absolute bottom-1 font-mono text-xs font-bold">{projection.preTestScore}</span>
                  </div>
                </div>

                {/* Post-Test Column */}
                <div className="space-y-2">
                  <div className="text-xs text-indigo-400 font-mono">Post-Test</div>
                  <div className="relative bg-slate-900 rounded-lg h-24 flex items-end justify-center overflow-hidden border border-slate-800">
                    <motion.div 
                      className="w-12 bg-indigo-500 rounded-t"
                      animate={{ height: `${projection.postTestScore}%` }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="absolute bottom-1 font-mono text-xs font-bold text-indigo-300">{projection.postTestScore}</span>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-300">Target Growth</span>
                  <span className="text-xs font-bold font-mono text-emerald-400">+{projection.growthPercent}% improvement</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                  "{projection.insightMessage}"
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Safety & Inclusivity Callout */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-4 mb-12">
        <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-emerald-600 shrink-0">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-slate-900 text-sm tracking-tight font-sans">Layperson Friendly & Completely Inclusive</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Our app does not require complex medical explanations, diagnoses, or brain scanning equipment. The cognitive training is non-invasive, accessible right from a web browser, and adapts instantly to support different learning styles and cognitive backgrounds.
          </p>
        </div>
      </div>

      {/* Action CTA Box */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative max-w-2xl mx-auto space-y-6">
          <span className="text-[9px] font-mono font-bold text-indigo-400 tracking-widest uppercase block">
            PARTICIPATE IN THE COGNITIVE TRIAL
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-sans tracking-tight">
            See the progress for yourself
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            Get started by trying our basic baseline games. Check your performance, and see how cognitive training can upgrade your daily focus and executive functions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('auth')}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-md shadow-blue-600/20 active:scale-98 font-mono"
            >
              TRY THE PRE-TEST
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900/60 hover:bg-slate-900 text-slate-300 border border-slate-800 hover:text-white font-bold text-sm rounded-xl transition-all cursor-pointer font-mono"
            >
              LEARN OUR TRAINING PROCESS
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
