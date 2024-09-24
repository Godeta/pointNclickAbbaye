const gridElement = document.getElementById('grid');
const resetButton = document.getElementById('reset-button');
const rows = 10;
const cols = 15;
let knightPosition = { x: 0, y: 0 };
let treasurePosition = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
const obstacles = []; // Array to hold obstacle positions
const purpleObstacles = []; // Array to hold purple obstacle

// Initialize the grid
function createGrid() {
    gridElement.innerHTML = '';
    obstacles.length = 0; // Clear previous obstacles
    placeObstacles(); // Place obstacles randomly

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = x;
            cell.dataset.y = y;

            // Check if the cell is an obstacle
            if (isObstacle(x, y)) {
                cell.classList.add('obstacle'); // Add obstacle class
                obstacles.push({ x, y }); // Store obstacle position
            }else if (isPurpleObstacle(x, y)) {
                cell.classList.add('purple-obstacle'); // Add purple obstacle class
                purpleObstacles.push({ x, y }); // Store purple obstacle position
            }

            cell.addEventListener('click', moveKnight);
            cell.addEventListener('mouseover', highlightValidMoves);
            cell.addEventListener('mouseout', clearHighlights);
            gridElement.appendChild(cell);
        }
    }
    placeKnight();
    placeTreasure();
}

// Place the knight on the grid
function placeKnight() {
    const knightCell = gridElement.children[knightPosition.y * cols + knightPosition.x];
    const knightDiv = document.createElement('div');
    knightDiv.classList.add('knight');
    knightCell.appendChild(knightDiv);
}
function placeTreasure() {
    const treasureCell = gridElement.children[treasurePosition.y * cols + treasurePosition.x];
    treasureCell.classList.add('cell'); // Add the cell class to the treasure cell
    const treasureDiv = document.createElement('div');
    treasureDiv.classList.add('treasure');
    treasureCell.appendChild(treasureDiv);
    treasureDiv.dataset.x = treasurePosition.x;
    treasureDiv.dataset.y = treasurePosition.y;
}
// Function to randomly place obstacles
function placeObstacles() {
    const numberOfObstacles = 10; // Define how many obstacles to place
    const numberOfPurpleObstacles = 6; // Define how many purple obstacles to place
    while (obstacles.length < numberOfObstacles) {
        const x = Math.floor(Math.random() * cols);
        const y = Math.floor(Math.random() * rows);
        if (!isObstacle(x, y) && !(x === knightPosition.x && y === knightPosition.y) && !(x === treasurePosition.x && y === treasurePosition.y)) {
            obstacles.push({ x, y });
        }
    }

    while (purpleObstacles.length < numberOfPurpleObstacles) {
        const x = Math.floor(Math.random() * cols);
        const y = Math.floor(Math.random() * rows);
        if (!isObstacle(x, y) && !isPurpleObstacle(x, y) && !(x === knightPosition.x && y === knightPosition.y) && !(x === treasurePosition.x && y === treasurePosition.y)) {
            purpleObstacles.push({ x, y });
        }
    }
}

// Check if a cell is an obstacle
function isObstacle(x, y) {
    return obstacles.some(obstacle => obstacle.x === x && obstacle.y === y);
}

// Check if a cell is a purple obstacle
function isPurpleObstacle(x, y) {
    return purpleObstacles.some(obstacle => obstacle.x === x && obstacle.y === y);
}

// Move the knight to the clicked cell
function moveKnight(event) {
    const targetX = parseInt(event.target.dataset.x);
    const targetY = parseInt(event.target.dataset.y);

    // Check if the move is valid (one step in any direction)
    if ((Math.abs(targetX - knightPosition.x) === 1 && targetY === knightPosition.y) ||
        (Math.abs(targetY - knightPosition.y) === 1 && targetX === knightPosition.x)) {
        // Clear the current knight position
        clearKnight();
        knightPosition = { x: targetX, y: targetY };
        placeKnight();
        checkWin();
    }

    // Check if the knight clicked on the treasure
    if (targetX === treasurePosition.x && targetY === treasurePosition.y) {
        // Check if the knight is adjacent to the treasure
        if (isAdjacentToTreasure(knightPosition, treasurePosition)) {
            clearTreasure();
            alert('You collected the treasure!');
        }
        
    }

    // Check if the knight stepped on an obstacle
    if (isObstacle(targetX, targetY)) {
        teleportKnight(); // Teleport the knight to a random position
    }

    // Check if the knight stepped on a purple obstacle
    if (isPurpleObstacle(targetX, targetY)) {
        changeTreasurePosition(); // Change the treasure position
    }
}

