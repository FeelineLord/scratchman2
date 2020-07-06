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

interface gainInterface {
  gainType: string
  gainAmount: number
}

export const startGame = (): GameplayActionTypes => ({
  type: START_GAME
});

export const setBonus = (value): GameplayActionTypes => ({
  type: SET_BONUS,
  payload: value
})

export const setLucky = (item: string): GameplayActionTypes => ({
  type: SET_LUCKY,
  payload: item
});

export const addScratched = (previous: number): GameplayActionTypes => ({
  type: ADD_SCRATCHED,
  payload: previous + 1
});

export const addLuckyScratched = (previous: number): GameplayActionTypes => ({
  type: ADD_LUCKY_SCRATCHED,
  payload: previous + 1
});

export const setGain = (gain: gainInterface): GameplayActionTypes => ({
  type: SET_GAIN,
  payload: gain
});

export const setMood = (mood: string): GameplayActionTypes => ({
  type: SET_MOOD,
  payload: mood
});

export const finishGame = (): GameplayActionTypes => ({
  type: FINISH_GAME
});
