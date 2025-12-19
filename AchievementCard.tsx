import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Achievement } from './types';
import { gameTheme } from './gameTheme';

interface AchievementCardProps {
  achievement: Achievement;
  onPress: () => void;
  onLongPress?: () => void;
}

export default function AchievementCard({ achievement, onPress, onLongPress }: AchievementCardProps) {
  const getDifficultyColor = () => {
    const colorMap: Record<string, string> = {
      'Easy': gameTheme.colors.easy,
      'Medium': gameTheme.colors.medium,
      'Hard': gameTheme.colors.hard,
      'Legendary': gameTheme.colors.legendary,
    };
    return colorMap[achievement.difficulty] || gameTheme.colors.accent;
  };

  const getStatusIcon = () => {
    const iconMap: Record<string, any> = {
      'Locked': 'lock-closed',
      'In Progress': 'time',
      'Completed': 'checkmark-circle',
    };
    return iconMap[achievement.status] || 'help-circle';
  };

  const getStatusColor = () => {
    const colorMap: Record<string, string> = {
      'Locked': gameTheme.colors.locked,
      'In Progress': gameTheme.colors.inProgress,
      'Completed': gameTheme.colors.completed,
    };
    return colorMap[achievement.status] || gameTheme.colors.subtext;
  };

  return (
    <TouchableOpacity 
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
      style={[
        styles.card,
        achievement.status === 'Completed' && styles.completedCard,
      ]}
    >
      {/* Status Icon */}
      <View style={[styles.iconContainer, { backgroundColor: `${getStatusColor()}20` }]}>
        <Ionicons name={getStatusIcon()} size={28} color={getStatusColor()} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {achievement.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {achievement.description}
        </Text>
        
        {/* Difficulty Badge */}
        <View style={styles.footer}>
          <View style={[styles.difficultyBadge, { backgroundColor: `${getDifficultyColor()}20` }]}>
            <Ionicons name="star" size={12} color={getDifficultyColor()} />
            <Text style={[styles.difficultyText, { color: getDifficultyColor() }]}>
              {achievement.difficulty}
            </Text>
          </View>
          
          {achievement.unlockedDate && (
            <Text style={styles.date}>
              {new Date(achievement.unlockedDate).toLocaleDateString()}
            </Text>
          )}
        </View>
      </View>

      {/* Status Badge */}
      <View style={styles.statusBadge}>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
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
    borderColor: 'rgba(127, 91, 255, 0.2)',
  },
  completedCard: {
    borderColor: gameTheme.colors.completed,
    backgroundColor: 'rgba(60, 247, 127, 0.05)',
  },
  iconContainer: {
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
  name: {
    fontSize: gameTheme.fonts.sizes.md,
    fontWeight: '700',
    color: gameTheme.colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: gameTheme.fonts.sizes.sm,
    color: gameTheme.colors.subtext,
    marginBottom: gameTheme.spacing.sm,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: gameTheme.spacing.sm,
    paddingVertical: 4,
    borderRadius: gameTheme.radius.sm,
    gap: 4,
  },
  difficultyText: {
    fontSize: gameTheme.fonts.sizes.xs,
    fontWeight: '600',
  },
  date: {
    fontSize: gameTheme.fonts.sizes.xs,
    color: gameTheme.colors.subtext,
  },
  statusBadge: {
    marginLeft: gameTheme.spacing.sm,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    shadowColor: gameTheme.colors.neon,
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
});