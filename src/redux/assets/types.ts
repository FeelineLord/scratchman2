export const SET_SCREEN_TEXTURES = 'SET_SCREEN_TEXTURES';
export const SET_CARD_TEXTURES = 'SET_CARD_TEXTURES';
export const SET_POPUP_TEXTURES = 'SET_POPUP_TEXTURES';
export const SET_UNIVERSAL_TEXTURES = 'SET_UNIVERSAL_TEXTURES'

export interface ScreenTextures {
  background: PIXI.Texture
}

export interface CardTextures {
  bonusFrame: PIXI.Texture
  scratch: PIXI.Texture
  scratchBonus: PIXI.Texture
}

export interface PopupTextures {
  startFrame: PIXI.Texture
  winFrame: PIXI.Texture
  coin: PIXI.Texture
  question: PIXI.Texture
  dollar: PIXI.Texture
}

export interface UniversalTextures {
  bonfire: PIXI.Texture
  bow: PIXI.Texture
  leaf: PIXI.Texture
  rope: PIXI.Texture
  tent: PIXI.Texture
}

interface SetScreenTexturesAction {
  type: typeof SET_SCREEN_TEXTURES
  payload: ScreenTextures
}

interface SetCardTexturesAction {
  type: typeof SET_CARD_TEXTURES
  payload: CardTextures
}

interface SetPopupTexturesAction {
  type: typeof SET_POPUP_TEXTURES
  payload: PopupTextures
}

interface SetUniversalTexturesAction {
  type: typeof SET_UNIVERSAL_TEXTURES
  payload: UniversalTextures
}

export type AssetsActionTypes =
  SetScreenTexturesAction |
  SetCardTexturesAction |
  SetPopupTexturesAction |
  SetUniversalTexturesAction
