import {Abstract} from './abstracts/Abstract';

export class Screen extends Abstract {
  container: PIXI.Container

  constructor(width, height, zIndex) {
    super(width, height);

    this.container = new PIXI.Container();
    this.container.zIndex = zIndex;
  }

  public init = () => {
    const background = PIXI.Sprite.from(window.store.getState().assets.screenTextures.background);

    this.container.addChild(background);
    this.container.width = this.width;
    this.container.height = this.height;
  };
}
