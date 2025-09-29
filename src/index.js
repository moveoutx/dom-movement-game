import './styles.css';
import characterImage from './assets/character.png';

class Game {
  constructor() {
    this.boardSize = 4;
    this.currentPosition = null;
    this.character = null;
    this.cells = [];
    this.moveInterval = null;
    this.init();
  }

  init() {
    this.createGameBoard();
    this.createCharacter();
    this.startMovement();
  }

  createGameBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    for (let i = 0; i < this.boardSize * this.boardSize; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      gameBoard.appendChild(cell);
      this.cells.push(cell);
    }
  }

  createCharacter() {
    this.character = document.createElement('img');
    this.character.src = characterImage;
    this.character.className = 'character';
    this.character.alt = 'Game Character';

    // Set random initial position
    this.setRandomPosition();
  }

  setRandomPosition() {
    const newPosition = Math.floor(Math.random() * this.boardSize * this.boardSize);
    
    // Remove from current position if exists
    if (this.currentPosition !== null && this.character.parentNode) {
      this.character.parentNode.removeChild(this.character);
    }

    // Add to new position (without removeChild - просто меняем родителя)
    this.cells[newPosition].appendChild(this.character);
    this.currentPosition = newPosition;
  }

  moveCharacter() {
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * this.boardSize * this.boardSize);
    } while (newPosition === this.currentPosition);

    // Add moving animation
    this.character.classList.add('moving');
    
    // Move character by changing parent (без removeChild)
    this.cells[newPosition].appendChild(this.character);
    this.currentPosition = newPosition;

    // Remove animation class after transition
    setTimeout(() => {
      this.character.classList.remove('moving');
    }, 500);
  }

  startMovement() {
    // Move every 2 seconds
    this.moveInterval = setInterval(() => {
      this.moveCharacter();
    }, 2000);
  }

  stopMovement() {
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
    }
  }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Game();
});

// Export for testing
export default Game;