// Change the treasure position to a new random location
function changeTreasurePosition() {
    let newX, newY;
    do {
        newX = Math.floor(Math.random() * cols);
        newY = Math.floor(Math.random() * rows);
    } while (isObstacle(newX, newY) || (newX === knightPosition.x && newY === knightPosition.y));

    treasurePosition = { x: newX, y: newY };
    placeTreasure(); // Place the treasure at the new position
}

// Teleport the knight to a random position on the grid
function teleportKnight() {
    let newX, newY;
    do {
        newX = Math.floor(Math.random() * cols);
        newY = Math.floor(Math.random() * rows);
    } while (isObstacle(newX, newY) || (newX === knightPosition.x && newY === knightPosition.y) || (newX === treasurePosition.x && newY === treasurePosition.y));

    clearKnight();
    knightPosition = { x: newX, y: newY };
    placeKnight();
}

// Clear the knight from the previous position
function clearKnight() {
    const knightCell = gridElement.children[knightPosition.y * cols + knightPosition.x];
    knightCell.innerHTML = ''; // Remove the knight div
}

// Clear the treasure from the grid
function clearTreasure() {
    const treasureCell = gridElement.children[treasurePosition.y * cols + treasurePosition.x];
    treasureCell.innerHTML = ''; // Remove the treasure div
}

// Check if the knight has reached the treasure
function checkWin() {
    if (knightPosition.x === treasurePosition.x && knightPosition.y === treasurePosition.y) {
        showFinishScreen();
    }
}
// Check if the knight is adjacent to the treasure
function isAdjacentToTreasure(knightPos, treasurePos) {
    return (Math.abs(knightPos.x - treasurePos.x) === 1 && knightPos.y === treasurePos.y) ||
           (Math.abs(knightPos.y - treasurePos.y) === 1 && knightPos.x === treasurePos.x);
}
// Highlight valid moves on mouse hover
function highlightValidMoves(event) {
    const targetX = parseInt(event.target.dataset.x);
    const targetY = parseInt(event.target.dataset.y);

    // Check if the hovered cell is a valid move
    if ((Math.abs(targetX - knightPosition.x) === 1 && targetY === knightPosition.y) ||
        (Math.abs(targetY - knightPosition.y) === 1 && targetX === knightPosition.x)) {
        event.target.classList.add('nearby'); // Highlight valid move
    }
}

// Clear highlights when mouse leaves the cell
function clearHighlights() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('nearby'); // Remove highlight
    });
}

// Reset the game
resetButton.addEventListener('click', () => {
    resetGame();
});

// Show finish screen
function showFinishScreen() {
    const finishScreen = document.createElement('div');
    finishScreen.id = 'finish-screen';
    finishScreen.innerHTML = `
        <h2>Congratulations!</h2>
        <p>You found the treasure!</p>
        <button id="close-finish-screen">Close</button>
        <img src='../images/launus/Launus.png' alt="Knight" class="knight-image" />
    `;
    document.body.appendChild(finishScreen);

    // Close button functionality
    document.getElementById('close-finish-screen').addEventListener('click', () => {
        finishScreen.remove();
        resetGame();
    });
}

// Reset the game state
function resetGame() {
    knightPosition = { x: 0, y: 0 };
    treasurePosition = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    createGrid();
}
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${title}</h2>
            <p>${content}</p>
            <button id="close-modal">Close</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('close-modal').addEventListener('click', () => {
        modal.remove();
    });
}
// Initialize the game
createGrid();