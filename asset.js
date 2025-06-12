// assets.js: Lädt und verwaltet alle Spiel-Assets (Bilder und Sounds).

function loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

function loadAudio(src, loop = false, volume = 1.0) {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    return audio;
}

export const IMAGES = {
    background: loadImage("./IMAGES/flappybirdbg.png"),
    bird: loadImage("./IMAGES/flappybird.png"),
    topPipe: loadImage("./IMAGES/toppipe.png"),
    bottomPipe: loadImage("./IMAGES/bottompipe.png"),
    logo: loadImage("./IMAGES/flappyBirdLogo.png"),
    playButton: loadImage("./IMAGES/flappyBirdPlayButton.png"),
    gameOver: loadImage("./IMAGES/flappy-gameover.png"),
};

export const SOUNDS = {
    background: loadAudio("./SOUNDS/eccentric_enemies.ogg", true, 0.3),
    flap: loadAudio("./SOUNDS/natterers.mp3"),
    gameOver: loadAudio("./SOUNDS/pipistrelle.mp3"),
};