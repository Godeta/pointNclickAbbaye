const puzzleBoard = document.getElementById('puzzle-board');
const resetButton = document.getElementById('reset-button');
const upButton = document.getElementById('up-button');
const downButton = document.getElementById('down-button');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');
const imageUrl = '../images/current_abbaye.png'; // Replace with your image path
const pieces = [];
const pieceCount = 9; // 3x3 puzzle
let pieceSize; // Size of each piece
let imageWidth, imageHeight; // Dimensions of the image
let selectedPieceIndex = null; // Track the selected piece index

// Load the image and create puzzle pieces
function preloadImage() {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
        imageWidth = img.width;
        imageHeight = img.height;
        pieceSize = Math.min(imageWidth, imageHeight) / 3; // Calculate piece size based on the smaller dimension
        createPuzzle();
    };
}

// Create puzzle pieces
function createPuzzle() {
    for (let i = 0; i < pieceCount; i++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.style.backgroundImage = `url(${imageUrl})`;
        piece.style.backgroundSize = `${imageWidth}px ${imageHeight}px`; // Set background size to the full image
        piece.style.backgroundPosition = `-${(i % 3) * pieceSize}px -${Math.floor(i / 3) * pieceSize}px`;
        piece.setAttribute('data-index', i);
        piece.addEventListener('click', () => selectPiece(i)); // Pass the index directly
        pieces.push(piece);
    }
    shufflePieces(); // Shuffle pieces at the start
    updatePuzzle(); // Display shuffled pieces
}

// Shuffle pieces randomly
function shufflePieces() {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]]; // Swap elements
    }
}

// Select a piece
function selectPiece(index) {
  // Deselect the previously selected piece
  if (selectedPieceIndex !== null) {
      pieces[selectedPieceIndex].classList.remove('selected'); // Remove the selected class
  }

  selectedPieceIndex = index; // Set the selected piece index
  pieces[selectedPieceIndex].classList.add('selected'); // Add the selected class to highlight
}

// Move the selected piece
function movePiece(direction) {
    if (selectedPieceIndex === null) return; // No piece selected

    let targetIndex = selectedPieceIndex;
    switch (direction) {
        case 'up':
            if (selectedPieceIndex >= 3) targetIndex -= 3; // Move up
            break;
        case 'down':
            if (selectedPieceIndex < 6) targetIndex += 3; // Move down
            break;
        case 'left':
            if (selectedPieceIndex % 3 !== 0) targetIndex -= 1; // Move left
            break;
        case 'right':
            if (selectedPieceIndex % 3 !== 2) targetIndex += 1; // Move right
            break;
    }

    // Swap pieces if target index is valid
    if (targetIndex !== selectedPieceIndex) {
        [pieces[selectedPieceIndex], pieces[targetIndex]] = [pieces[targetIndex], pieces[selectedPieceIndex]];
        selectedPieceIndex = targetIndex; // Update selected piece index
        updatePuzzle();
        checkWin();
    }
}

// Update the puzzle board
function updatePuzzle() {
    puzzleBoard.innerHTML = '';
    pieces.forEach(piece => {
        piece.style.width = `${pieceSize}px`; // Set piece width
        piece.style.height = `${pieceSize}px`; // Set piece height
        puzzleBoard.appendChild(piece);
    });
}

// Check if the puzzle is solved
function checkWin() {
    const isSolved = pieces.every((piece, index) => piece.dataset.index == index);
    if (isSolved) {
        alert('Congratulations! You solved the puzzle!');
    }
}

// Reset the puzzle
resetButton.addEventListener('click', () => {
    shufflePieces(); // Shuffle pieces again
    updatePuzzle();
});

// Move piece up
upButton.addEventListener('click', () => movePiece('up'));
// Move piece down
downButton.addEventListener('click', () => movePiece('down'));
// Move piece left
leftButton.addEventListener('click', () => movePiece('left'));
// Move piece right
rightButton.addEventListener('click', () => movePiece('right'));

// Initialize the puzzle
preloadImage();