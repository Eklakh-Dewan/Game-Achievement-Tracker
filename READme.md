# 🎮 Game Achievement Tracker

A beautiful, cyberpunk-themed mobile app to track your gaming achievements across all platforms.

## 📱 Features

### ✅ Implemented
- ✨ Add and manage games
- 🏆 Track achievements with status (Locked, In Progress, Completed)
- 📊 Visual progress indicators with animated rings
- 🎯 Difficulty levels (Easy, Medium, Hard, Legendary)
- 🎮 Platform support (PC, PlayStation, Xbox, Nintendo, Mobile)
- 💾 Offline-first with AsyncStorage
- 🌈 Beautiful cyberpunk UI with gradients
- 📈 Real-time statistics dashboard
- 🔥 Motivational messages
- 🎨 Smooth animations throughout

## 🚀 Installation

### Prerequisites
```bash
node >= 16.x
npm or yarn
expo-cli
```

### Install Dependencies
```bash
npm install

# Required packages:
npm install @react-navigation/native @react-navigation/native-stack
npm install @react-native-async-storage/async-storage
npm install react-native-svg
npm install expo-linear-gradient
npm install react-native-screens react-native-safe-area-context
```

### Run the App
```bash
# Start Expo development server
npx expo start

# Run on iOS
npx expo start --ios

# Run on Android
npx expo start --android
```

## 📂 Project Structure

```
game-achievement-tracker/
├── types.ts                    # TypeScript interfaces
├── gameTheme.ts               # Theme configuration
├── storage.ts                 # AsyncStorage service
├── GameContext.tsx            # State management
├── ProgressRing.tsx           # Progress component
├── GameCard.tsx               # Game card component
├── AchievementCard.tsx        # Achievement component
├── Dashboard.tsx              # Home screen
├── GamesList.tsx              # All games screen
├── GameDetails.tsx            # Game details screen
├── AddGame.tsx                # Add game form
├── AddAchievement.tsx         # Add achievement form
└── App.tsx                    # Navigation setup
```

## 🎨 Color Scheme

### Status Colors
- 🔒 **Locked**: Gray (#5A5A6E)
- ⏳ **In Progress**: Orange (#FFA726)
- ✅ **Completed**: Green (#3CF77F)

### Difficulty Colors
- 🟢 **Easy**: Green (#3CF77F)
- 🔵 **Medium**: Cyan (#4EFAFF)
- 🟣 **Hard**: Purple (#7F5BFF)
- 🟡 **Legendary**: Gold (#FFD700)

## 📖 Usage Guide

### Adding a Game
1. Tap the **+** button on Dashboard
2. Enter game title
3. Select platform
4. Tap "Add Game"

### Adding Achievements
1. Open a game from the list
2. Tap "Add Achievement"
3. Fill in name and description
4. Select difficulty and initial status
5. Tap "Add Achievement"

### Updating Achievement Status
1. Open game details
2. Tap on any achievement
3. Select new status (Locked/In Progress/Completed)
4. Progress updates automatically!

### Deleting Items
- **Delete Game**: Long press on game card
- **Delete Achievement**: Long press on achievement card

## 🎯 Future Enhancements (Phase 2)

- 🤖 AI-based game recommendations
- ☁️ Cloud sync across devices
- 👥 Social features & leaderboards
- 📊 Advanced analytics & insights
- 🔔 Achievement reminders
- 🏅 User badges & rewards
- 📸 Screenshot integration
- 🎮 API integration with Steam, PSN, Xbox Live

## 🛠️ Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Navigation**: React Navigation
- **Storage**: AsyncStorage
- **UI Components**: Custom with Expo Vector Icons
- **Animations**: React Native Animated API
- **Graphics**: React Native SVG

## 📄 License

MIT License - Feel free to use for your portfolio!

## 👨‍💻 Developer

Built by **Eklakh Dewan**  
AI Engineer | ML Developer

## 🙏 Acknowledgments

- Cyberpunk theme inspiration
- React Native community
- Expo team for amazing tools


## OUTPUT

---![Screenshot_2025-12-18-20-51-59-735_host exp exponent](https://github.com/user-attachments/assets/2358c7b1-543c-4271-bfe1-eeada15781d6)


**Happy Gaming! 🎮✨**





