// pipe.js: Definiert die PipeManager-Klasse.

import { PIPE_DEFAULTS, PHYSICS, BOARD_WIDTH, BOARD_HEIGHT } from './config.js';

export class PipeManager {
    constructor() {
        this.pipes = [];
        this.intervalId = null;
        // Speichert die Y-Koordinate der Mitte der letzten Lücke
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

        // 1. Definiere Grenzen, damit die Lücke nicht zu nah am Rand ist
        const minGapCenterY = (PIPE_DEFAULTS.GAP / 2) + 50; // 50px Puffer oben
        const maxGapCenterY = BOARD_HEIGHT - (PIPE_DEFAULTS.GAP / 2) - 50; // 50px Puffer unten

        // 2. Berechne eine zufällige Veränderung basierend auf der letzten Position
        // Wir erhöhen den Multiplikator hier noch weiter, um größere Sprünge zu erzwingen
        // und somit die Wahrscheinlichkeit gleicher Höhen zu reduzieren.
        // ⬇️ GEÄNDERTE ZEILE HIER ⬇️
        const verticalChange = (Math.random() * 2 - 1) * PIPE_DEFAULTS.VERTICAL_VARIATION * 2.5; // Deutlich erhöhte Variation
        let nextGapCenterY = this.lastPipeY + verticalChange;

        // 3. Stelle sicher, dass die neue Position innerhalb der Grenzen liegt (Clamping)
        nextGapCenterY = Math.max(minGapCenterY, Math.min(nextGapCenterY, maxGapCenterY));
        
        // 4. Berechne die Höhe des oberen Rohrs aus der Mitte der Lücke
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

        // 5. Speichere die neue Position für die nächste Berechnung
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
        // Setze auch die Startposition der Lücke zurück
        this.lastPipeY = BOARD_HEIGHT / 2;
    }
}