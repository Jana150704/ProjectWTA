
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
    GAP: 200,
    INTERVAL: 1500, 
    VERTICAL_VARIATION: 150, 
};

export const GAME_STATE = {
    MENU: "menu",
    PLAYING: "playing",
    GAME_OVER: "gameOver",
    PAUSED: "paused",
};