import React, { createContext, useState, useEffect, useContext } from 'react';
import { Game, Achievement, Stats } from './types';
import { storageService } from './storage';

interface GameContextType {
  games: Game[];
  stats: Stats;
  loading: boolean;
  addGame: (game: Game) => Promise<void>;
  updateGame: (game: Game) => Promise<void>;
  deleteGame: (gameId: string) => Promise<void>;
  addAchievement: (gameId: string, achievement: Achievement) => Promise<void>;
  updateAchievement: (gameId: string, achievement: Achievement) => Promise<void>;
  deleteAchievement: (gameId: string, achievementId: string) => Promise<void>;
  refreshGames: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculate statistics
  const calculateStats = (gamesList: Game[]): Stats => {
    const totalGames = gamesList.length;
    const totalAchievements = gamesList.reduce((sum, game) => sum + game.achievements.length, 0);
    const completedAchievements = gamesList.reduce(
      (sum, game) => sum + game.achievements.filter(a => a.status === 'Completed').length,
      0
    );
    const overallProgress = totalAchievements > 0 
      ? Math.round((completedAchievements / totalAchievements) * 100)
      : 0;

    return {
      totalGames,
      totalAchievements,
      completedAchievements,
      overallProgress,
    };
  };

  const stats = calculateStats(games);

  // Load games on mount
  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    setLoading(true);
    const loadedGames = await storageService.getGames();
    setGames(loadedGames);
    setLoading(false);
  };

  const addGame = async (game: Game) => {
    await storageService.addGame(game);
    setGames(prev => [...prev, game]);
  };

  const updateGame = async (game: Game) => {
    await storageService.updateGame(game);
    setGames(prev => prev.map(g => g.id === game.id ? game : g));
  };

  const deleteGame = async (gameId: string) => {
    await storageService.deleteGame(gameId);
    setGames(prev => prev.filter(g => g.id !== gameId));
  };

  const addAchievement = async (gameId: string, achievement: Achievement) => {
    const game = games.find(g => g.id === gameId);
    if (game) {
      const updatedGame = {
        ...game,
        achievements: [...game.achievements, achievement],
      };
      await updateGame(updatedGame);
    }
  };

  const updateAchievement = async (gameId: string, achievement: Achievement) => {
    const game = games.find(g => g.id === gameId);
    if (game) {
      const updatedAchievements = game.achievements.map(a =>
        a.id === achievement.id ? achievement : a
      );
      const updatedGame = {
        ...game,
        achievements: updatedAchievements,
      };
      await updateGame(updatedGame);
    }
  };

  const deleteAchievement = async (gameId: string, achievementId: string) => {
    const game = games.find(g => g.id === gameId);
    if (game) {
      const updatedAchievements = game.achievements.filter(a => a.id !== achievementId);
      const updatedGame = {
        ...game,
        achievements: updatedAchievements,
      };
      await updateGame(updatedGame);
    }
  };

  const refreshGames = async () => {
    await loadGames();
  };

  return (
    <GameContext.Provider
      value={{
        games,
        stats,
        loading,
        addGame,
        updateGame,
        deleteGame,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        refreshGames,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGames = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGames must be used within GameProvider');
  }
  return context;
};