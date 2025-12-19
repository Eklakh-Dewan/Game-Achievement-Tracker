export const gameTheme = {
  colors: {
    background: '#0A0A0F',
    card: '#11121A',
    cardHover: '#16172A',
    text: '#E4E7EB',
    subtext: '#8F9BA8',
    accent: '#7F5BFF',
    neon: '#4EFAFF',
    
    // Status colors
    locked: '#5A5A6E',
    inProgress: '#FFA726',
    completed: '#3CF77F',
    
    // Difficulty colors
    easy: '#3CF77F',
    medium: '#4EFAFF',
    hard: '#7F5BFF',
    legendary: '#FFD700',
    
    // Platform colors
    pc: '#FF6B35',
    playstation: '#003791',
    xbox: '#107C10',
    nintendo: '#E60012',
    mobile: '#00D9FF',
    other: '#8F9BA8',
  },

  shadows: {
    card: {
      shadowColor: '#7F5BFF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
    glow: {
      shadowColor: '#4EFAFF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 15,
      elevation: 10,
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },

  fonts: {
    sizes: {
      xs: 11,
      sm: 13,
      md: 15,
      lg: 18,
      xl: 22,
      xxl: 28,
    },
  },
};