// config.js: Speichert alle Konstanten und Konfigurationen des Spiels.

export const BOARD_WIDTH = 700;
export const BOARD_HEIGHT = 950;

export const BIRD_DEFAULTS = {
    WIDTH: 40,
    HEIGHT: 30,
    START_X: 50,
    START_Y: BOARD_HEIGHT / 2,
    JUMP_VELOCITY: -6,
};

export const PHYSICS = {
    GRAVITY: 0.5,
    PIPE_SPEED: -2,
};

export const PIPE_DEFAULTS = {
    WIDTH: 50,
    GAP: 130,
    INTERVAL: 1500, // Zeit in ms zwischen dem Erscheinen neuer Rohre
    VERTICAL_VARIATION: 200, // Maximale vertikale Abweichung zur letzten Lücke
};

// Spielzustände
export const GAME_STATE = {
    MENU: "menu",
    PLAYING: "playing",
    GAME_OVER: "gameOver",
    PAUSED: "paused",
};