import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Game } from './types';
import { gameTheme } from './gameTheme';

interface GameCardProps {
  game: Game;
  onPress: () => void;
}

export default function GameCard({ game, onPress }: GameCardProps) {
  const totalAchievements = game.achievements.length;
  const completedAchievements = game.achievements.filter(a => a.status === 'Completed').length;
  const progress = totalAchievements > 0 ? (completedAchievements / totalAchievements) * 100 : 0;

  const getPlatformIcon = () => {
    const iconMap: Record<string, any> = {
      'PC': 'desktop',
      'PlayStation': 'logo-playstation',
      'Xbox': 'logo-xbox',
      'Nintendo': 'game-controller',
      'Mobile': 'phone-portrait',
      'Other': 'disc',
    };
    return iconMap[game.platform] || 'game-controller';
  };

  const getPlatformColor = () => {
    const colorMap: Record<string, string> = {
      'PC': gameTheme.colors.pc,
      'PlayStation': gameTheme.colors.playstation,
      'Xbox': gameTheme.colors.xbox,
      'Nintendo': gameTheme.colors.nintendo,
      'Mobile': gameTheme.colors.mobile,
      'Other': gameTheme.colors.other,
    };
    return colorMap[game.platform] || gameTheme.colors.accent;
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        {/* Platform Icon */}
        <View style={[styles.platformIcon, { backgroundColor: `${getPlatformColor()}20` }]}>
          <Ionicons name={getPlatformIcon()} size={32} color={getPlatformColor()} />
        </View>

        {/* Game Info */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>{game.title}</Text>
          <Text style={styles.platform}>{game.platform}</Text>
          
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={[gameTheme.colors.accent, gameTheme.colors.neon]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: `${progress}%` }]}
              />
            </View>
            <Text style={styles.progressText}>
              {completedAchievements}/{totalAchievements}
            </Text>
          </View>
        </View>

        {/* Progress Percentage */}
        <View style={styles.percentageContainer}>
          <Text style={styles.percentage}>{Math.round(progress)}%</Text>
        </View>

        {/* Arrow */}
        <Ionicons name="chevron-forward" size={24} color={gameTheme.colors.subtext} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: gameTheme.colors.card,
    borderRadius: gameTheme.radius.md,
    padding: gameTheme.spacing.md,
    marginVertical: gameTheme.spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(127, 91, 255, 0.3)',
    ...gameTheme.shadows.card,
  },
  platformIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: gameTheme.spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: gameTheme.fonts.sizes.lg,
    fontWeight: '700',
    color: gameTheme.colors.text,
    marginBottom: 4,
  },
  platform: {
    fontSize: gameTheme.fonts.sizes.sm,
    color: gameTheme.colors.subtext,
    marginBottom: gameTheme.spacing.sm,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: gameTheme.spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(127, 91, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: gameTheme.fonts.sizes.xs,
    color: gameTheme.colors.subtext,
    fontWeight: '600',
  },
  percentageContainer: {
    marginHorizontal: gameTheme.spacing.md,
  },
  percentage: {
    fontSize: gameTheme.fonts.sizes.lg,
    fontWeight: '700',
    color: gameTheme.colors.neon,
  },
});