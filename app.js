// ------------------- Variables ------------------- //

let timerInterval;
let seconds = 0;
let selectedCell = null;
let isPaused = false;
let currentPuzzle = null;
let wrongGuesses = 0;
const maxWrongGuesses = 3;
let gameActive = false;

// Difficulty puzzles
const easyPuzzle = [
  [5, 3, '', '', 7, '', '', '', ''],
  [6, '', '', 1, 9, 5, '', '', ''],
  ['', 9, 8, '', '', '', '', 6, ''],
  [8, '', '', '', 6, '', '', '', 3],
  [4, '', '', 8, '', 3, '', '', 1],
  [7, '', '', '', 2, '', '', '', 6],
  ['', 6, '', '', '', '', 2, 8, ''],
  ['', '', '', 4, 1, 9, '', '', 5],
  ['', '', '', '', 8, '', '', 7, 9]
];

const mediumPuzzle = [
  ['', '', 3, '', 2, '', 6, '', ''],
  [9, '', '', 3, '', 5, '', '', 1],
  ['', '', 1, 8, '', 6, 4, '', ''],
  ['', '', 8, 1, '', 2, 9, '', ''],
  [7, '', '', '', '', '', '', '', 8],
  ['', '', 6, 7, '', 8, 2, '', ''],
  ['', '', 2, 6, '', 9, 5, '', ''],
  [8, '', '', 2, '', 3, '', '', 9],
  ['', '', 5, '', 1, '', 3, '', '']
];

const hardPuzzle = [
  ['', '', '', '', '', '', '', '', ''],
  [6, '', '', '', '', '', '', '', ''],
  ['', 7, '', '', 9, '', 2, '', ''],
  ['', 5, '', '', '', '', '', 1, ''],
  ['', '', '', 5, 3, 8, '', '', ''],
  ['', '', '', '', '', '', '', 4, ''],
  ['', '', '', 3, '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '']
];

// Solutions
const easySolution = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]
];

const mediumSolution = [
  [4,8,3,9,2,1,6,5,7],
  [9,6,7,3,4,5,8,2,1],
  [2,5,1,8,7,6,4,9,3],
  [5,4,8,1,3,2,9,7,6],
  [7,2,9,5,6,4,1,3,8],
  [1,3,6,7,9,8,2,4,5],
  [3,7,2,6,8,9,5,1,4],
  [8,1,4,2,5,3,7,6,9],
  [6,9,5,4,1,7,3,8,2]
];

const hardSolution = [
  [1,2,3,4,5,6,7,8,9],
  [6,4,9,8,2,7,1,5,3],
  [5,7,8,1,9,3,2,6,4],
  [9,5,6,2,7,4,8,1,3],
  [2,1,4,5,3,8,6,9,7],
  [3,8,7,6,1,9,5,4,2],
  [7,6,2,3,4,5,9,1,8],
  [8,9,1,7,6,2,3,4,5],
  [4,3,5,9,8,1,3,2,6]
];

// ------------------- Event Listeners ------------------- //

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
});


// ------------------- Functions ------------------- //

function setupEventListeners() {
  // Event Listeners 
  document.getElementById('start-btn').addEventListener('click', startGame);
  document.getElementById('restart-btn').addEventListener('click', restartGame);
  document.getElementById('pause-btn').addEventListener('click', togglePause);
  
  // Number pad event delegation
  document.querySelector('.number-pad').addEventListener('click', (e) => {
    if (e.target.classList.contains('num-btn') && gameActive) {
      handleNumberPadClick(e.target);
    }
  });
}

function handleNumberPadClick(button) {
  if (!selectedCell || selectedCell.readOnly) return;
  const value = button.textContent;
  selectedCell.value = value === '🧽' ? '' : value;
  selectedCell.dispatchEvent(new Event('input'));
}

// Start game function
function startGame() {
  const difficulty = document.getElementById('difficulty').value;
  let puzzle, solution;
  
  if (difficulty === 'easy') {
    puzzle = easyPuzzle;
    solution = easySolution;
  } else if (difficulty === 'medium') {
    puzzle = mediumPuzzle;
    solution = mediumSolution;
  } else {
    puzzle = hardPuzzle;
    solution = hardSolution;
  }
  
  currentPuzzle = { puzzle, solution };
  seconds = 0;
  wrongGuesses = 0;
  gameActive = true;
  updateWrongGuesses();
  clearInterval(timerInterval);
  startTimer();
  generateBoard(puzzle);
  document.getElementById('message').textContent = '';
  document.getElementById('message').className = 'message';
  isPaused = false;
  document.getElementById('pause-btn').textContent = 'Pause';
}

