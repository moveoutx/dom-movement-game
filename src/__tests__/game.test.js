import Game from '../index';

// Mock для requestAnimationFrame
global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0);
};

// Mock для URL.createObjectURL если нужно
global.URL.createObjectURL = jest.fn();

describe('Game', () => {
  let game;

  beforeEach(() => {
    // Создаем чистый DOM для каждого теста
    document.body.innerHTML = `
      <div id="game-board"></div>
    `;

    // Сбрасываем все моки
    jest.clearAllMocks();

    game = new Game();
  });

  afterEach(() => {
    if (game.stopMovement) {
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

    // Mock Math.random чтобы контролировать новую позицию
    const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.5);

    game.moveCharacter();

    expect(game.currentPosition).not.toBe(initialPosition);
    expect(game.currentPosition).toBe(8); // 0.5 * 16 = 8

    mockRandom.mockRestore();
  });

  test('should not move to same position', () => {
    const initialPosition = game.currentPosition;

    // Mock Math.random чтобы сначала возвращалась та же позиция, потом другая
    let callCount = 0;
    jest.spyOn(Math, 'random').mockImplementation(() => {
      callCount++;
      // Первый вызов возвращает ту же позицию, второй - другую
      return callCount === 1 ? initialPosition / 16 : (initialPosition + 1) / 16;
    });

    game.moveCharacter();

    expect(game.currentPosition).not.toBe(initialPosition);
    expect(Math.random).toHaveBeenCalledTimes(2);

    jest.restoreAllMocks();
  });

  test('should start and stop movement', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    game.startMovement();
    expect(setIntervalSpy).toHaveBeenCalled();

    game.stopMovement();
    expect(clearIntervalSpy).toHaveBeenCalled();

    setIntervalSpy.mockRestore();
    clearIntervalSpy.mockRestore();
  });
});