// input.js: Richtet die Eingabe-Handler ein.

import { GAME_STATE } from './config.js';

export function setupInputHandlers(game) {
    let inputLocked = false;
    let gameMusicStarted = false;

    const handleAction = () => {
        if (inputLocked) return;
        if (game.currentState === GAME_STATE.PAUSED) return; // Verhindert Aktionen im Pausenmenü

        // Startet die Hintergrundmusik beim ersten Tastendruck
        if (!gameMusicStarted) {
            game.startBackgroundMusic();
            gameMusicStarted = true;
        }

        game.onInputAction();
    };
    
    document.addEventListener("keydown", (e) => {
        // Pausieren mit Escape-Taste
        if (e.code === 'Escape') {
            if (game.currentState === GAME_STATE.PLAYING || game.currentState === GAME_STATE.PAUSED) {
                game.togglePause();
            }
        }
        
        if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyX") {
            handleAction();
        }
    });

    document.addEventListener("mousedown", () => {
        handleAction();
    });

    // Sperrt die Eingabe kurz nach dem Game Over, um versehentliche Neustarts zu verhindern
    game.onGameOver = () => {
        inputLocked = true;
        setTimeout(() => {
            inputLocked = false;
        }, 1000);
    };
}