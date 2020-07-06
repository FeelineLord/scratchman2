import background from './images/magic_forest_bg.png';

import coin from './images/magic_forest_coin_icon_big.png';
import dollar from './images/magic_forest_dollar_icon.png';
import question from './images/magic_forest_question_icon.png';

import winFrame from './images/magic_forest_frame1.png';
import startFrame from './images/magic_forest_frame2.png';
import bonusFrame from './images/magic_forest_bonus_frame.png';
import scratch from './images/magic_forest_scratch_frame.png';
import scratchBonus from './images/magic_forest_scratch_frame_big.png';

import bonfire from './images/magic_forest_bonfire.png';
import bow from './images/magic_forest_bow.png';
import leaf from './images/magic_forest_leaf.png';
import rope from './images/magic_forest_rope.png';
import tent from './images/magic_forest_tent.png';

export const preloadTextures = {
  backgroundScreen: background,
};

export const textures = {
  bonusFrameCard: bonusFrame,
  scratchCard: scratch,
  scratchBonusCard: scratchBonus,
  winFramePopups: winFrame,
  startFramePopups: startFrame,
  coinPopups: coin,
  dollarPopups: dollar,
  questionPopups: question,
  bonfireUniversal: bonfire,
  bowUniversal: bow,
  leafUniversal: leaf,
  ropeUniversal: rope,
  tentUniversal: tent,
};

export const preloadNames = [
  'background'
];

export const names = [
  'bonusFrame',
  'scratch',
  'scratchBonus',
  'winFrame',
  'startFrame',
  'coin',
  'dollar',
  'question',
  'bonfire',
  'bow',
  'leaf',
  'rope',
  'tent'
];

export const loot = {
  bonfire: 10,
  bow: 8,
  leaf: 6,
  rope: 4,
  tent: 2
}

export const keys = Object.keys(textures);

export const preloadKeys = Object.keys(preloadTextures);