// Generate board
function generateBoard(puzzle) {
  const board = document.getElementById('sudoku-board');
  board.innerHTML = '';
  selectedCell = null;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement('input');
      cell.className = 'cell';
      cell.type = 'text';
      cell.inputMode = 'numeric';
      cell.maxLength = 1;
      cell.dataset.row = row;
      cell.dataset.col = col;

      const value = puzzle[row][col];
      if (value !== '') {
        cell.value = value;
        cell.readOnly = true;
        cell.classList.add('prefilled');
      }

      cell.addEventListener('focus', () => {
        if (!cell.readOnly && gameActive) {
          selectedCell = cell;
          highlightRelatedCells(row, col);
        }
      });

      cell.addEventListener('input', (e) => {
        if (!gameActive) return;
        if (!/^[1-9]$/.test(e.target.value)) {
          e.target.value = '';
        }
        checkCellValidation(cell);
        checkBoardCompletion();
      });

      board.appendChild(cell);
    }
  }
}

// Highlight related cells
function highlightRelatedCells(row, col) {
  document.querySelectorAll('.cell').forEach(cell => {
    cell.classList.remove('highlight');
  });
  
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  // Highlight row and column
  for (let i = 0; i < 9; i++) {
    document.querySelector(`.cell[data-row="${row}"][data-col="${i}"]`).classList.add('highlight');
    document.querySelector(`.cell[data-row="${i}"][data-col="${col}"]`).classList.add('highlight');
  }
  
  // Highlight 3x3 box
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`).classList.add('highlight');
    }
  }
}

// Check cell validation
function checkCellValidation(cell) {
  if (cell.value === '' || cell.readOnly) return;
  
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);
  const val = parseInt(cell.value);
  
  cell.classList.remove('correct', 'incorrect');
  
  if (val === currentPuzzle.solution[row][col]) {
    cell.classList.add('correct');
    checkBoardCompletion(); // Only check for wins
  } else {
    wrongGuesses++;
    updateWrongGuesses();
    cell.classList.add('incorrect');
    
    if (wrongGuesses >= maxWrongGuesses) {
      endGame(false);
    }
  }
}

// Update wrong guesses counter
function updateWrongGuesses() {
  document.getElementById('wrong-guesses-count').textContent = wrongGuesses;
}

// End game
function endGame(isWin) {
  gameActive = false;
  clearInterval(timerInterval);
  
  const message = document.getElementById('message');
  if (isWin) {
    message.textContent = '🎉 Congratulations! You solved it!';
    message.className = 'message win-message';
  } else {
    message.textContent = '❌ Game Over! Maximum wrong guesses reached.';
    message.className = 'message lose-message';
  }
}

// Lose message 
function showLoseMessage() {
  const message = document.getElementById('message');
  message.textContent = '❌ Game Over! Maximum wrong guesses reached.';
  message.className = 'message lose-message';
} 

// Check board completion
function checkBoardCompletion() {
  const cells = document.querySelectorAll('.cell:not(.prefilled)');
  let allCorrect = true;
  
  cells.forEach(cell => {
    if (cell.value === '' || !cell.classList.contains('correct')) {
      allCorrect = false;
    }
  });
  
  if (allCorrect) {
    gameActive = false;
    clearInterval(timerInterval);
    const message = document.getElementById('message');
    message.textContent = '🎉 Congratulations! You solved it!';
    message.className = 'message win-message';
  }
}

// Restart game
function restartGame() {
  if (currentPuzzle) {
    startGame();
  }
}

// Timer functions
function startTimer() {
  const timerDisplay = document.getElementById('timer');
  timerInterval = setInterval(() => {
    if (!isPaused && gameActive) {
      seconds++;
      const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
      const secs = String(seconds % 60).padStart(2, '0');
      timerDisplay.textContent = `${mins}:${secs}`;
    }
  }, 1000);
}

function togglePause() {
  if (!gameActive) return;
  isPaused = !isPaused;
  document.getElementById('pause-btn').textContent = isPaused ? 'Resume' : 'Pause';
}