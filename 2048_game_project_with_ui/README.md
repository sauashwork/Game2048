# 2048 Game Project

A full-stack implementation of the classic 2048 game with a modern, responsive UI and undo/redo functionality.

---

## Installation

### Backend (Spring Boot)

1. Open a terminal and navigate to the `backend` folder:
   ```
   cd backend
   ```
2. Build and run the backend:
   ```
   mvn clean install
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`.

### Frontend (React)

1. Open a new terminal and navigate to the `frontend` folder:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend development server:
   ```
   npm start
   ```
   The frontend will start on `http://localhost:3000` (or `3001` if `3000` is busy).

---

## Running the Game

- Make sure both backend and frontend servers are running.
- Open your browser and go to `http://localhost:3000`.
- Play the game!

---

## Gameplay Instructions

- **Goal:** Merge tiles to reach a single tile with the value **2048**. Any single tile that contains 2048 is a win!
- **Controls:** Use arrow keys or the on-screen buttons to move tiles up, down, left, or right.
- **Undo/Redo:** Use the Undo and Redo buttons (or icons) to revert or repeat your last moves.
- **Restart:** Use the Restart button to start a new game.
- **Board Size:** You can select 3x3, 4x4, or 5x5 board sizes.

---

## Implementation Details

### Backend

- **Spring Boot** REST API.
- Handles game logic: moves, merges, win/loss detection, and random tile generation.
- Maintains game state and score.

### Frontend

- **React** SPA.
- Responsive design for desktop and mobile.
- Animations for tile merges and new tiles.
- Undo/Redo functionality using state history.
- Instructions and controls are displayed alongside the board.

### Features

- Unique colors and animations for each tile value.
- Undo/Redo with visual feedback.
- Responsive layout and touch-friendly controls.
- Clear instructions and win/loss overlays.

---

## License

MIT
