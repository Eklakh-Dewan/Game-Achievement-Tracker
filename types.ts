// Achievement difficulty levels
export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Legendary';

// Achievement status
export type AchievementStatus = 'Locked' | 'In Progress' | 'Completed';

// Platform types
export type Platform = 'PC' | 'PlayStation' | 'Xbox' | 'Nintendo' | 'Mobile' | 'Other';

// Achievement interface
export interface Achievement {
  id: string;
  name: string;
  description: string;
  difficulty: Difficulty;
  status: AchievementStatus;
  unlockedDate?: string;
}

// Game interface
export interface Game {
  id: string;
  title: string;
  platform: Platform;
  coverImage?: string;
  achievements: Achievement[];
  dateAdded: string;
}

// Statistics interface
export interface Stats {
  totalGames: number;
  totalAchievements: number;
  completedAchievements: number;
  overallProgress: number;
}