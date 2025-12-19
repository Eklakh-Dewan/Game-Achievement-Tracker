import AsyncStorage from '@react-native-async-storage/async-storage';
import { Game } from './types';

const GAMES_KEY = '@games';

export const storageService = {
  // Get all games
  async getGames(): Promise<Game[]> {
    try {
      const data = await AsyncStorage.getItem(GAMES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading games:', error);
      return [];
    }
  },

  // Save all games
  async saveGames(games: Game[]): Promise<void> {
    try {
      await AsyncStorage.setItem(GAMES_KEY, JSON.stringify(games));
    } catch (error) {
      console.error('Error saving games:', error);
    }
  },

  // Add a new game
  async addGame(game: Game): Promise<void> {
    const games = await this.getGames();
    games.push(game);
    await this.saveGames(games);
  },

  // Update a game
  async updateGame(updatedGame: Game): Promise<void> {
    const games = await this.getGames();
    const index = games.findIndex(g => g.id === updatedGame.id);
    if (index !== -1) {
      games[index] = updatedGame;
      await this.saveGames(games);
    }
  },

  // Delete a game
  async deleteGame(gameId: string): Promise<void> {
    const games = await this.getGames();
    const filtered = games.filter(g => g.id !== gameId);
    await this.saveGames(filtered);
  },

  // Clear all data
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.removeItem(GAMES_KEY);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  },
};