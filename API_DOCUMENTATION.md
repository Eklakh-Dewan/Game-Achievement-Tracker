# 📚 Game Achievement Tracker - API Documentation

## Overview

This app uses **Firebase Firestore** as the backend database with **Firebase Authentication** for user management. All data is synced in real-time across devices.

---

## 🔐 Authentication API

### Sign Up

```typescript
import { authService } from './services/authService';

await authService.signUp(
  email: string,
  password: string,
  displayName: string
);
```

**Parameters:**
- `email`: User's email address
- `password`: Password (min 6 characters)
- `displayName`: User's display name

**Returns:** `User` object

**Example:**
```typescript
try {
  const user = await authService.signUp(
    'player@example.com',
    'securepass123',
    'GamerPro'
  );
  console.log('User created:', user.uid);
} catch (error) {
  console.error('Sign up failed:', error.message);
}
```

---

### Sign In

```typescript
await authService.signIn(
  email: string,
  password: string
);
```

**Returns:** `User` object

---

### Sign Out

```typescript
await authService.signOut();
```

---

### Reset Password

```typescript
await authService.resetPassword(email: string);
```

---

### Auth State Listener

```typescript
const unsubscribe = authService.onAuthStateChange((user) => {
  if (user) {
    console.log('User logged in:', user.uid);
  } else {
    console.log('User logged out');
  }
});

// Cleanup
unsubscribe();
```

---

## 🎮 Games API

### Add Game

```typescript
import { firebaseService } from './services/firebaseService';

await firebaseService.addGame(game: Game);
```

**Game Object:**
```typescript
{
  id: string;              // Unique ID (timestamp)
  title: string;           // Game title
  platform: Platform;      // PC | PlayStation | Xbox | Nintendo | Mobile | Other
  achievements: Achievement[];  // Array of achievements
  dateAdded: string;       // ISO date string
}
```

**Example:**
```typescript
const newGame = {
  id: Date.now().toString(),
  title: 'Elden Ring',
  platform: 'PC',
  achievements: [],
  dateAdded: new Date().toISOString(),
};

await firebaseService.addGame(newGame);
```

---

### Get All Games

```typescript
const games = await firebaseService.getGames();
```

**Returns:** `Game[]` - Array of all user's games

---

### Update Game

```typescript
await firebaseService.updateGame(game: Game);
```

---

### Delete Game

```typescript
await firebaseService.deleteGame(gameId: string);
```

---

### Real-Time Games Listener

```typescript
const unsubscribe = firebaseService.subscribeToGames((games) => {
  console.log('Games updated:', games);
  // Update your UI here
});

// Cleanup
unsubscribe();
```

---

## 🏆 Achievements API

### Add Achievement

```typescript
await firebaseService.addAchievement(
  gameId: string,
  achievement: Achievement
);
```

**Achievement Object:**
```typescript
{
  id: string;                    // Unique ID
  name: string;                  // Achievement name
  description: string;           // Achievement description
  difficulty: Difficulty;        // Easy | Medium | Hard | Legendary
  status: AchievementStatus;     // Locked | In Progress | Completed
  unlockedDate?: string;         // ISO date (if completed)
}
```

**Example:**
```typescript
const achievement = {
  id: Date.now().toString(),
  name: 'Elden Lord',
  description: 'Become the Elden Lord',
  difficulty: 'Legendary',
  status: 'Locked',
};

await firebaseService.addAchievement('game123', achievement);
```

---

### Update Achievement

```typescript
await firebaseService.updateAchievement(
  gameId: string,
  achievement: Achievement
);
```

**Example (Mark as Completed):**
```typescript
const updatedAchievement = {
  ...achievement,
  status: 'Completed',
  unlockedDate: new Date().toISOString(),
};

await firebaseService.updateAchievement('game123', updatedAchievement);
```

---

### Delete Achievement

```typescript
await firebaseService.deleteAchievement(
  gameId: string,
  achievementId: string
);
```

---

## 📊 Statistics API

### Get User Stats

```typescript
const stats = await firebaseService.getUserStats(userId: string);
```

**Returns:**
```typescript
{
  totalGames: number;
  totalAchievements: number;
  completedAchievements: number;
  overallProgress: number;  // 0-100
}
```

---

## 💾 Local Storage API

### AsyncStorage Methods

```typescript
import { storageService } from './storage';

// Get all games
const games = await storageService.getGames();

// Save all games
await storageService.saveGames(games: Game[]);

// Add game
await storageService.addGame(game: Game);

// Update game
await storageService.updateGame(game: Game);

// Delete game
await storageService.deleteGame(gameId: string);

// Clear all data
await storageService.clearAll();
```

