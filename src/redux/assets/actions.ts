import {
  SET_CARD_TEXTURES,
  SET_POPUP_TEXTURES,
  SET_SCREEN_TEXTURES,
  SET_UNIVERSAL_TEXTURES
} from './types';

import {
  CardTextures,
  PopupTextures,
  ScreenTextures,
  UniversalTextures,
} from './types';

import {
  AssetsActionTypes,
} from './types';

export const setScreenTextures = (textures: ScreenTextures): AssetsActionTypes => ({
  type: SET_SCREEN_TEXTURES,
  payload: textures
});

export const setCardTextures = (textures: CardTextures): AssetsActionTypes => ({
  type: SET_CARD_TEXTURES,
  payload: textures
});

export const setPopupTextures = (textures: PopupTextures): AssetsActionTypes => ({
  type: SET_POPUP_TEXTURES,
  payload: textures
});

export const setUniversalTextures = (textures: UniversalTextures): AssetsActionTypes => ({
  type: SET_UNIVERSAL_TEXTURES,
  payload: textures
});
