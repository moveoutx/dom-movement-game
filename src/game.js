import characterImage from './assets/character.png';

export class Game {
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
        if (!gameBoard) return;

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

        this.setRandomPosition();
    }

    setRandomPosition() {
        const newPosition = Math.floor(Math.random() * this.boardSize * this.boardSize);

        if (this.currentPosition !== null && this.character.parentNode) {
            this.character.parentNode.removeChild(this.character);
        }

        if (this.cells[newPosition]) {
            this.cells[newPosition].appendChild(this.character);
            this.currentPosition = newPosition;
        }
    }

    moveCharacter() {
        let newPosition;
        do {
            newPosition = Math.floor(Math.random() * this.boardSize * this.boardSize);
        } while (newPosition === this.currentPosition && this.boardSize * this.boardSize > 1);

        if (this.cells[newPosition] && this.character) {
            this.character.classList.add('moving');
            this.cells[newPosition].appendChild(this.character);
            this.currentPosition = newPosition;

            setTimeout(() => {
                if (this.character) {
                    this.character.classList.remove('moving');
                }
            }, 500);
        }
    }

    startMovement() {
        this.moveInterval = setInterval(() => {
            this.moveCharacter();
        }, 2000);
    }

    stopMovement() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
            this.moveInterval = null;
        }
    }
}
