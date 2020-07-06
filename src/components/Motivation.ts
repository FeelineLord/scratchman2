import {Abstract} from './abstracts/Abstract';

export class Motivation extends Abstract {
  container: PIXI.Container

  constructor(width, height, zIndex, cx, cy) {
    super(width, height);

    this.container = new PIXI.Container();
    this.container.x = cx;
    this.container.y = cy;
    this.container.width = width;
    this.container.height = height;
    this.container.zIndex = zIndex;
  }

  public init = () => {
    const area = new PIXI.Graphics();

    area.beginFill(0xFFFFFF, 0.3);
    area.drawRoundedRect(0, 0, this.width, this.height, 50);
    area.endFill();

    this.container.addChild(area);

    const textStyle = new PIXI.TextStyle({
      fontFamily: 'DRAguSans-Black',
      fontSize: 100,
      fill: '#f45b4e',
      stroke: '#ffffff',
      strokeThickness: 18,
    });

    const text = new PIXI.Text('WIN UP TO $100', textStyle);

    this.container.addChild(text);
    text.anchor.set(0.5, 0.5);
    text.x = this.width / 2;
    text.y = this.height / 2 - 5;
  };
}
