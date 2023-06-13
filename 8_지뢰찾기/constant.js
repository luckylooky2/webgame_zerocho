export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 다 opened
};

// 하나의 객체로 묶기...
export const START_GAME = "START_GAME";
export const RESET_GAME = "RESET_GAME";
export const WIN_GAME = "WIN_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMAL_CELL = "NORMAL_CELL";
export const INCREMENT_TIMER = "INCREMENT_TIMER";
