# 🎮 GA Project 1: Sudoku Game

A classic **Sudoku web app** built with **HTML, CSS, and JavaScript**. The game offers three difficulty levels, interactive gameplay, and instant feedback on your solution. Perfect for a quick brain workout!

## Screenshots from browser

![Starting View](https://github.com/i149a/sudoku_Project/blob/main/ScreenShots/startingView.png?raw=true)
![Winning View](https://github.com/i149a/sudoku_Project/blob/main/ScreenShots/winning.png?raw=true)
![Losing View](https://github.com/i149a/sudoku_Project/blob/main/ScreenShots/loosing.png?raw=true)  

---

## 🚀 Getting Started

🔗 **Play it live:** [Deployed Sudoku Game](https://i149a.github.io/sudoku_Project/)  

### ✅ How to Play

1. Choose a difficulty level: Easy, Medium, or Hard.
2. Click **"Start Game"** to generate a Sudoku puzzle.
3. Click on any empty cell and choose a number (1–9) from the number pad.
4. Use the **Eraser** to remove incorrect values.
5. As you enter numbers, cells will automatically highlight:
   - ✅ **Green** if the number is correct  
   - ❌ **Red** if the number is incorrect
6. Solve the board completely to stop the timer and win!

---

## ✨ Features

- 🎯 **Three Difficulty Levels** – Easy, Medium, Hard
- ⏱️ **Timer** – Tracks how long you take to solve the puzzle
- 🧩 **Interactive Grid** – Select cells and insert numbers
- 🧽 **Eraser Tool** – Easily fix mistakes
- ✅ **Live Feedback** – Instant green/red cell validation
- 🎉 **Win Message** – Celebrates your success!
- ⏸️ **Pause & Resume** Functionality for the timer  

---

## 📘 User Stories

| Scenario | Description |
|----------|-------------|
| **Start Game** | User selects difficulty and starts the game. Timer begins. |
| **Play Game** | User clicks on cells, selects numbers or erases them. Clue cells are not editable. |
| **Live Check** | As numbers are entered, incorrect cells turn red, correct ones turn green. |
| **Restart** | New puzzle is generated when restarting with a different difficulty. |

---

## 🛠️ Implementation Plan (Pseudocode Highlights)

- **HTML Setup:** Title, controls, 9x9 grid, number pad, buttons
- **JavaScript Functions:**
  - Load puzzle based on difficulty
  - Generate editable/readonly cells
  - Handle number pad and eraser input
  - Track elapsed time
  - Compare inputs to the solution
  - Automatically highlight each cell as correct/incorrect

---

## 🔮 Next Steps (Planned Enhancements)

- 🎨 **Dark Mode / Theme Options**  
- 🧠 **Hint System** to reveal one correct cell  
- 💾 **Save/Load Progress** using local storage  

---

Enjoy solving and sharpening your logic! 🧠🎯  
