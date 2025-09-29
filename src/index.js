import './styles.css';
import { Game } from './game';

document.addEventListener('DOMContentLoaded', () => {
  new Game();
});

// Экспортируем для тестов если нужно
export { Game };
