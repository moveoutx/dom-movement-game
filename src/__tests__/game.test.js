import { Game } from '../game';

global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0);
};

describe('Game', () => {
  let game;

  beforeEach(() => {
    document.body.innerHTML = '<div id="game-board"></div>';
    jest.clearAllMocks();
    game = new Game();
  });

  afterEach(() => {
    if (game && game.stopMovement) {
      game.stopMovement();
    }
  });

  test('should create game board with 16 cells', () => {
    const cells = document.querySelectorAll('.cell');
    expect(cells.length).toBe(16);
  });

  test('should create character element', () => {
    expect(game.character).toBeDefined();
    expect(game.character.tagName).toBe('IMG');
    expect(game.character.className).toContain('character');
  });

  test('should set initial random position', () => {
    expect(game.currentPosition).toBeDefined();
    expect(game.currentPosition).toBeGreaterThanOrEqual(0);
    expect(game.currentPosition).toBeLessThan(16);
  });

  test('should move character to different position', () => {
    const initialPosition = game.currentPosition;

    const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    game.moveCharacter();

    expect(game.currentPosition).not.toBe(initialPosition);
    expect(game.currentPosition).toBe(8);

    mockRandom.mockRestore();
  });

  test('should clear character from all cells', () => {
    game.setRandomPosition();

    const cellsWithCharacter = Array.from(document.querySelectorAll('.cell'))
        .filter(cell => cell.querySelector('.character'));

    expect(cellsWithCharacter.length).toBe(1);

    game.clearCharacterFromAllCells();

    const cellsWithCharacterAfterClear = Array.from(document.querySelectorAll('.cell'))
        .filter(cell => cell.querySelector('.character'));

    expect(cellsWithCharacterAfterClear.length).toBe(0);
  });

  test('should get game state', () => {
    const state = game.getGameState();

    expect(state).toHaveProperty('currentPosition');
    expect(state).toHaveProperty('totalCells', 16);
    expect(state).toHaveProperty('isMoving', true);
  });
});
