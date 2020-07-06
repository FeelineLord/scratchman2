import {Abstract} from './abstracts/Abstract';

export class Shadow extends Abstract {
  public container: PIXI.Container;
  private readonly shadow: PIXI.Graphics;

  constructor(width, height, zIndex) {
    super(width, height);

    this.container = new PIXI.Container();
    this.shadow = new PIXI.Graphics();
    this.container.zIndex = zIndex;
  }

  public init = () => {
    this.shadow.beginFill(0x000000, 0.4);
    this.shadow.drawRect(0, 0, this.width, this.height);
    this.shadow.endFill();

    this.container.addChild(this.shadow);
  };

  public update = (): void => {
    this.shadow.visible = window.store.getState().gameplay.gameWasFinished;
  };
}
