import {
  START_GAME,
  SET_BONUS,
  SET_LUCKY,
  ADD_SCRATCHED,
  ADD_LUCKY_SCRATCHED,
  SET_GAIN,
  SET_MOOD,
  FINISH_GAME,
  GameplayActionTypes
} from './types';

export interface GameplayStateInterface {
  gameIsRunning: boolean
  gameWasFinished: boolean
  bonusIsUnlocked: boolean
  luckyItem: string
  scratchedCards: number
  scratchedLuckyCards: number
  gainType: string
  gainAmount: number
  mood: string
}

const initialState: GameplayStateInterface = {
  gameIsRunning: false,
  gameWasFinished: true,
  bonusIsUnlocked: false,
  luckyItem: 'bonfire',
  scratchedCards: 0,
  scratchedLuckyCards: 0,
  gainType: 'coin',
  gainAmount: 0,
  mood: 'red_idle_st'
};

export const gameplayReducer = (
  state: GameplayStateInterface = initialState,
  action: GameplayActionTypes
): GameplayStateInterface => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        gameIsRunning: true,
        gameWasFinished: false
      };

    case SET_LUCKY:
      return {
        ...state,
        luckyItem: action.payload
      };

    case SET_BONUS:
      return {
        ...state,
        bonusIsUnlocked: action.payload
      }

    case ADD_SCRATCHED:
      return {
        ...state,
        scratchedCards: action.payload
      };

    case ADD_LUCKY_SCRATCHED:
      return {
        ...state,
        scratchedLuckyCards: action.payload
      };

    case SET_GAIN:
      return {
        ...state,
        gainType: action.payload.gainType,
        gainAmount: action.payload.gainAmount
      };

    case SET_MOOD:
      return {
        ...state,
        mood: action.payload
      };

    case FINISH_GAME:
      return {
        ...state,
        gameIsRunning: false,
        gameWasFinished: true
      };

    default:
      return state;
  }
};
