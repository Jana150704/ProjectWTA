
import { PIPE_DEFAULTS, PHYSICS, BOARD_WIDTH, BOARD_HEIGHT } from './config.js';

export class PipeManager {
    constructor() {
        this.pipes = [];
        this.intervalId = null;
        this.lastPipeY = BOARD_HEIGHT / 2;
    }

    startPlacingPipes() {
        if (this.intervalId) clearInterval(this.intervalId);
        this.intervalId = setInterval(() => this.createPipes(), PIPE_DEFAULTS.INTERVAL);
    }

    stopPlacingPipes() {
        clearInterval(this.intervalId);
    }

    createPipes() {

        const minGapCenterY = (PIPE_DEFAULTS.GAP / 2) + 50; 
        const maxGapCenterY = BOARD_HEIGHT - (PIPE_DEFAULTS.GAP / 2) - 50; 

        const verticalChange = (Math.random() * 2 - 1) * PIPE_DEFAULTS.VERTICAL_VARIATION * 2.5;
        let nextGapCenterY = this.lastPipeY + verticalChange;

        nextGapCenterY = Math.max(minGapCenterY, Math.min(nextGapCenterY, maxGapCenterY));

        const topPipeHeight = nextGapCenterY - (PIPE_DEFAULTS.GAP / 2);


        const topPipe = {
            x: BOARD_WIDTH,
            y: 0,
            width: PIPE_DEFAULTS.WIDTH,
            height: topPipeHeight,
            passed: false
        };

        const bottomPipe = {
            x: BOARD_WIDTH,
            y: topPipeHeight + PIPE_DEFAULTS.GAP,
            width: PIPE_DEFAULTS.WIDTH,
            height: BOARD_HEIGHT - topPipeHeight - PIPE_DEFAULTS.GAP,
            passed: false
        };
        
        this.pipes.push(topPipe, bottomPipe);

        this.lastPipeY = nextGapCenterY;
    }

    update() {
        this.pipes.forEach(pipe => {
            pipe.x += PHYSICS.PIPE_SPEED;
        });

        this.pipes = this.pipes.filter(pipe => pipe.x + pipe.width > 0);
    }

    draw(context, topPipeImg, bottomPipeImg) {
        this.pipes.forEach((pipe, index) => {
            const img = (index % 2 === 0) ? topPipeImg : bottomPipeImg;
            context.drawImage(img, pipe.x, pipe.y, pipe.width, pipe.height);
        });
    }

    reset() {
        this.pipes = [];
        this.stopPlacingPipes();
        this.lastPipeY = BOARD_HEIGHT / 2;
    }
}