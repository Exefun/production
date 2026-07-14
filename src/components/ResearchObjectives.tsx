import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, Brain, Target, Compass, BookOpen, 
  ArrowLeft, ChevronRight, Cpu, Layers, Sparkles 
} from 'lucide-react';
import { ActiveTab } from '../types';
import ResearchTeam from './ResearchTeam';

interface ResearchObjectivesProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function ResearchObjectives({ setActiveTab }: ResearchObjectivesProps) {
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
          <span className="text-indigo-600 font-extrabold">PROGRAMME FRAMEWORK</span>
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-10 pb-8 border-b border-slate-100">
          <div className="bg-indigo-500/10 p-3 rounded-2xl mb-4 border border-indigo-500/20 text-indigo-600">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
            Pogramme Relevance, Features & Objectives
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-sans mt-3 max-w-2xl leading-relaxed">
            Helping learners to build strong cognitive habits through personalized, accessible learning path.
          </p>
        </div>

        {/* Foundations Grid */}
        <div className="space-y-10 font-sans text-slate-600">
          
          {/* Section 1: Study Significance */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2.5">
              <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
                <Compass className="h-4.5 w-4.5" />
              </span>
              <span>1. Relevance of the Programme</span>
            </h2>
            <div className="pl-2 space-y-3 text-sm sm:text-base leading-relaxed">
              <p>
               In today's academic environment, standard teaching methods often overlook the critical role that executive functioning skills play in student life. The Exefun programme introduces personalized, AI-driven cognitive intervention tailored to support diverse learners, build inclusive learning spaces, and address educational inequities.
              </p>
              <p className="text-slate-500 text-sm">
                By utilizing real-time data insights and learning paths, this initiative goes beyond a rigid, one-size fits all approach. The programme directly addresses the practical need for an intelligent framework that guides and supports cognitive development in Higher Education.
              </p>
            </div>
          </div>

          {/* Section 2: Core Conceptual Definitions */}
          <div className="space-y-6 pt-6 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2.5">
              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100">
                <BookOpen className="h-4.5 w-4.5" />
              </span>
              <span>2. Theoretical Core & Features</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Concept A */}
              <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-5 space-y-3 hover:border-slate-200 transition-all">
                <div className="flex items-center space-x-2 text-indigo-600">
                  <Cpu className="h-4.5 w-4.5" />
                  <h3 className="font-bold text-slate-900 text-sm tracking-tight">Responsive AI Guidance</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Innovative systems that utilize machine learning algorithms and diagnostics to monitor cognitive performance. These tools adjust instructional challenge in real-time, delivering targeted feedback tailored to individual student capabilities.
                </p>
              </div>

              {/* Concept B */}
              <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-5 space-y-3 hover:border-slate-200 transition-all">
                <div className="flex items-center space-x-2 text-blue-600">
                  <Brain className="h-4.5 w-4.5" />
                  <h3 className="font-bold text-slate-900 text-sm tracking-tight">Executive Functions</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Targeting the core cognitive skills necessary for self-management and goal achievement. The programme systematically trains key areas, including working memory, inhibition, shifting, initiation, planning, organization and emotional control.
                </p>
              </div>

              {/* Concept C */}
              <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-5 space-y-3 hover:border-slate-200 transition-all">
                <div className="flex items-center space-x-2 text-emerald-600">
                  <Layers className="h-4.5 w-4.5" />
                  <h3 className="font-bold text-slate-900 text-sm tracking-tight">Universal Design for Learning</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Creating learning environments optimized for accessibility and equity. The framework ensures the platform offers multi-modal engagement and support paths for students with varying cognitive styles.
                </p>
              </div>

            </div>
          </div>

          {/* Section 3: Research Objectives */}
          <div className="space-y-6 pt-6 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2.5">
              <span className="p-1.5 bg-pink-50 text-pink-600 rounded-lg border border-pink-100">
                <Target className="h-4.5 w-4.5" />
              </span>
              <span>3. Objectives</span>
            </h2>

            <div className="space-y-4">
              {/* Objective A */}
              <div className="bg-slate-50/40 border border-slate-100 rounded-xl p-5 hover:border-slate-200 transition-all flex gap-4">
                <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-blue-600 font-bold text-sm border border-blue-100">
                  a
                </span>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-sm">AI Integration</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    To provide an interactive, AI-driven digital environment that aligns cognitive exercises with individual user needs.
                  </p>
                </div>
              </div>

              {/* Objective B with sub-items */}
              <div className="bg-slate-50/40 border border-slate-100 rounded-xl p-5 hover:border-slate-200 transition-all space-y-4">
                <div className="flex gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm border border-indigo-100">
                    b
                  </span>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-sm">Purpose</h4>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                     The primary objective is to enhance the core dimensions of Executive Functioning (EF) skills essential for student's daily life.
                    </p>
                  </div>
                </div>

                {/* Sub-objectives list */}
                <div className="pl-4 sm:pl-12 border-l-2 border-indigo-100/70 space-y-3.5 pt-1">
                  <div className="text-[10px] font-mono font-bold tracking-wider text-indigo-500 uppercase pb-1">
                   Specifically, the programme aims to:
                  </div>
                  
                  <div className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <p className="text-slate-600">
                      Improve Working Memory capacity which involves holding and manipulating information in mind to complete tasks.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <p className="text-slate-600">
                      Strengthen inhibition to reduce impulsive responses.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <p className="text-slate-600">
                      Enhance Shifting skills which encompasses the flexibility to transition between tasks or mental states.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <p className="text-slate-600">
                      Develop Initiation skills to help students start tasks independently.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <p className="text-slate-600">
                      Improve Planning and strategic thinking.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <p className="text-slate-600">
                      Foster Organization skills through categorization tasks.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <p className="text-slate-600">
                     Promote Emotional Control and self regulation regarding anxiety and anger.
                    </p>
                  </div>

                
                </div>
              </div>

              {/* Objective E */}
              <div className="bg-slate-50/40 border border-slate-100 rounded-xl p-5 hover:border-slate-200 transition-all flex gap-4">
                <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-pink-50 text-pink-600 font-bold text-sm border border-pink-100">
                  c
                </span>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-sm">Continuous Optimization</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    To actively integrate feedback from students and educators, ensuring the platform consistently evolves to meet real-world academic needs.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 text-xs sm:text-sm text-slate-500 italic">
            This study is committed to Universal Design for Learning (UDL) guidelines, ensuring that our software remains completely inclusive, barrier-free, and adaptive.
          </div>
        </div>
      </div>

      {/* Research Advisory Panel Team Section */}
      <div className="mt-6 border-t border-slate-100/60 pt-6">
        <ResearchTeam lightMode={true} />
      </div>
    </motion.div>
  );
}
