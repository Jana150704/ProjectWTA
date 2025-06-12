// main.js: Der Haupteinstiegspunkt des Spiels.

import { BOARD_WIDTH, BOARD_HEIGHT, GAME_STATE } from './config.js';
import { IMAGES, SOUNDS } from './assets.js';
import { Game } from './game.js';
import { renderMenu, renderScore, renderGameOver } from './ui.js';
import { setupInputHandlers } from './input.js';

window.onload = () => {
    const board = document.getElementById("board");
    board.width = BOARD_WIDTH;
    board.height = BOARD_HEIGHT;
    const context = board.getContext("2d");

    // UI-Elemente aus dem DOM holen
    const pauseMenuElement = document.getElementById('pauseMenu');
    const volumeSlider = document.getElementById('volumeSlider');
    const effectsSlider = document.getElementById('effectsSlider');
    const resumeButton = document.getElementById('resumeButton');

    const game = new Game(pauseMenuElement);
    
    setupInputHandlers(game);

    // Event-Listener für die UI-Elemente im Pause-Menü
    resumeButton.addEventListener('click', () => {
        game.togglePause();
    });

    volumeSlider.addEventListener('input', (e) => {
        game.setMusicVolume(e.target.value);
    });

    effectsSlider.addEventListener('input', (e) => {
        game.setEffectsVolume(e.target.value);
    });
    
    // Initiale Werte der Slider setzen
    volumeSlider.value = SOUNDS.background.volume;
    effectsSlider.value = SOUNDS.flap.volume; // Setzt den Wert basierend auf einem der Effekt-Sounds

    function gameLoop() {
        requestAnimationFrame(gameLoop);
        context.clearRect(0, 0, board.width, board.height);
        
        game.update();
        
        switch(game.currentState) {
            case GAME_STATE.MENU:
                renderMenu(context, IMAGES);
                break;
            case GAME_STATE.PAUSED:
            case GAME_STATE.PLAYING:
                game.draw(context, IMAGES);
                renderScore(context, game.score);
                break;
            case GAME_STATE.GAME_OVER:
                game.draw(context, IMAGES);
                renderGameOver(context, game.score, IMAGES);
                break;
        }
    }

    IMAGES.background.onload = () => {
        requestAnimationFrame(gameLoop);
    };
    if (IMAGES.background.complete) {
        requestAnimationFrame(gameLoop);
    }
};