---

## 🔄 Sync API

### Sync Local Data to Cloud

```typescript
import { useGames } from './GameContext';

const { syncToCloud } = useGames();

await syncToCloud();
```

This uploads all local data to Firestore.

---

## 📱 Using the Context API

### Access Game Context

```typescript
import { useGames } from './GameContext';

function MyComponent() {
  const {
    games,           // All games
    stats,           // Statistics
    loading,         // Loading state
    user,            // Current user
    isOnline,        // Online status
    addGame,         // Add game function
    updateGame,      // Update game function
    deleteGame,      // Delete game function
    addAchievement,  // Add achievement function
    updateAchievement,     // Update achievement function
    deleteAchievement,     // Delete achievement function
    refreshGames,    // Refresh data
    syncToCloud,     // Sync to cloud
  } = useGames();

  // Use in your component
}
```

---

## 🗄️ Firestore Data Structure

```
firestore
├── users
│   └── {userId}
│       ├── uid: string
│       ├── email: string
│       ├── displayName: string
│       ├── photoURL: string | null
│       ├── createdAt: string
│       └── games (subcollection)
│           └── {gameId}
│               ├── id: string
│               ├── title: string
│               ├── platform: string
│               ├── dateAdded: Timestamp
│               ├── userId: string
│               └── achievements: Array
│                   ├── id: string
│                   ├── name: string
│                   ├── description: string
│                   ├── difficulty: string
│                   ├── status: string
│                   └── unlockedDate?: string
```

---

## 🔒 Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId);
      
      // Games subcollection
      match /games/{gameId} {
        allow read: if isOwner(userId);
        allow write: if isOwner(userId);
      }
    }
  }
}
```

---

## ⚠️ Error Handling

### Common Errors

```typescript
try {
  await firebaseService.addGame(game);
} catch (error) {
  switch (error.code) {
    case 'permission-denied':
      // User not authenticated or doesn't have permission
      console.error('Access denied');
      break;
    case 'unavailable':
      // Network error
      console.error('Network unavailable');
      break;
    case 'not-found':
      // Document not found
      console.error('Data not found');
      break;
    default:
      console.error('Error:', error.message);
  }
}
```

---

## 🚀 Performance Tips

### 1. Use Real-Time Listeners Wisely

```typescript
useEffect(() => {
  const unsubscribe = firebaseService.subscribeToGames(setGames);
  return () => unsubscribe(); // Always cleanup!
}, []);
```

### 2. Batch Operations

```typescript
// Instead of multiple updates
for (const game of games) {
  await updateGame(game); // ❌ Slow
}

// Use Promise.all
await Promise.all(
  games.map(game => updateGame(game)) // ✅ Fast
);
```

### 3. Cache Data Locally

```typescript
// The app already does this automatically!
// Data is saved to AsyncStorage as backup
```

### 4. Pagination (for large datasets)

```typescript
import { query, limit, startAfter } from 'firebase/firestore';

const first = query(gamesRef, limit(25));
const snapshot = await getDocs(first);

// Get next page
const lastVisible = snapshot.docs[snapshot.docs.length - 1];
const next = query(gamesRef, startAfter(lastVisible), limit(25));
```

---

## 🔔 Push Notifications (Future)

```typescript
// Setup Expo notifications
import * as Notifications from 'expo-notifications';

// Request permissions
const { status } = await Notifications.requestPermissionsAsync();

// Get push token
const token = await Notifications.getExpoPushTokenAsync();

// Save to Firestore
await firebaseService.savePushToken(userId, token.data);
```

---

## 📈 Analytics Events

```typescript
import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase.config';

// Track events
logEvent(analytics, 'game_added', {
  platform: 'PC',
  game_title: 'Elden Ring'
});

logEvent(analytics, 'achievement_completed', {
  difficulty: 'Legendary',
  game_id: 'game123'
});
```

---

## 🧪 Testing

### Unit Tests Example

```typescript
import { firebaseService } from './services/firebaseService';

describe('Firebase Service', () => {
  test('should add game', async () => {
    const game = {
      id: '123',
      title: 'Test Game',
      platform: 'PC',
      achievements: [],
      dateAdded: new Date().toISOString(),
    };
    
    await firebaseService.addGame(game);
    const games = await firebaseService.getGames();
    
    expect(games).toContainEqual(game);
  });
});
```

---

## 📞 Support

For API questions or issues:
- GitHub: [your-repo-url]
- Email: eklakh.inplace@gmail.com

---

**Last Updated:** December 2024  
**Version:** 1.0.0  
**Author:** Eklakh Dewan