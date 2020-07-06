import {Abstract} from './abstracts/Abstract';

export class Textarea extends Abstract {
  public container: PIXI.Container
  private zIndex: number
  private cx: number
  private cy: number

  constructor(width, height, zIndex, cx, cy) {
    super(width, height);

    this.container = new PIXI.Container();
    this.container.x = cx;
    this.container.y = cy;
    this.container.width = width;
    this.container.height = height;
    this.container.zIndex = zIndex;

    this.zIndex = zIndex;
    this.cx = cx;
    this.cy = cy;
  }

  public init = () => {
    const area = new PIXI.Graphics();

    area.beginFill(0xFEF5C0, 1);
    area.drawRoundedRect(0, 0, this.width, this.height, 40);
    area.endFill();

    this.container.addChild(area);
  };

  public start = () => {
    this.container.destroy();
    this.container = new PIXI.Container();
    this.container.x = this.cx;
    this.container.y = this.cy;
    this.container.zIndex = this.zIndex;
    this.container.width = this.width;
    this.container.height = this.height;

    const textStyle = {
      fontFamily: 'DRAguSans-Black',
      fontSize: 52,
      fill: '#F45B4E'
    };

    const area = new PIXI.Graphics();
    area.beginFill(0xFEF5C0, 1);
    area.drawRoundedRect(0, 0, this.width, this.height, 40);
    area.endFill();
    this.container.addChild(area);

    const text1 = new PIXI.Text('MATCH THE WINNER', textStyle);
    this.container.addChild(text1);

    const text2 = new PIXI.Text('AND WIN A PRIZE!', textStyle);
    this.container.addChild(text2);

    const item = new PIXI.Sprite(window.store.getState().assets.universalTextures[window.store.getState().gameplay.luckyItem]);
    item.width = 85;
    item.height = 85;
    this.container.addChild(item);

    text1.x = 30;
    text1.y = 28;

    text2.x = this.width - 30 - text2.width;
    text2.y = 28;

    item.x = 30 + text1.width + 9;
    item.y = 15;
  };
}
