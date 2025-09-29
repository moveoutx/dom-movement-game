import Game from './src/index.js';

describe('Game', () => {
  let game;

  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = `
      <div id="game-board"></div>
    `;
    game = new Game();
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
    game.moveCharacter();
    expect(game.currentPosition).not.toBe(initialPosition);
  });
});