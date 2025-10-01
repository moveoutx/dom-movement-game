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
        gameBoard.innerHTML = '';

        for (let i = 0; i < this.boardSize * this.boardSize; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.index = i;
            gameBoard.append(cell);
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

        this.clearCharacterFromAllCells();

        this.addCharacterToCell(newPosition);
        this.currentPosition = newPosition;
    }

    clearCharacterFromAllCells() {
        this.cells.forEach(cell => {
            const existingCharacter = cell.querySelector('.character');
            if (existingCharacter) {
                cell.innerHTML = '';
            }
        });
    }

    addCharacterToCell(position) {
        const characterClone = this.character.cloneNode(true);
        this.cells[position].append(characterClone);
        this.character = characterClone;
    }

    moveCharacter() {
        let newPosition;
        do {
            newPosition = Math.floor(Math.random() * this.boardSize * this.boardSize);
        } while (newPosition === this.currentPosition);

        this.moveCharacterToPosition(newPosition);
    }

    moveCharacterToPosition(newPosition) {
        this.character.classList.add('moving');

        const characterHTML = this.character.outerHTML;

        this.cells[this.currentPosition].innerHTML = '';
        this.cells[newPosition].innerHTML = characterHTML;

        this.character = this.cells[newPosition].querySelector('.character');
        this.currentPosition = newPosition;

        setTimeout(() => {
            this.character.classList.remove('moving');
        }, 500);
    }

    moveCharacterWithReplace(newPosition) {
        this.character.classList.add('moving');

        const newCell = this.cells[newPosition];

        if (newCell.firstChild) {
            const characterClone = this.character.cloneNode(true);
            newCell.firstChild.replaceWith(characterClone);
        } else {
            newCell.append(this.character.cloneNode(true));
        }

        this.cells[this.currentPosition].innerHTML = '';

        this.character = newCell.querySelector('.character');
        this.currentPosition = newPosition;

        setTimeout(() => {
            this.character.classList.remove('moving');
        }, 500);
    }

    moveCharacterWithInsertHTML(newPosition) {
        this.character.classList.add('moving');

        const currentCell = this.cells[this.currentPosition];
        const newCell = this.cells[newPosition];

        currentCell.innerHTML = '';

        newCell.insertAdjacentHTML('beforeend', this.character.outerHTML);

        this.character = newCell.querySelector('.character');
        this.currentPosition = newPosition;

        setTimeout(() => {
            this.character.classList.remove('moving');
        }, 500);
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

    getGameState() {
        return {
            currentPosition: this.currentPosition,
            totalCells: this.cells.length,
            isMoving: this.moveInterval !== null
        };
    }

    getCurrentPositionInfo() {
        if (this.currentPosition === null) return null;

        const row = Math.floor(this.currentPosition / this.boardSize);
        const col = this.currentPosition % this.boardSize;

        return {
            index: this.currentPosition,
            row: row + 1,
            column: col + 1,
            cell: this.cells[this.currentPosition]
        };
    }
}

export default Game;
