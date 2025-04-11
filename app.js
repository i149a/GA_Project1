let timerInterval;
let seconds = 0;
let selectedCell = null;

// Puzzle presets by difficulty
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

// Full solution for validation
const solution = [
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

// Start game setup
function startGame() {
  const difficulty = document.getElementById('difficulty').value;
  let puzzle;

  if (difficulty === 'easy') puzzle = easyPuzzle;
  else if (difficulty === 'medium') puzzle = mediumPuzzle;
  else puzzle = hardPuzzle;

  seconds = 0;
  clearInterval(timerInterval);
  startTimer();
  generateBoard(puzzle);
  document.getElementById('message').textContent = '';
  setupNumberPad();
}

// Create board from puzzle
function generateBoard(puzzle) {
  const board = document.getElementById('sudoku-board');
  board.innerHTML = '';
  selectedCell = null;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const input = document.createElement('input');
      input.className = 'cell';
      input.maxLength = 1;
      input.dataset.row = row;
      input.dataset.col = col;

      const value = puzzle[row][col];
      if (value !== '') {
        input.value = value;
        input.readOnly = true;
      }

      input.addEventListener('focus', () => {
        selectedCell = input;
      });

      input.addEventListener('input', checkBoard);
      board.appendChild(input);
    }
  }
}

// Handle clickable numbers
function setupNumberPad() {
  const buttons = document.querySelectorAll('.num-btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (!selectedCell || selectedCell.readOnly) return;
      const value = button.textContent;
      selectedCell.value = value === '🧽' ? '' : value;
      checkBoard();
    });
  });
}

// Check if puzzle is solved
function checkBoard() {
  const cells = document.querySelectorAll('.cell');
  let correct = true;

  cells.forEach(cell => {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const val = parseInt(cell.value);

    if (!cell.readOnly) {
      if (val !== solution[row][col]) {
        correct = false;
      }
    }
  });

  if (correct && allCellsFilled()) {
    clearInterval(timerInterval);
    document.getElementById('message').textContent = '🎉 Congratulations! You solved it!';
  }
}

// Check if board is fully filled
function allCellsFilled() {
  return [...document.querySelectorAll('.cell')].every(cell => cell.value !== '');
}

// Timer logic
function startTimer() {
  const timerDisplay = document.getElementById('timer');
  timerInterval = setInterval(() => {
    seconds++;
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    timerDisplay.textContent = `${mins}:${secs}`;
  }, 1000);
}
