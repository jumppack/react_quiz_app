# React + Express Quiz Application

A modern, highly polished, interactive JavaScript quiz application built with React (Vite) and Express. It features premium glassmorphic styling, native light/dark theme synchronization, custom-designed interactive controls, structured state management via `useReducer`, and animated correctness feedback.

---

## Features & Requirements Explained

This project is built from scratch against the following requirements:

1. **Structured Questions Data**: Quiz questions are dynamically loaded from a local JSON database ([questions.json](client/src/data/questions.json)), containing questions, options, and correctness mappings.
2. **Glassmorphism Design System**: The interface features a premium glassmorphic card layout (`backdrop-filter: blur(20px)`) that dynamically shifts colors and shadows.
3. **Native System Dark/Light Modes**: Leverages modern CSS `light-dark()` color tokens and media queries (`prefers-color-scheme`) to seamlessly adapt to the user's OS theme without requiring a manual toggle.
4. **Custom-Designed Radio Buttons**: Stripped default browser controls using `appearance: none` to build custom animated circular selectors and options layout using CSS Grid, pseudo-elements (`::before`), and scale transforms.
5. **Interactive & Animated Feedback**: Displays animated feedback panels with descriptive answers upon submission. Incorrect submissions trigger a shake animation (`shake` keyframes), and correct answers trigger a smooth pop-in transition (`popIn` keyframes).
6. **Lifting State Up (Global State)**: Score tracking and active index state reside in the parent [App.jsx](client/src/App.jsx) using a `useReducer` action system, ensuring a single source of truth.
7. **Score Security**: Prevents duplicate scoring by keeping track of correctly answered indexes in a `Set`. Users cannot earn multiple points for clicking submit repeatedly on the same correct question.
8. **Navigation Gates**: Supports full backward/forward navigation. The "Next" button remains locked (disabled) until the user answers the current question correctly.
9. **State Retention on Navigation**: Navigating backward ("Previous") to an already-answered question retains its selection state and displays the correct option card automatically.
10. **Restart Capability**: When the user reaches the final question, a "Restart" button replaces the "Next" button. Clicking it completely wipes the score, resets the index to `0`, clears answered records, and resets local card submission states.

---

## Workspace Structure

The project is structured as a monorepo workspace for clean separation:

```text
coding_practise/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   └── Question.jsx # Reusable Quiz Card Component
│   │   ├── data/
│   │   │   └── questions.json # Quiz Questions DB
│   │   ├── App.jsx         # App Root with useReducer State
│   │   └── index.css       # Design System CSS, Color Schemes, Animations
│   └── package.json
├── server/                 # Express Backend API
│   ├── index.js            # Boilerplate Server
│   └── package.json
├── package.json            # Monorepo Scripts (Root)
└── README.md
```

---

## How to Run the App

### Prerequisites
Make sure you have **Node.js** (v18+) and **npm** installed on your system.

---

### Step 1: Install Dependencies
Run the installation script at the root directory (`coding_practise/`) to automatically install dependencies for the root, frontend client, and backend server:
```bash
npm run install:all
```

---

### Step 2: Start Development Servers
Start both the React client and Express server concurrently with a single command:
```bash
npm run dev
```

* **React Frontend**: Runs on [http://localhost:5173](http://localhost:5173)
* **Express Backend**: Runs on [http://localhost:5001](http://localhost:5001)

---

### Additional Scripts

* **Build Client**: Generates optimized production files for the React app.
  ```bash
  npm run build --prefix client
  ```
* **Lint Code**: Checks files for style consistency and potential errors.
  ```bash
  npm run lint --prefix client
  ```
