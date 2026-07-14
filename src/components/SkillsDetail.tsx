import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Brain, Shield, RefreshCw, PlayCircle, Clipboard, Heart, 
  ChevronRight, ArrowRight, Sparkles, CheckCircle, HelpCircle, 
  Target, Zap, AlertCircle, ArrowUpRight, CheckCircle2, LayoutGrid
} from 'lucide-react';
import { ActiveTab } from '../types';

interface SkillsDetailProps {
  setActiveTab: (tab: ActiveTab, mode?: 'login' | 'register') => void;
  selectedSkillId: string | null;
  setSelectedSkillId: (skillId: string | null) => void;
}

interface SkillDetailItem {
  id: string;
  title: string;
  laypersonTitle: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  bulletColor: string;
  scientificConcept: string;
  signsOfStrength: string[];
  signsOfStruggle: string[];
  howWeTrainIt: string;
  realLifeExample: string;
  relatedGame: {
    name: string;
    description: string;
  };
}

export default function SkillsDetail({ setActiveTab, selectedSkillId, setSelectedSkillId }: SkillsDetailProps) {
  
  // Create refs for each skill section to allow smooth scrolling
  const sectionRefs = {
    'working-memory': useRef<HTMLDivElement>(null),
    'inhibition': useRef<HTMLDivElement>(null),
    'shifting': useRef<HTMLDivElement>(null),
    'initiation': useRef<HTMLDivElement>(null),
    'planning': useRef<HTMLDivElement>(null),
    'organizing': useRef<HTMLDivElement>(null),
    'emotional-control': useRef<HTMLDivElement>(null),
  };

  const skillsList: SkillDetailItem[] = [
    {
      id: 'working-memory',
      title: 'Working Memory',
      laypersonTitle: 'The Brain\'s Mental Scratchpad',
      description: 'Working memory is the mental workbench that allows us to hold and manipulate pieces of information in our heads for short periods without losing track of what we are doing.',
      icon: Brain,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50/50',
      borderColor: 'border-blue-100',
      textColor: 'text-blue-900',
      bulletColor: 'bg-blue-500',
      scientificConcept: 'Dimension 1',
      signsOfStrength: [
        'Excellent at following multi-step instructions without being reminded.',
        'Great at mental math or remembering details from a text while reading.',
        'Able to take high-quality lecture notes while active listening.'
      ],
      signsOfStruggle: [
        'Frequently forgets what they were about to say or do next.',
        'Struggles to keep track of instructions midway through a task.',
        'Has to re-read passages multiple times because the mind "wanders".'
      ],
      howWeTrainIt: 'We use spatial sequence games and the classic N-Back pattern. This forces the brain to store a continuous sequence of locations and compare them dynamically, flexing the working memory muscle.',
      realLifeExample: 'Remembering a phone number or a mathematical formula long enough to write it down or apply it to a problem.',
      relatedGame: {
        name: 'Jigsaw 9',
        description: 'Challenge your working memory by matching items and reconstructing structured puzzle arrays.'
      }
    },
    {
      id: 'inhibition',
      title: 'Inhibition',
      laypersonTitle: 'Impulse Control ("The Brain\'s Brakes")',
      description: 'Inhibition is the power to resist impulses, block out distractions, and stop actions before they happen. It represents our primary mechanism of self-control.',
      icon: Shield,
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-50/50',
      borderColor: 'border-indigo-100',
      textColor: 'text-indigo-900',
      bulletColor: 'bg-indigo-500',
      scientificConcept: 'Dimension 2',
      signsOfStrength: [
        'Can stay deeply focused on studies even with notifications buzzing nearby.',
        'Thinks through consequences before reacting or speaking.',
        'Able to wait patiently for their turn during group projects.'
      ],
      signsOfStruggle: [
        'Easily distracted by the slightest noise or visual trigger.',
        'Prone to answering impulsively or making quick, careless mistakes on tests.',
        'Finds it highly difficult to resist immediate rewards in favor of long-term goals.'
      ],
      howWeTrainIt: 'We utilize modified Stroop and Go/No-Go paradigms. These activities train the brain to suppress automatic actions (like reading the text) and instead perform controlled choices (like identifying the font color).',
      realLifeExample: 'Keeping your eyes on your textbook and resisting the urge to check social media when your phone vibrates.',
      relatedGame: {
        name: 'Ant Escape',
        description: 'Test and upgrade your executive inhibition filters by suppressing distractions to navigate safe exit paths.'
      }
    },
    {
      id: 'shifting',
      title: 'Shifting',
      laypersonTitle: 'Cognitive Flexibility ("Mental Pivoting")',
      description: 'Shifting is our capacity to transition smoothly between different rules, tasks, or perspectives. It represents how adaptable and open we are to change.',
      icon: RefreshCw,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50/50',
      borderColor: 'border-pink-100',
      textColor: 'text-pink-900',
      bulletColor: 'bg-pink-500',
      scientificConcept: 'Dimension 3',
      signsOfStrength: [
        'Transitions easily between different subjects without mental fatigue.',
        'Adjusts easily to sudden changes in plans, timetables, or routines.',
        'Able to solve problems in multiple ways if the first attempt fails.'
      ],
      signsOfStruggle: [
        'Gets stressed or highly anxious when a daily plan or expectation changes.',
        'Struggles when moving from one task to another (gets "stuck").',
        'Persists with ineffective methods even after realizing they are not working.'
      ],
      howWeTrainIt: 'Through rule-switching puzzles where matching guidelines transition instantly and without warning. This encourages the prefrontal cortex to adapt and shift neural resources quickly.',
      realLifeExample: 'You are sitting quitely in class, expecting a normal lecture. Suddenly, the teacher announces a susprise test. Your brain has to quickly switch from a relaxed mood into deep focus mode.',
      relatedGame: {
        name: 'Color Rush',
        description: 'Flex your cognitive speed and switch rule sets dynamically under high-paced environments.'
      }
    },
    {
      id: 'initiation',
      title: 'Initiation',
      laypersonTitle: 'Procrastination Buster ("The Self-Starter")',
      description: 'Initiation is the ability to begin a task, project, or assignment independently and on time without external help.',
      icon: PlayCircle,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50/50',
      borderColor: 'border-emerald-100',
      textColor: 'text-emerald-900',
      bulletColor: 'bg-emerald-500',
      scientificConcept: 'Dimension 4',
      signsOfStrength: [
        'Starts homework on time without needing parents or teachers to remind them.',
        'Breaks down large school assignments and takes the very first step right away.',
        'Proactively begins chores or studies before they become emergencies.'
      ],
      signsOfStruggle: [
        'Frequently waits until the night before a huge deadline to start working.',
        'Struggles with chronic procrastination, feeling "frozen" when looking at projects.',
        'Spends a massive amount of time preparing or worrying instead of actually starting.'
      ],
      howWeTrainIt: 'We train initiation using structured game starts, timed reaction prompts, and clean breakdown steps that teach the brain to transition from rest state to active state effortlessly.',
      realLifeExample: 'Starting your college assignment on your own, without waiting for your teacher or parents to remind you.',
      relatedGame: {
        name: 'Crystal Miner',
        description: 'Overcome cognitive inertia by initiating and executing resource gathering operations with prompt reaction speeds.'
      }
    },
    {
      id: 'planning',
      title: 'Planning',
      laypersonTitle: 'Goal Setting & Action Strategy',
      description: 'Planning is the ability to create a roadmap for reaching a goal, determining which tasks are most important, and deciding on the sequence of steps to complete them.',
      icon: Clipboard,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50/50',
      borderColor: 'border-amber-100',
      textColor: 'text-amber-900',
      bulletColor: 'bg-amber-500',
      scientificConcept: 'Dimension 5',
      signsOfStrength: [
        'Creates logical, step-by-step plans for long-term class projects.',
        'Accurately predicts how much time is needed to prepare for exams.',
        'Identifies potential obstacles in a project plan before starting.'
      ],
      signsOfStruggle: [
        'Gets overwhelmed by big tasks because they don\'t know where to start.',
        'Frequently underestimates project time, resulting in last-minute panics.',
        'Completes tasks in a disorganized sequence, wasting valuable effort.'
      ],
      howWeTrainIt: 'Using predictive pathfinding grids and structured goal-sequencing tasks. These exercises reward looking multiple steps ahead and planning a movement sequence before inputting answers.',
      realLifeExample: 'Mapping out a revision timetable three weeks in advance of final exams and allocating specific days to different subjects.',
      relatedGame: {
        name: 'Perfect Tension',
        description: 'Hone your predictive capacity by mapping out strategic steps and setting high-precision sequential milestones.'
      }
    },
    {
      id: 'organizing',
      title: 'Organization',
      laypersonTitle: 'Workspace & Resource Coordination',
      description: 'Organizing is the ability to establish and maintain order in physical and digital environments, as well as keeping track of materials, ideas, and tasks systematically.',
      icon: LayoutGrid,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50/50',
      borderColor: 'border-orange-100',
      textColor: 'text-orange-900',
      bulletColor: 'bg-orange-500',
      scientificConcept: 'Dimension 6',
      signsOfStrength: [
        'Keeps a clean study desk and systematically categorized digital folders.',
        'Instantly locates files, sheets, notes, and login credentials when needed.',
        'Successfully categorizes complex data into logical, neat structures.'
      ],
      signsOfStruggle: [
        'Struggles with messy computer desktops and losing physical handouts.',
        'Spends a massive amount of time looking for lost items or logins.',
        'Struggles to keep study materials organized by subject or importance.'
      ],
      howWeTrainIt: 'Through systematic sorting matrices and dynamic categorizing games. These challenges require grouping random elements based on rules, sharpening categorization speed and taxonomic sorting habits.',
      realLifeExample: 'Categorizing class documents into folders and maintaining a clean desktop that allows instant retrieval of important resources.',
      relatedGame: {
        name: 'Rain of Derived words',
        description: 'Train resource coordination and categorical order by sorting incoming terminologies into systematic mental cabinets.'
      }
    },
    {
      id: 'emotional-control',
      title: 'Emotional Control',
      laypersonTitle: 'Regulation under Pressure',
      description: 'Emotional control is the capacity to regulate feelings and mood, allowing us to perform and work toward our goals without being disrupted by frustration or anxiety.',
      icon: Heart,
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50/50',
      borderColor: 'border-rose-100',
      textColor: 'text-rose-900',
      bulletColor: 'bg-rose-500',
      scientificConcept: 'Dimension 7',
      signsOfStrength: [
        'Keeps calm and continues trying when faced with highly challenging questions.',
        'Accepts constructive feedback on essays or tests without feeling defeated.',
        'Maintains a steady, focused approach during timed test environments.'
      ],
      signsOfStruggle: [
        'Gets extremely angry or easily bursts into tears when an exercise is tough.',
        'Rushes through tasks carelessly when they start feeling stressed or behind.',
        'Avoids challenging subjects or quizzes entirely to prevent feelings of failure.'
      ],
      howWeTrainIt: 'We enhance emotional regulation capability through targeted video lessons. These modules teach you simple, everyday strategies to lower stress, manage anger, and keep a calm mind during dificult situations.',
      realLifeExample: 'Taking a deep breath and systematically working through a difficult math problem during an exam instead of panicking.',
      relatedGame: {
        name: 'Videos on: 1. Anxiety, 2. Anger',
        description: 'Learn physiological pacing and stress regulation strategies to maintain cognitive stability under extreme academic pressure.'
      }
    }
  ];

  // Perform smooth scroll to target section when selectedSkillId changes
  useEffect(() => {
    if (selectedSkillId) {
      const ref = sectionRefs[selectedSkillId as keyof typeof sectionRefs];
      if (ref && ref.current) {
        setTimeout(() => {
          ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Highlight the section briefly
          ref.current?.classList.add('ring-4', 'ring-indigo-600/25', 'rounded-2xl', 'transition-all', 'duration-500');
          setTimeout(() => {
            ref.current?.classList.remove('ring-4', 'ring-indigo-600/25');
          }, 2000);
        }, 300);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedSkillId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 py-8 sm:py-12 text-left animate-fade-in"
      id="skills-detail-root"
    >
      {/* Navigation Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <nav className="flex items-center space-x-2 text-[11px] sm:text-xs font-mono tracking-wider text-slate-600 bg-white border border-slate-200 rounded-full py-1.5 px-4 shadow-sm w-fit">
          <button 
            onClick={() => {
              setSelectedSkillId(null);
              setActiveTab('home');
            }}
            className="hover:text-blue-600 hover:underline transition-colors cursor-pointer"
          >
            HOME
          </button>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-indigo-600 font-extrabold">EXECUTIVE SKILLS SITEMAP</span>
        </nav>

        <button 
          onClick={() => setActiveTab('auth', 'register')}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold font-mono transition-all shadow-md shadow-blue-500/10 cursor-pointer active:scale-95"
        >
          <span>JOIN THE COGNITIVE TRIAL</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block text-[10px] font-mono font-extrabold tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-3 py-1 rounded-full mb-4">
          CORE COGNITIVE CAPABILITIES
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          The 7 Dimensions of Executive Functioning
        </h1>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-sans">
          Executive functions are the command center of the brain—acting as the control tower for managing assignments, paying attention, staying organized, and keeping calm under exam pressure. Learn about each skill in simple terms below.
        </p>
      </div>

      {/* Sticky Quick Index Navigation Bar */}
      <div className="sticky top-16 z-30 bg-slate-50/90 backdrop-blur-md border border-slate-200/60 rounded-2xl p-2.5 mb-16 shadow-sm hidden md:flex items-center justify-between gap-2">
        <span className="text-[10px] font-mono font-bold text-slate-400 px-3 uppercase shrink-0">
          QUICK JUMP:
        </span>
        <div className="flex flex-wrap gap-1 items-center">
          {skillsList.map((skill) => {
            const isCurrent = selectedSkillId === skill.id;
            const Icon = skill.icon;
            return (
              <button
                key={skill.id}
                onClick={() => setSelectedSkillId(skill.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isCurrent 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isCurrent ? 'text-white' : 'text-slate-400'}`} />
                <span>{skill.title}</span>
              </button>
            );
          })}
        </div>
        <button
          onClick={() => {
            setSelectedSkillId(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-[10px] font-mono font-bold text-slate-400 hover:text-blue-600 px-3 transition-colors shrink-0"
        >
          TOP ↑
        </button>
      </div>

      {/* Main List of Skills */}
      <div className="space-y-16">
        {skillsList.map((skill) => {
          const Icon = skill.icon;
          const isHighlighted = selectedSkillId === skill.id;

          return (
            <div
              key={skill.id}
              ref={sectionRefs[skill.id as keyof typeof sectionRefs]}
              className={`bg-white border ${
                isHighlighted ? 'border-indigo-300 shadow-md ring-2 ring-indigo-50' : 'border-slate-200'
              } rounded-2xl p-6 sm:p-10 transition-all duration-300 scroll-mt-24`}
            >
              {/* Header block */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-start space-x-4">
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-tr ${skill.color} text-white shadow-sm shrink-0`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100/50 uppercase tracking-wide">
                      {skill.scientificConcept}
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900 font-sans tracking-tight">
                      {skill.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 italic font-sans">
                      "{skill.laypersonTitle}"
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('auth', 'register')}
                  className={`inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer active:scale-95 shrink-0 self-start md:self-center font-mono`}
                >
                  <span>GET STARTED TRAINING</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
                
                {/* Description and real-world impact (Layman friendly) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">What it is</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-sans">
                      {skill.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">Real-world Example</h3>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs sm:text-sm text-slate-600 italic">
                      💡 {skill.realLifeExample}
                    </div>
                  </div>

                  {/* Scientific Gameplay description */}
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100/60 rounded-xl p-5 space-y-3">
                    <div className="flex items-center space-x-2 text-indigo-900 font-bold text-xs sm:text-sm">
                      <Zap className="h-4 w-4 text-indigo-600 shrink-0" />
                      <span>How Exefun Trains This Skill</span>
                    </div>
                    <p className="text-xs text-indigo-950 leading-relaxed font-sans">
                      {skill.howWeTrainIt}
                    </p>
                    <div className="mt-2 text-xs font-bold font-sans text-slate-500 bg-white border border-slate-100/80 p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <span className="block text-[9px] font-mono text-slate-400 uppercase">Target Activity Module</span>
                        <span className="text-slate-800">{skill.relatedGame.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Layperson Indicators Column */}
                <div className="lg:col-span-5 space-y-6 bg-slate-50/40 border border-slate-100 p-6 rounded-2xl">
                  
                  {/* Strength Indicators */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800 font-sans">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>Signs of Strength</span>
                    </div>
                    <ul className="space-y-2">
                      {skill.signsOfStrength.map((sign, index) => (
                        <li key={index} className="flex items-start space-x-2 text-xs text-slate-600 leading-normal">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                          <span>{sign}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Struggle Indicators */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-800 font-sans">
                      <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
                      <span>Signs of Struggle</span>
                    </div>
                    <ul className="space-y-2">
                      {skill.signsOfStruggle.map((sign, index) => (
                        <li key={index} className="flex items-start space-x-2 text-xs text-slate-600 leading-normal">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                          <span>{sign}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Trial Banner */}
      <div className="mt-16 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/25 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative max-w-2xl mx-auto space-y-6">
          <span className="text-[10px] font-mono font-bold text-indigo-400 tracking-widest uppercase block">
            READY TO TRY TRAINING?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-sans tracking-tight">
            Start testing your Executive functioning skills today
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            Create your account to measure your personal baseline pre-test status and unlock personalized, gamified brain training activities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('auth', 'register')}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-md shadow-blue-600/20 active:scale-98 font-mono"
            >
              TAKE THE PRE-TEST ASSESSMENT
            </button>
            <button
              onClick={() => {
                setSelectedSkillId(null);
                setActiveTab('home');
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900/60 hover:bg-slate-900 text-slate-300 border border-slate-800 hover:text-white font-bold text-sm rounded-xl transition-all cursor-pointer font-mono"
            >
              BACK TO HOME
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
