
import { GAME_STATE } from './config.js';

export function setupInputHandlers(game) {
    let inputLocked = false;
    let gameMusicStarted = false;

    const handleAction = () => {
        if (inputLocked) return;
        if (game.currentState === GAME_STATE.PAUSED) return;

        if (!gameMusicStarted) {
            game.startBackgroundMusic();
            gameMusicStarted = true;
        }

        game.onInputAction();
    };
    
    document.addEventListener("keydown", (e) => {
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

    game.onGameOver = () => {
        inputLocked = true;
        setTimeout(() => {
            inputLocked = false;
        }, 1000);
    };
}