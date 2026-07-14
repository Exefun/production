import React, { useState, useEffect } from 'react';
import { ActiveTab } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowDown, Brain, Zap, Trophy, Sparkles, Orbit, Target, 
  ChevronLeft, ChevronRight, Play, Pause, Microscope, HeartHandshake, Shield,
  RefreshCw, PlayCircle, Clipboard, Heart
} from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: ActiveTab, mode?: 'login' | 'register') => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      badge: "Programme Relevance",
      badgeIcon: Sparkles,
      title: "AI-Enabled Intervention in Higher Education",
      description: "Integrating personalized artificial intelligence to reinforce executive functioning skills. Responsive, machine-learning-driven learning systems provide equitable cognitive support to bridge educational disparities and support diverse learners.",
      btnText: "Explore Significance",
      colorTheme: "from-blue-400 via-indigo-400 to-indigo-300",
      accentBg: "bg-blue-950/50 border-blue-800/40 text-blue-300",
      glowColor: "bg-blue-500/10",
    },
    {
      badge: "AI-Enabled Tools",
      badgeIcon: Microscope,
      title: "Adaptive Cognitive Assistance",
      description: "Intelligent platforms and data analytics that monitor student progress, identify learning friction points, and modify content delivery in real-time. Tailored feedback breaks down barriers and nurtures a supportive academic community.",
      btnText: "Learn About AI Interventions",
      colorTheme: "from-emerald-400 via-teal-400 to-emerald-300",
      accentBg: "bg-emerald-950/50 border-emerald-800/40 text-emerald-300",
      glowColor: "bg-emerald-500/10",
    },
    {
      badge: "Executive Functioning",
      badgeIcon: Target,
      title: "Core Cognitive Processes",
      description: "Essential capacities for goal-directed action, self-regulation, and working memory. Standardized cognitive training supports mental flexibility, focus, emotional control, and robust task planning under pressure.",
      btnText: "Explore Cognitive Processes",
      colorTheme: "from-rose-400 via-pink-400 to-rose-300",
      accentBg: "bg-rose-950/50 border-rose-800/40 text-rose-300",
      glowColor: "bg-rose-500/10",
    }
  ];

  // Auto revolving effect
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Smooth scroll to features
  const scrollToFeatures = () => {
    const el = document.getElementById('skills-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleActionClick = (index: number) => {
    if (index === 0) {
      setActiveTab('science');
    } else if (index === 1) {
      setActiveTab('process');
    } else {
      setActiveTab('skills');
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 w-full relative overflow-hidden" id="hero-root">
      
      {/* Glow effects for dark ambiance */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Main Revolving Slideshow Container */}
      <div className="relative pt-16 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[500px] flex items-center justify-center">
        
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => {
            if (index !== currentSlide) return null;
            const BadgeIcon = slide.badgeIcon;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto space-y-8 relative z-10"
              >
                
                {/* Glowing subtle orb behind active slide */}
                <div className={`absolute w-80 h-80 ${slide.glowColor} rounded-full blur-3xl pointer-events-none -z-10`} />

                {/* Badge */}
                <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-wide uppercase ${slide.accentBg}`}>
                  <BadgeIcon className="h-4 w-4" />
                  <span>{slide.badge}</span>
                </div>

                {/* Title */}
                <h1 className="text-3.5xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-white leading-[1.12] max-w-2xl">
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.colorTheme}`}>
                    {slide.title}
                  </span>
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed font-sans">
                  {slide.description}
                </p>

                {/* CTA buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => handleActionClick(index)}
                    className="group flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl text-slate-950 bg-white hover:bg-slate-100 transition-all shadow-md font-bold text-sm cursor-pointer"
                  >
                    <span>{slide.btnText}</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={scrollToFeatures}
                    className="flex items-center space-x-2 px-5 py-3.5 rounded-2xl text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 transition-all font-semibold text-sm cursor-pointer border border-slate-800"
                  >
                    <span>Compare Skills</span>
                    <ArrowDown className="h-4 w-4 animate-bounce" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Slideshow Manual Controls (Absolute Bottom Right overlay) */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between sm:justify-end sm:space-x-4">
          
          {/* Indicators / Dots */}
          <div className="flex items-center space-x-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrentSlide(i); setIsPlaying(false); }}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentSlide ? 'w-8 bg-blue-500' : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-xl border border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-white transition-all cursor-pointer bg-slate-900 shadow-sm"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-xl border border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-white transition-all cursor-pointer bg-slate-900 shadow-sm"
              aria-label="Next Slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl border border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-white transition-all cursor-pointer bg-slate-900 shadow-sm"
              aria-label={isPlaying ? "Pause Auto-rotation" : "Play Auto-rotation"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
          </div>

        </div>

      </div>

      {/* 2. Infinite Continuous Revolving Ticker Banner (Cognitive Skills) */}
      <div className="bg-slate-900/60 text-slate-300 py-4.5 border-y border-slate-900 overflow-hidden w-full relative z-20" id="infinite-ticker-banner">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
        
        {/* Revolving Marquee track using flexible tailwind flex and custom styles */}
        <div className="flex space-x-12 animate-[marquee_25s_linear_infinite] whitespace-nowrap w-max min-w-full">
          {[...Array(3)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex space-x-12 shrink-0 items-center">
              <span className="flex items-center space-x-2 font-semibold tracking-wider text-xs font-mono">
                <Brain className="h-4.5 w-4.5 text-blue-400 shrink-0" />
                <span>WORKING MEMORY</span>
              </span>
              <span className="text-slate-800 font-mono">•</span>
              
              <span className="flex items-center space-x-2 font-semibold tracking-wider text-xs font-mono">
                <Shield className="h-4.5 w-4.5 text-indigo-400 shrink-0" />
                <span>INHIBITION</span>
              </span>
              <span className="text-slate-800 font-mono">•</span>
              
              <span className="flex items-center space-x-2 font-semibold tracking-wider text-xs font-mono">
                <RefreshCw className="h-4.5 w-4.5 text-pink-400 shrink-0" />
                <span>SHIFTING</span>
              </span>
              <span className="text-slate-800 font-mono">•</span>
              
              <span className="flex items-center space-x-2 font-semibold tracking-wider text-xs font-mono">
                <PlayCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                <span>INITIATION</span>
              </span>
              <span className="text-slate-800 font-mono">•</span>
              
              <span className="flex items-center space-x-2 font-semibold tracking-wider text-xs font-mono">
                <Clipboard className="h-4.5 w-4.5 text-amber-400 shrink-0" />
                <span>PLANNING</span>
              </span>
              <span className="text-slate-800 font-mono">•</span>

              <span className="flex items-center space-x-2 font-semibold tracking-wider text-xs font-mono">
                <Heart className="h-4.5 w-4.5 text-rose-400 shrink-0" />
                <span>EMOTIONAL CONTROL</span>
              </span>
              <span className="text-slate-800 font-mono">•</span>

               <span className="flex items-center space-x-2 font-semibold tracking-wider text-xs font-mono">
                <Clipboard className="h-4.5 w-4.5 text-amber-400 shrink-0" />
                <span>ORGANIZATION</span>
              </span>
              <span className="text-slate-800 font-mono">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Centered postsecondary inclusive settings block with darker ambiance */}
      <div className="bg-slate-800/40 border-y border-slate-700/30 py-12 sm:py-16 animate-fade-in" id="hero-discover-block">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm font-sans font-extrabold tracking-wider text-blue-400 uppercase"
            >
              Inclusive Higher Education
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs text-slate-400 mt-2 font-medium"
            >
              Equitable and user friendly frameworks built around diverse cognitive profiles.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-slate-900/60 border border-slate-700/35 rounded-xl p-4 flex flex-col items-center text-center space-y-2 hover:border-slate-600/40 transition-all"
            >
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Microscope className="h-4 w-4" />
              </div>
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-200">Academic Access</h3>
              <p className="text-[11px] leading-relaxed text-slate-400">Flexible learning modalities and customized digital accommodations.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-slate-900/60 border border-slate-700/35 rounded-xl p-4 flex flex-col items-center text-center space-y-2 hover:border-slate-600/40 transition-all"
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Orbit className="h-4 w-4" />
              </div>
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-200">Universal Design</h3>
              <p className="text-[11px] leading-relaxed text-slate-400">Multi-modal curricula structured for cognitive diversity and inclusion.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-slate-900/60 border border-slate-700/35 rounded-xl p-4 flex flex-col items-center text-center space-y-2 hover:border-slate-600/40 transition-all"
            >
              <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
                <HeartHandshake className="h-4 w-4" />
              </div>
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-200">Student Support</h3>
              <p className="text-[11px] leading-relaxed text-slate-400">Targeted structural scaffolding to boost self-advocacy and focus.</p>
            </motion.div>
          </div>
        </div>
      </div>

    </div>
  );
}
