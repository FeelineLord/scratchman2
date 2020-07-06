import {DropShadowFilter} from '@pixi/filter-drop-shadow';
import {AbstractPopup} from './abstracts/AbstractPopup';

export class PopupPlay extends AbstractPopup {
  onStart: () => void

  constructor(width, height, cx, visible, visiblePosition, hiddenPosition, zIndex, onStart) {
    super(width, height, cx, visible, visiblePosition, hiddenPosition, zIndex);

    this.onStart = onStart;
  }

  public init = () => {
    const background = new PIXI.Sprite(window.store.getState().assets.popupTextures.startFrame);
    background.width = this.width;
    background.height = this.height;

    const howToContainer = new PIXI.Container();

    const question = new PIXI.Sprite(window.store.getState().assets.popupTextures.question);
    question.width = 75;
    question.height = 75;

    const howToTextStyles = new PIXI.TextStyle({
      fontFamily: 'DRAguSans-Black',
      fontSize: 72,
      fill: '#FF8729'
    });

    const howToText = new PIXI.Text('How To Play?', howToTextStyles);
    howToText.x = 75 + 35;
    howToText.y = -6;

    howToContainer.addChild(question);
    howToContainer.addChild(howToText);

    howToContainer.y = 62;
    howToContainer.x = this.width / 2 - howToContainer.width / 2;

    const buttonContainer = new PIXI.Container();

    const button = new PIXI.Graphics();

    button.beginFill(0xF45B4E, 1);
    button.drawRoundedRect(0, 0, this.width - 62 * 2, 128, 64);
    button.endFill();

    const shadow = new DropShadowFilter({
      blur: 10,
      color: 0x000000,
      distance: 10,
      rotation: 90,
      quality: 8,
      alpha: 0.4,
      resolution: 3
    });

    button.filters = [shadow];

    const buttonTextStyle = new PIXI.TextStyle({
      fontFamily: 'DRAguSans-Black',
      fontSize: 72,
      fill: '#FFFFFF'
    });

    const buttonText = new PIXI.Text('Play for 60', buttonTextStyle);

    const coin = new PIXI.Sprite(window.store.getState().assets.popupTextures.coin);

    coin.width = 60;
    coin.height = 60;

    buttonContainer.addChild(button);
    buttonContainer.addChild(buttonText);
    buttonContainer.addChild(coin);
    buttonContainer.x = 62;
    buttonContainer.y = this.height - 128 - 46;

    buttonText.anchor.set(0.5, 1);
    buttonText.x = (this.width - 62 * 2) / 2 - 50;
    buttonText.y = buttonContainer.height / 2 - 4;

    coin.anchor.set(0.5, 1);
    coin.x = (this.width - 62 * 2) / 2 + 170;
    coin.y = buttonContainer.height / 2;

    buttonContainer.interactive = true;
    buttonContainer.buttonMode = true;

    buttonContainer.on('pointerdown', () => {
      if (
        !this.visible
      ) {
        return ;
      }
      window.reduce('startGame', true, () => {
        this.onStart();
      });
    });

    this.container.addChild(background);
    this.container.addChild(howToContainer);
    this.container.addChild(buttonContainer);
  }
}
