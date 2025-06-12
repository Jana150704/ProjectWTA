// bird.js: Definiert die Bird-Klasse.

import { BIRD_DEFAULTS, PHYSICS } from './config.js';

export class Bird {
    constructor() {
        this.x = BIRD_DEFAULTS.START_X;
        this.y = BIRD_DEFAULTS.START_Y;
        this.width = BIRD_DEFAULTS.WIDTH;
        this.height = BIRD_DEFAULTS.HEIGHT;
        this.velocityY = 0;
    }

    update() {
        this.velocityY += PHYSICS.GRAVITY;
        this.y = Math.max(this.y + this.velocityY, 0); // Verhindert, dass der Vogel den oberen Rand verlässt
    }

    flap() {
        this.velocityY = BIRD_DEFAULTS.JUMP_VELOCITY;
    }

    draw(context, birdImage) {
        context.drawImage(birdImage, this.x, this.y, this.width, this.height);
    }

    reset() {
        this.y = BIRD_DEFAULTS.START_Y;
        this.velocityY = 0;
    }
}