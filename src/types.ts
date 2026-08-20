export interface GameScore {
  gameId: string;
  gameName: string;
  score: number;
  accuracy: number; // percentage
  reactionTime: number; // average reaction time in ms
  date: string;
}

export interface UserStats {
  level: number;
  xp: number;
  streak: number;
  gamesPlayed: number;
  scoresHistory: GameScore[];
}

export type ActiveTab =
  | 'home'
  | 'about'
  | 'how-it-works'
  | 'contact'
  | 'auth'
  | 'dashboard'
  | 'privacy'
  | 'terms'
  | 'science'
  | 'objectives'
  | 'process'
  | 'skills';

export interface StroopCard {
  word: string;
  colorName: string;
  colorClass: string;
  hexValue: string;
}

export interface NBackItem {
  id: string;
  letter: string;
}

export interface RuleSwitcherItem {
  id: number;
  value: number;
  color: 'blue' | 'yellow';
}
