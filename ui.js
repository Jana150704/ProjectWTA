// ui.js: Funktionen zum Rendern von UI-Elementen.

import { BOARD_WIDTH, BOARD_HEIGHT } from './config.js';

export function renderMenu(context, images) {
    const playButton = {
        x: BOARD_WIDTH / 2 - 115.5 / 2,
        y: BOARD_HEIGHT / 2 - 64 / 2,
        width: 115,
        height: 64
    };
    const logo = {
        x: BOARD_WIDTH / 2 - 300 / 2,
        y: BOARD_HEIGHT / 4,
        width: 300
    };

    context.drawImage(images.background, 0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    context.drawImage(images.playButton, playButton.x, playButton.y, playButton.width, playButton.height);
    
    let scaledHeight = (images.logo.height / images.logo.width) * logo.width;
    context.drawImage(images.logo, logo.x, logo.y, logo.width, scaledHeight);
}

export function renderScore(context, score) {
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.textAlign = "left";
    context.fillText(Math.floor(score), 5, 45);
}

export function renderGameOver(context, score, images) {
    const imgWidth = 400;
    const imgHeight = 80;
    const x = (BOARD_WIDTH - imgWidth) / 2;
    const y = BOARD_HEIGHT / 3;

    context.drawImage(images.gameOver, x, y, imgWidth, imgHeight);

    const scoreText = `Your score: ${Math.floor(score)}`;
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.textAlign = "center";
    context.fillText(scoreText, BOARD_WIDTH / 2, y + imgHeight + 50);
}

export function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}