# GA_Project1: Sudoku Game

This is a simple Sudoku web application built using HTML, CSS, and JavaScript. It provides a 9x9 Sudoku grid with three difficulty levels (Easy, Medium, Hard), a timer, a number selection pad, and a solution checker.

---

## 🔧 Features

- 9x9 Sudoku board
- Three difficulty levels: Easy, Medium, Hard
- Timer that starts on game start and stops on correct completion
- Clickable number pad (1–9 + eraser)
- Input cells for solving
- Check Solution button
- Visual feedback for correct/incorrect inputs

---

## 🚀 How to Play

1. Select the difficulty level from the dropdown.
2. Click "Start Game" to begin.
3. Use the number pad below the board to input numbers into empty cells.
4. Use the eraser to remove mistakes.
5. Click "Check Solution" to verify your answers.
6. If you solve the puzzle correctly, a message will appear and the timer will stop.

---

## 📘 User Stories

1. **Starting the Game**
   - User selects a difficulty and clicks "Start Game"
   - Sudoku puzzle appears with some cells filled
   - Timer starts counting

2. **Interacting with the Board**
   - Clicking an empty cell highlights it
   - Clicking a number (1–9) from the number pad fills the cell
   - Clicking the eraser removes a value from the selected cell
   - Clue cells (pre-filled) are not editable

3. **Checking the Solution**
   - Clicking "Check Solution" compares user inputs to the correct solution
   - Incorrect cells are highlighted red
   - Correct cells are highlighted green
   - If all are correct:
     - Timer stops
     - Message: "🎉 Congratulations! You solved it!"

4. **Restarting the Game**
   - Change the level and click "Start Game" again to begin a new puzzle

---

## 🧠 Pseudocode: Planning & Implementation

1. SETUP HTML structure
    - Title, difficulty dropdown, Start button, Timer
    - 9x9 board container (editable cells)
    - Number pad (1–9 + Eraser)
    - Check button and message display

2. DEFINE puzzle data
    - easyPuzzle, mediumPuzzle, hardPuzzle arrays in JavaScript
    - Include a correct solution array for each level

3. START GAME
    - Clear board (if needed)
    - Get selected difficulty
    - Load matching puzzle and solution
    - Call generateBoard(puzzle)
    - Start or reset timer

4. GENERATE BOARD
    - Loop over rows and columns (9x9)
    - If number exists in puzzle:
        - Fill and make cell readonly
      Else:
        - Create empty, editable cell
    - Add cell to board

5. SETUP NUMBER PAD
    - On number click:
        - If a cell is selected and not readonly:
            - Set its value to selected number
    - On eraser click:
        - If a cell is selected and not readonly:
            - Clear the value

6. TIMER
    - Start counting seconds using setInterval
    - Format and display as MM:SS
    - Stop when game is correctly completed

7. CHECK SOLUTION
    - Loop over all cells
    - Compare values with correct solution
    - Highlight correct/incorrect cells
    - If all correct:
        - Stop timer
        - Show success message

8. RESET/RESTART GAME
    - On Start click again with different level
    - Reload puzzle and reset state

---

Happy Sudoku Solving! 🎮🧠
