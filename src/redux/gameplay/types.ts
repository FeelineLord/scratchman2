export const START_GAME = 'START_GAME';
export const SET_BONUS = 'SET_BONUS';
export const SET_LUCKY = 'SET_LUCKY';
export const ADD_SCRATCHED = 'SET_SCRATCHED';
export const ADD_LUCKY_SCRATCHED = 'SET_LUCKY_SCRATCHED';
export const SET_GAIN = 'SET_GAIN';
export const SET_MOOD = 'SET_MOOD';
export const FINISH_GAME = 'FINISH_GAME';

interface StartGameAction {
  type: typeof START_GAME
}

interface SetBonusAction {
  type: typeof SET_BONUS
  payload: boolean
}

interface SetLuckyAction {
  type: typeof SET_LUCKY
  payload: string
}

interface AddScratchedAction {
  type: typeof ADD_SCRATCHED
  payload: number
}

interface AddLuckyScratchedAction {
  type: typeof ADD_LUCKY_SCRATCHED
  payload: number
}

interface SetGainAction {
  type: typeof SET_GAIN
  payload: {
    gainType: string
    gainAmount: number
  }
}

interface SetMoodAction {
  type: typeof SET_MOOD
  payload: string
}

interface FinishGameAction {
  type: typeof FINISH_GAME
}

export type GameplayActionTypes =
  StartGameAction |
  SetBonusAction |
  SetLuckyAction |
  AddScratchedAction |
  AddLuckyScratchedAction |
  SetGainAction |
  SetMoodAction |
  FinishGameAction
