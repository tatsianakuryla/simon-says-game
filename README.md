# 🎮 Simon Says Game

**Simon Says Game** is a fast-paced memory and attention training game where the player must accurately reproduce sequences of keyboard symbols. Whether using a virtual keyboard or your own, your goal is to follow an ever-growing pattern — and one wrong move can end it all.

🟢 [Live Demo](https://tatsianakuryla.github.io/simon-says-game/)  
⌨️ Fully keyboard and click controlled  
🧠 Includes three difficulty levels and five rounds

---

## 📚 Table of Contents

- [🎯 Game Overview](#-game-overview)
- [🚀 Live Demo](#-live-demo)
- [✨ Features](#-features)
- [📦 Project Structure](#-project-structure)
- [🧪 Technologies Used](#-technologies-used)
- [🔧 Scripts & Setup](#-scripts--setup)
- [📝 Game Rules](#-game-rules)

---

## 🎯 Game Overview

Simon Says is a classic pattern-recognition game where users must replicate an increasingly complex sequence of symbols.  
In this JavaScript-only implementation, users can:
- Choose between 3 difficulty levels (Numbers, Letters, Mixed)
- Play 5 progressively difficult rounds
- Replay sequences once per round
- Use either the virtual keyboard or physical keyboard
- Get instant feedback on correct or incorrect attempts

The application is built with clean modular code, full keyboard/virtual keyboard support, session-based difficulty persistence, and fully responsive layout for mobile, tablet, and desktop.

---

## 🚀 Live Demo

🌐 [Click here to play](https://your-deploy-link.com)

---

## ✨ Features

- 🧠 Difficulty Levels:
    - Easy: Numbers (0–9)
    - Medium: Letters (A–Z)
    - Hard: Letters + Numbers

- 🎮 Game Flow:
    - 5 rounds, sequences increase by +2 symbols each round
    - Visual typing simulation on screen
    - One incorrect attempt allowed per round
    - Final feedback on success/failure
    - One-time replay per round

- 💻 Interaction:
    - Fully playable via physical or virtual keyboard
    - Input and feedback visually displayed
    - Responsive to keyboard and mouse
    - All feedback messages automatically handled

- 🧩 UI/UX:
    - Virtual keyboard updates dynamically by difficulty
    - Responsive layout (desktop, tablet, mobile)
    - Restart game anytime without reloading
    - No alert/prompt/confirm — custom messages only

---

## 📦 Project Structure
```aiignore
src/
├── css/
├── fonts/
├── images/
└── javascript/
├── dom.js
├── gameState.js
├── helpers.js
├── keyboardState.js
├── main.js
└── showGameLogic.js
```

---

## 🧪 Technologies Used

- **Vanilla JavaScript (ES6+)**
- **HTML5** (empty `<body>`)
- **CSS3** with responsive layout (480px+)
- **ESLint** and **Prettier**
- No frameworks, no libraries, no minified JS

---

## 🔧 Scripts & Setup

```bash
  # Lint JS files
npm run lint
```
```bash
  # Auto-fix JS code style
npm run lint:fix
```
```bash
  # Format with Prettier
npm run format
```

### 📝 Game Rules

- **Start Screen**:  
  Choose difficulty and click **Start** to begin the game.

- **Sequence Playback**:  
  The game will display a randomly generated sequence (e.g., `A → D → E`) by highlighting keys on the virtual keyboard.

- **Your Turn**:  
  Repeat the sequence exactly using either the virtual or physical keyboard. Your input is shown live.

- **Correct?**
  - You proceed to the **next round**
  - You receive visual or text-based **feedback** (✅/❌)

- **Wrong?**
  - You are allowed **one retry** per round
  - A **second incorrect attempt** ends the game

- 🔁 You can replay the current sequence **once per round**
- 🔄 You can restart the game at any time using the **New Game** button (except during playback)
