# 📁 File Structure Checklist

## Required Files for Game Achievement Tracker

### ✅ Root Directory Files
```
game-achievement-tracker/
├── firebase.config.ts
├── GameContext.tsx
├── gameTheme.ts
├── types.ts
├── storage.ts
├── ProgressRing.tsx
├── GameCard.tsx
├── AchievementCard.tsx
├── package.json
├── app.json
└── README.md
```

### ✅ App Directory (Routes)
```
app/
├── _layout.tsx              ← Root layout
├── index.tsx                ← Dashboard (home)
├── login.tsx                ← Login screen
├── signup.tsx               ← Sign up screen
├── forgot-password.tsx      ← Password reset
├── games-list.tsx           ← All games list
├── game-details.tsx         ← Game details
├── add-game.tsx             ← Add game form
└── add-achievement.tsx      ← Add achievement form
```

### ✅ Services Directory
```
services/
├── firebaseService.ts       ← Firestore operations
└── authService.ts           ← Authentication
```

---

## 🔍 How to Check

Run this command in your project root:

```bash
# On Windows
dir /B /S *.tsx *.ts

# On Mac/Linux
find . -name "*.tsx" -o -name "*.ts"
```

---

## 🚨 Common Issues

### Issue 1: "Unmatched Route" Error
**Cause:** Missing route file or wrong filename

**Fix:**
- Make sure file names match exactly: `games-list.tsx` (not `GamesList.tsx`)
- Check file is in `app/` directory (not root or `src/`)

### Issue 2: Import Errors
**Cause:** Missing service files

**Fix:**
- Create `services/` folder in root
- Add `firebaseService.ts` and `authService.ts`

### Issue 3: Theme Not Found
**Cause:** `gameTheme.ts` in wrong location

**Fix:**
- Move `gameTheme.ts` to root directory
- Update imports: `import { gameTheme } from '../gameTheme'`

---

## 🔧 Quick Fix Script

Create this file as `check-structure.js` and run `node check-structure.js`:

```javascript
const fs = require('fs');
const path = require('path');

const requiredFiles = {
  'Root': [
    'firebase.config.ts',
    'GameContext.tsx',
    'gameTheme.ts',
    'types.ts',
    'storage.ts',
    'ProgressRing.tsx',
    'GameCard.tsx',
    'AchievementCard.tsx'
  ],
  'app': [
    '_layout.tsx',
    'index.tsx',
    'login.tsx',
    'signup.tsx',
    'forgot-password.tsx',
    'games-list.tsx',
    'game-details.tsx',
    'add-game.tsx',
    'add-achievement.tsx'
  ],
  'services': [
    'firebaseService.ts',
    'authService.ts'
  ]
};

console.log('🔍 Checking file structure...\n');

Object.keys(requiredFiles).forEach(dir => {
  console.log(`\n📁 ${dir}/`);
  requiredFiles[dir].forEach(file => {
    const filePath = dir === 'Root' ? file : path.join(dir, file);
    const exists = fs.existsSync(filePath);
    console.log(`${exists ? '✅' : '❌'} ${filePath}`);
  });
});

console.log('\n✨ Check complete!');
```

---

## ✅ After Creating All Files

1. **Restart Metro Bundler:**
   ```bash
   # Stop current server (Ctrl+C)
   npx expo start -c
   ```

2. **Clear Cache:**
   ```bash
   # Remove cache
   rm -rf node_modules/.cache
   rm -rf .expo
   
   # Restart
   npx expo start
   ```

3. **Test Navigation:**
   - Open app
   - Click "See All" on dashboard
   - Should navigate to games list
   - No "Unmatched Route" error

---

## 📞 Still Having Issues?

If you still see "Unmatched Route":

1. Show me your `app/` directory structure
2. Show me your `app/_layout.tsx` file
3. Show me the exact error message

I'll help you debug! 🔧