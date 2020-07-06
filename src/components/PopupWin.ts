import {AbstractPopup} from './abstracts/AbstractPopup';

export class PopupWin extends AbstractPopup {
  private textContainer: PIXI.Container;
  constructor(width, height, cx, visible, visiblePosition, hiddenPosition, zIndex) {
    super(width, height, cx, visible, visiblePosition, hiddenPosition, zIndex);

    this.textContainer = new PIXI.Container();
  }

  public init = () => {
    const background = new PIXI.Sprite(window.store.getState().assets.popupTextures.winFrame);
    background.width = this.width;
    background.height = this.height;
    background.alpha = 0.8;


    const winTextStyles = new PIXI.TextStyle({
      fontFamily: 'DRAguSans-Black',
      fontSize: 116,
      fill: '#F45B4E'
    });
    const winText = new PIXI.Text('You win', winTextStyles);
    winText.anchor.set(0.5, 0);
    winText.x = this.width / 2;
    winText.y = 30;

    this.container.addChild(background);
    this.container.addChild(winText);
  };

  public update = (): void => {
    this.textContainer.destroy();

    this.textContainer = new PIXI.Container();
    this.textContainer.width = this.width;
    this.textContainer.height = 95;

    const type = window.store.getState().gameplay.gainType;
    const amount = window.store.getState().gameplay.gainAmount;

    const itemSprite = new PIXI.Sprite(window.store.getState().assets.popupTextures[type]);
    this.textContainer.addChild(itemSprite);

    const textStyle = new PIXI.TextStyle({
      fontFamily: 'DRAguSans-Black',
      fontSize: 126,
      fill: '#311D1F'
    });

    const text = new PIXI.Text(amount, textStyle);
    text.y = -30;
    this.textContainer.addChild(text);

    text.x = itemSprite.width + 16;

    this.container.addChild(this.textContainer);

    this.textContainer.x = (this.container.width - this.textContainer.width) / 2;
    this.textContainer.y = 160;
  }
}
