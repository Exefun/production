import React, { useState, useEffect, useRef } from 'react';
import { GameScore, UserStats } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Play, Pause, RotateCcw, Check, Sparkles, Award, ClipboardList, Flame, Zap, Trophy, Plus, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  stats: UserStats;
  onAddTaskXP: (xpAmount: number) => void;
}

interface PlannerTask {
  id: string;
  text: string;
  dimension: 'Working Memory' | 'Focus & Inhibition' | 'Cognitive Flexibility';
  completed: boolean;
}

export default function Dashboard({ stats, onAddTaskXP }: DashboardProps) {
  // --- Pomodoro Focus Timer State ---
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  
  const timerIntervalRef = useRef<any>(null);

  // Play synthesized web-audio sound effects for the timer safely
  const playTimerChime = (type: 'start' | 'stop' | 'finish') => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'start') {
        osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'stop') {
        osc.frequency.setValueAtTime(330, ctx.currentTime); // E4
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else {
        // finished chime
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
        setTimeout(() => {
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
          gain2.gain.setValueAtTime(0.15, ctx.currentTime);
          osc2.start();
          osc2.stop(ctx.currentTime + 0.3);
        }, 150);
      }
    } catch (e) {
      console.warn('AudioContext failed for timer', e);
    }
  };

  const handleTimerStartStop = () => {
    if (isTimerRunning) {
      clearInterval(timerIntervalRef.current);
      setIsTimerRunning(false);
      playTimerChime('stop');
    } else {
      setIsTimerRunning(true);
      playTimerChime('start');
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds((prevSec) => {
          if (prevSec === 0) {
            setTimerMinutes((prevMin) => {
              if (prevMin === 0) {
                // Timer finished!
                clearInterval(timerIntervalRef.current);
                setIsTimerRunning(false);
                playTimerChime('finish');
                
                // Reward 100 XP for completing a work focus session!
                if (timerMode === 'work') {
                  onAddTaskXP(100);
                  alert('Great job staying focused! You earned +100 XP for completing a deep focus work sprint.');
                }
                
                // reset
                resetTimer();
                return 25;
              }
              return prevMin - 1;
            });
            return 59;
          }
          return prevSec - 1;
        });
      }, 1000);
    }
  };

  const resetTimer = () => {
    clearInterval(timerIntervalRef.current);
    setIsTimerRunning(false);
    if (timerMode === 'work') {
      setTimerMinutes(25);
    } else if (timerMode === 'shortBreak') {
      setTimerMinutes(5);
    } else {
      setTimerMinutes(15);
    }
    setTimerSeconds(0);
  };

  const switchTimerMode = (mode: 'work' | 'shortBreak' | 'longBreak') => {
    clearInterval(timerIntervalRef.current);
    setIsTimerRunning(false);
    setTimerMode(mode);
    setTimerSeconds(0);
    if (mode === 'work') setTimerMinutes(25);
    else if (mode === 'shortBreak') setTimerMinutes(5);
    else setTimerMinutes(15);
  };

  // --- Executive Function Planner Tasks ---
  const [plannerTasks, setPlannerTasks] = useState<PlannerTask[]>([
    { id: '1', text: 'Minimize browser tabs to reduce cognitive load', dimension: 'Focus & Inhibition', completed: false },
    { id: '2', text: 'Break down complex assignment into 3 micro-steps', dimension: 'Cognitive Flexibility', completed: false },
    { id: '3', text: 'Use N-Back game to warm up working memory', dimension: 'Working Memory', completed: true },
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDimension, setNewTaskDimension] = useState<'Working Memory' | 'Focus & Inhibition' | 'Cognitive Flexibility'>('Focus & Inhibition');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask: PlannerTask = {
      id: Date.now().toString(),
      text: newTaskText,
      dimension: newTaskDimension,
      completed: false
    };
    setPlannerTasks([...plannerTasks, newTask]);
    setNewTaskText('');
  };

  const handleToggleTask = (id: string) => {
    setPlannerTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextCompleted = !t.completed;
        if (nextCompleted) {
          // Reward XP for completing task!
          onAddTaskXP(25);
          playTimerChime('start');
        }
        return { ...t, completed: nextCompleted };
      }
      return t;
    }));
  };

  const handleDeleteTask = (id: string) => {
    setPlannerTasks(prev => prev.filter(t => t.id !== id));
  };

  // Clean timer interval on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Format Recharts data for progress line
  const areaChartData = stats.scoresHistory.map((sh, idx) => ({
    index: idx + 1,
    score: sh.score,
    accuracy: sh.accuracy,
    name: sh.date
  }));

  // Compare average scores per game
  const gamesList = ['Ant Escape', 'Jigsaw 9', 'Color Rush'];
  const barChartData = gamesList.map(game => {
    const gameHistory = stats.scoresHistory.filter(sh => sh.gameName.startsWith(game));
    const avgScore = gameHistory.length > 0 ? Math.round(gameHistory.reduce((acc, sh) => acc + sh.score, 0) / gameHistory.length) : 0;
    const avgRt = gameHistory.length > 0 ? Math.round(gameHistory.reduce((acc, sh) => acc + sh.reactionTime, 0) / gameHistory.length) : 0;
    return {
      gameName: game, // full game name
      avgScore,
      avgRt
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="dashboard-hub">
      {/* Dashboard Summary Statistics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* User Level Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-950 border border-indigo-500/20 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full blur-xl" />
          <div className="flex items-center space-x-2 text-indigo-400 mb-2">
            <Trophy className="h-5 w-5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">NEURAL DEPTH</span>
          </div>
          <h3 className="text-3xl font-mono font-extrabold text-white">LEVEL {stats.level}</h3>
          <p className="text-xs text-slate-400 mt-2 font-mono">
            XP: {stats.xp} / {stats.level * 1000} ({Math.round((stats.xp / (stats.level * 1000)) * 100)}%)
          </p>
          <div className="w-full bg-slate-900 rounded-full h-1.5 mt-2">
            <div 
              className="bg-indigo-500 h-1.5 rounded-full" 
              style={{ width: `${(stats.xp / (stats.level * 1000)) * 100}%` }}
            />
          </div>
        </div>

        {/* Streak Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-950 border border-indigo-500/20 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl" />
          <div className="flex items-center space-x-2 text-emerald-400 mb-2">
            <Flame className="h-5 w-5 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">DAILY STREAK</span>
          </div>
          <h3 className="text-3xl font-mono font-extrabold text-white">{stats.streak} DAYS</h3>
          <p className="text-xs text-slate-400 mt-2 leading-tight">
            Perform 1 cognitive challenge per day to sustain.
          </p>
        </div>

        {/* Total Sessions Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-950 border border-indigo-500/20 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500/5 rounded-full blur-xl" />
          <div className="flex items-center space-x-2 text-pink-400 mb-2">
            <Zap className="h-5 w-5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">CALIBRATIONS</span>
          </div>
          <h3 className="text-3xl font-mono font-extrabold text-white">{stats.gamesPlayed} SESSIONS</h3>
          <p className="text-xs text-slate-400 mt-2 leading-tight">
            Consistent exercises stimulate dendrite growth.
          </p>
        </div>

        {/* Average Accuracy Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-950 border border-indigo-500/20 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full blur-xl" />
          <div className="flex items-center space-x-2 text-amber-500 mb-2">
            <Award className="h-5 w-5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">AGGREGATE RATIO</span>
          </div>
          <h3 className="text-3xl font-mono font-extrabold text-white">
            {stats.scoresHistory.length > 0 
              ? Math.round(stats.scoresHistory.reduce((acc, sh) => acc + sh.accuracy, 0) / stats.scoresHistory.length) 
              : 0}%
          </h3>
          <p className="text-xs text-slate-400 mt-2 leading-tight">
            Target ratio of over 85% represents high self-regulation.
          </p>
        </div>

      </div>

      {/* Main Grid: Left is Analytics/Charts, Right is ADHD Focus & Planner Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Visual Charts */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Chart 1: Progress Over Time */}
          <div className="p-6 bg-slate-950/40 border border-indigo-950/40 rounded-2xl text-left">
            <div className="mb-6">
              <h4 className="text-base font-bold text-white">Cognitive Accuracy & Score Timeline</h4>
              <p className="text-xs text-slate-400 mt-1">
                Visualizing improvement trends across sequential exercise cycles.
              </p>
            </div>
            
            <div className="h-72 w-full font-mono text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="index" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '12px' }}
                    labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreColor)" name="Calibrator XP" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Comparing Games */}
          <div className="p-6 bg-slate-950/40 border border-indigo-950/40 rounded-2xl text-left">
            <div className="mb-6">
              <h4 className="text-base font-bold text-white">Baseline Comparison Metrics</h4>
              <p className="text-xs text-slate-400 mt-1">
                Comparing aggregate score and sensory speed latency (ms) per game.
              </p>
            </div>
            
            <div className="h-64 w-full font-mono text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="gameName" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '12px' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px' }} />
                  <Bar dataKey="avgScore" fill="#6366f1" name="Avg Score (XP)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="avgRt" fill="#eab308" name="Avg Latency (ms)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive ADHD & Planner widgets */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Pomodoro Focus Timer Widget */}
          <div className="p-6 bg-gradient-to-b from-[#11162d] to-slate-950/80 border border-indigo-500/20 rounded-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/5 rounded-full blur-2xl" />
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest">
                ADHD NEURAL SHIELD
              </span>
              <span className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-full font-bold">
                +{timerMode === 'work' ? '100' : '0'} XP SPRINT
              </span>
            </div>

            {/* Mode Switches */}
            <div className="flex items-center justify-center space-x-1 bg-slate-950 p-1 rounded-xl mb-6 border border-slate-900">
              <button
                onClick={() => switchTimerMode('work')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  timerMode === 'work' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                FOCUS
              </button>
              <button
                onClick={() => switchTimerMode('shortBreak')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  timerMode === 'shortBreak' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                SHORT BREAK
              </button>
              <button
                onClick={() => switchTimerMode('longBreak')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  timerMode === 'longBreak' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                RECOVERY
              </button>
            </div>

            {/* Timer Output */}
            <div className="my-4">
              <span className="text-6xl font-mono font-black text-white tracking-widest">
                {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
              </span>
              <p className="text-xs text-slate-400 font-sans mt-2">
                {timerMode === 'work' 
                  ? 'Isolating stimulus. Minimize environmental noise and focus.'
                  : 'Let the prefrontal cortex relax. Breathe deeply.'}
              </p>
            </div>

            {/* Timer Actions */}
            <div className="flex items-center justify-center space-x-3 mt-6">
              <button
                onClick={handleTimerStartStop}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-all"
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>PAUSE</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-current" />
                    <span>FOCUS WORK</span>
                  </>
                )}
              </button>
              <button
                onClick={resetTimer}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-400 hover:text-white transition-all"
                title="Reset Timer"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* EF Planner / Task list widget */}
          <div className="p-6 bg-slate-950/40 border border-indigo-950/40 rounded-2xl text-left">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-900">
              <div className="flex items-center space-x-2">
                <ClipboardList className="h-5 w-5 text-indigo-400" />
                <h4 className="text-sm font-bold text-white">EF Planning Board</h4>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-400">
                +25 XP per task
              </span>
            </div>

            {/* Task list container */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto mb-6 pr-1">
              {plannerTasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`flex items-start justify-between p-3 rounded-xl border transition-all ${
                    task.completed 
                      ? 'bg-slate-950/50 border-slate-900 text-slate-500' 
                      : 'bg-slate-900/60 border-slate-850 text-slate-300 hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className={`h-5 w-5 rounded-md border shrink-0 flex items-center justify-center transition-colors cursor-pointer ${
                        task.completed 
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950' 
                          : 'border-slate-700 hover:border-indigo-400'
                      }`}
                    >
                      {task.completed && <Check className="h-3.5 w-3.5 stroke-[3px]" />}
                    </button>
                    <div className="min-w-0">
                      <p className={`text-xs font-sans truncate ${task.completed ? 'line-through' : 'font-medium text-slate-200'}`}>
                        {task.text}
                      </p>
                      <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-indigo-400 mt-1">
                        {task.dimension}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1 text-slate-600 hover:text-red-400 transition-colors shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Task Form */}
            <form onSubmit={handleAddTask} className="space-y-3">
              <input
                type="text"
                placeholder="What is your executive priority today?"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900/70 border border-slate-800 focus:border-indigo-500 text-white outline-none font-sans"
              />
              <div className="flex items-center space-x-2">
                <select
                  value={newTaskDimension}
                  onChange={(e: any) => setNewTaskDimension(e.target.value)}
                  className="flex-1 px-2.5 py-2 text-[11px] font-mono font-bold rounded-xl bg-slate-900 border border-slate-800 focus:border-indigo-500 text-indigo-300 outline-none cursor-pointer"
                >
                  <option value="Focus & Inhibition">Inhibition / Focus</option>
                  <option value="Working Memory">Working Memory</option>
                  <option value="Cognitive Flexibility">Task Switch / Flex</option>
                </select>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-indigo-500/20 hover:bg-indigo-500 text-indigo-300 hover:text-white rounded-xl border border-indigo-500/30 text-xs font-bold font-mono uppercase tracking-wider cursor-pointer flex items-center space-x-1 transition-all shrink-0"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>ADD</span>
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
