
import { GAME_STATE } from './config.js';
import { Bird } from './bird.js';
import { PipeManager } from './pipe.js';
import { SOUNDS } from './assets.js';
import { detectCollision } from './ui.js';

export class Game {
    constructor(pauseMenuElement) {
        this.currentState = GAME_STATE.MENU;
        this.bird = new Bird();
        this.pipeManager = new PipeManager();
        this.score = 0;
        this.onGameOver = () => {};
        this.pauseMenu = pauseMenuElement;
    }

    start() {
        this.currentState = GAME_STATE.PLAYING;
        this.reset();
        this.pipeManager.startPlacingPipes();
    }
    
    startBackgroundMusic() {
        SOUNDS.background.play().catch(e => console.error("Autoplay wurde blockiert:", e));
    }

    reset() {
        this.bird.reset();
        this.pipeManager.reset();
        this.score = 0;
    }
    
    goToMenu() {
        this.currentState = GAME_STATE.MENU;
        this.reset();
    }

    update() {
        if (this.currentState !== GAME_STATE.PLAYING) return;

        this.bird.update();
        this.pipeManager.update();

        if (this.bird.y > 950) {
            this.setGameOver();
        }
        
        this.pipeManager.pipes.forEach(pipe => {
            if (detectCollision(this.bird, pipe)) {
                this.setGameOver();
            }

            if (!pipe.passed && this.bird.x > pipe.x + pipe.width) {
                this.score += 0.5;
                pipe.passed = true;
            }
        });
    }
    
    togglePause() {
        if (this.currentState === GAME_STATE.PLAYING) {
            this.currentState = GAME_STATE.PAUSED;
            this.pipeManager.stopPlacingPipes();
            this.pauseMenu.classList.remove('hidden');
        } else if (this.currentState === GAME_STATE.PAUSED) {
            this.currentState = GAME_STATE.PLAYING;
            this.pipeManager.startPlacingPipes();
            this.pauseMenu.classList.add('hidden');
        }
    }

    setMusicVolume(volume) {
        SOUNDS.background.volume = volume;
    }

    setEffectsVolume(volume) {
        SOUNDS.flap.volume = volume;
        SOUNDS.gameOver.volume = volume;
    }

    onInputAction() {
        if (this.currentState === GAME_STATE.PAUSED) return;

        switch (this.currentState) {
            case GAME_STATE.MENU:
                this.start();
                break;
            case GAME_STATE.PLAYING:
                this.bird.flap();
                SOUNDS.flap.currentTime = 0;
                SOUNDS.flap.play();
                break;
            case GAME_STATE.GAME_OVER:
                this.goToMenu();
                break;
        }
    }
    
    draw(context, images) {
        context.drawImage(images.background, 0, 0, context.canvas.width, context.canvas.height);
        this.bird.draw(context, images.bird);
        this.pipeManager.draw(context, images.topPipe, images.bottomPipe);
    }
    
    setGameOver() {
        if (this.currentState === GAME_STATE.PLAYING) {
            SOUNDS.gameOver.play();
            this.pipeManager.stopPlacingPipes();
            this.currentState = GAME_STATE.GAME_OVER;
            this.onGameOver();
        }
    }
}