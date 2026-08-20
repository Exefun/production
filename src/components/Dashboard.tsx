import React from 'react';
import {
  Brain,
  Flame,
  Gamepad2,
  Trophy,
  Zap,
  ArrowRight,
  LogOut,
} from 'lucide-react';

import { ActiveTab, UserStats } from '../types';

interface DashboardUser {
  name: string;
  email: string;
  avatarColor: string;
  avatarTag: string;
  focusArea: string;
}

interface DashboardProps {
  user: DashboardUser;
  stats: UserStats;
  setActiveTab: (tab: ActiveTab, mode?: 'login' | 'register') => void;
  onLogout: () => void;
}

export default function Dashboard({
  user,
  stats,
  setActiveTab,
  onLogout,
}: DashboardProps) {
  return (
    <div className="min-h-[85vh] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-lg bg-blue-600 p-2">
                <Brain className="h-5 w-5 text-white" />
              </div>

              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600">
                Exefun Dashboard
              </span>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Welcome back, {user.name}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Continue building your executive functioning skills.
            </p>
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-3">

            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ${
                user.avatarColor || 'bg-blue-600'
              }`}
            >
              {user.avatarTag || user.name.charAt(0).toUpperCase()}
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-900">
                {user.name}
              </p>

              <p className="text-xs text-slate-500">
                {user.email}
              </p>
            </div>

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

          {/* Level */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Level
              </span>

              <Trophy className="h-5 w-5 text-amber-500" />
            </div>

            <p className="text-2xl font-extrabold text-slate-900">
              {stats.level}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Current cognitive level
            </p>
          </div>

          {/* XP */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                XP
              </span>

              <Zap className="h-5 w-5 text-blue-500" />
            </div>

            <p className="text-2xl font-extrabold text-slate-900">
              {stats.xp.toLocaleString()}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Experience points
            </p>
          </div>

          {/* Streak */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Streak
              </span>

              <Flame className="h-5 w-5 text-orange-500" />
            </div>

            <p className="text-2xl font-extrabold text-slate-900">
              {stats.streak}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Consecutive training days
            </p>
          </div>

          {/* Games */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Games
              </span>

              <Gamepad2 className="h-5 w-5 text-indigo-500" />
            </div>

            <p className="text-2xl font-extrabold text-slate-900">
              {stats.gamesPlayed}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Games completed
            </p>
          </div>

        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Training Card */}
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white shadow-lg lg:col-span-2">

            <div className="flex h-full flex-col justify-between">

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-100">
                  Recommended Training
                </span>

                <h2 className="mt-3 text-2xl font-extrabold">
                  Continue your cognitive training
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-relaxed text-blue-100">
                  Strengthen attention, working memory, reaction speed,
                  and other executive functioning skills through
                  evidence-based training games.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('skills')}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-blue-600 shadow-sm transition-all hover:bg-blue-50 active:scale-95"
              >
                Explore Training
                <ArrowRight className="h-4 w-4" />
              </button>

            </div>

          </div>

          {/* Focus Area */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
              Focus Area
            </span>

            <h2 className="mt-3 text-xl font-extrabold text-slate-900">
              {user.focusArea}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Your training profile is currently focused on improving
              executive functioning performance.
            </p>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[60%] rounded-full bg-blue-600" />
            </div>

            <p className="mt-2 text-[10px] font-mono text-slate-400">
              TRAINING PROGRESS
            </p>

          </div>

        </div>

        {/* Recent Scores */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                Recent Performance
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your latest cognitive training results.
              </p>
            </div>

            <Trophy className="h-5 w-5 text-slate-400" />

          </div>

          {stats.scoresHistory.length === 0 ? (

            <div className="rounded-2xl bg-slate-50 p-8 text-center">

              <Gamepad2 className="mx-auto h-8 w-8 text-slate-300" />

              <p className="mt-3 text-sm font-semibold text-slate-600">
                No games completed yet.
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Complete your first training game to see your performance here.
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {stats.scoresHistory.slice(0, 5).map((game) => (

                <div
                  key={`${game.gameId}-${game.date}`}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                >

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {game.gameName}
                    </p>

                    <p className="text-[10px] font-mono text-slate-400">
                      {game.date}
                    </p>
                  </div>

                  <div className="text-right">

                    <p className="text-sm font-extrabold text-blue-600">
                      {game.score}
                    </p>

                    <p className="text-[10px] text-slate-400">
                      {game.accuracy}% accuracy
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Logout */}
        <div className="mt-8 flex justify-end">

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>

        </div>

      </div>

    </div>
  );
}