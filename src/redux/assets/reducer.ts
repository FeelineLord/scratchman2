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

export interface AssetsStateInterface {
  screenTextures: ScreenTextures
  cardTextures: CardTextures
  popupTextures: PopupTextures
  universalTextures: UniversalTextures
}

const initialState: AssetsStateInterface = {
  screenTextures: {
    background: PIXI.RenderTexture.create()
  },
  cardTextures: {
    bonusFrame: PIXI.RenderTexture.create(),
    scratch: PIXI.RenderTexture.create(),
    scratchBonus: PIXI.RenderTexture.create()
  },
  popupTextures: {
    startFrame: PIXI.RenderTexture.create(),
    winFrame: PIXI.RenderTexture.create(),
    coin: PIXI.RenderTexture.create(),
    question: PIXI.RenderTexture.create(),
    dollar: PIXI.RenderTexture.create()
  },
  universalTextures: {
    bonfire: PIXI.RenderTexture.create(),
    bow: PIXI.RenderTexture.create(),
    leaf: PIXI.RenderTexture.create(),
    rope: PIXI.RenderTexture.create(),
    tent: PIXI.RenderTexture.create()
  }
};

export const assetsReducer = (
  state: AssetsStateInterface = initialState,
  action: AssetsActionTypes
): AssetsStateInterface => {
  switch (action.type) {
    case SET_SCREEN_TEXTURES:
      return {
        ...state,
        screenTextures: action.payload
      };

    case SET_CARD_TEXTURES:
      return {
        ...state,
        cardTextures: action.payload
      };

    case SET_POPUP_TEXTURES:
      return {
        ...state,
        popupTextures: action.payload
      };

    case SET_UNIVERSAL_TEXTURES:
      return {
        ...state,
        universalTextures: action.payload
      };

    default:
      return state;
  }
};
