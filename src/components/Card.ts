import {Abstract} from './abstracts/Abstract';

export class Card extends Abstract {
  app: PIXI.Application;
  container: PIXI.Container;
  maskTexture: PIXI.Texture;
  mask: PIXI.Sprite;
  cx: number;
  cy: number;
  zIndex: number;
  bonus: boolean;
  scratched: boolean;
  item: string;
  brush: PIXI.Graphics;
  dots: boolean[];

  constructor(width, height, cx, cy, bonus, zIndex, app) {
    super(width, height);
    this.app = app;

    this.container = new PIXI.Container();
    this.container.width = width;
    this.container.height = height;
    this.container.zIndex = zIndex;
    this.container.x = cx;
    this.container.y = cy;

    this.container.sortableChildren = true;

    this.cx = cx;
    this.cy = cy;
    this.zIndex = zIndex;
    this.bonus = bonus;
    this.scratched = false;
    this.item = 'bonfire';

    this.maskTexture = PIXI.RenderTexture.create({width: this.width, height: this.height});
    this.mask = new PIXI.Sprite(this.maskTexture);

    this.brush = new PIXI.Graphics();

    this.dots = [];
  }

  private scratching = (e): void => {
    const x = e.data.global.x - this.cx;
    const y = e.data.global.y - this.cy;
    this.brush.x = x;
    this.brush.y = y;

    !this.dots[0] ? this.dots[0] = y - 20 <= 0 : true;
    !this.dots[1] ? this.dots[1] = x + 20 >= this.width : true;
    !this.dots[2] ? this.dots[2] = y + 20 >= this.height : true;
    !this.dots[3] ? this.dots[3] = x - 20 <= 0 : true;
    !this.dots[4] ? this.dots[4] = x + 20 >= this.width / 2 && x - 20 <= this.width / 2 && y + 20 >= this.height / 2 && y - 20 <= this.height / 2 : true;
  };

  private checker = (): boolean => {
    let checkpoints = 0;

    for (let i = 0; i < this.dots.length; i++) {
      if (this.dots[i]) {
        checkpoints += 1;
      }

      if (checkpoints >= 4) return true;
    }

    return false;
  };

  private result = (): void => {
    this.scratched = true;
    const lucky = window.store.getState().gameplay.luckyItem;

    if (!this.bonus) {
      window.reduce('addScratched', window.store.getState().gameplay.scratchedCards);

      if (this.item === lucky) {
        window.reduce('addLuckyScratched', window.store.getState().gameplay.scratchedLuckyCards);

        if (window.store.getState().gameplay.scratchedLuckyCards < 3) {
          window.reduce('setMood', 'happy_card');
        } else {
          window.reduce('setMood', 'super_win');
          this.setWin(true);
          window.reduce('finishGame', true);
        }
      } else {
        window.reduce('setMood', 'disappointed');
      }

      if (window.store.getState().gameplay.scratchedCards === 6) {
        window.reduce('setBonus', true);
      }
    } else {
      if (this.item === window.store.getState().gameplay.luckyItem) {
        window.reduce('setMood', 'super_win');
      } else {
        window.reduce('setMood', 'happy_bonus');
      }

      window.reduce('finishGame', true);
      this.setWin(false);
    }
  };

  public setWin = (superWin): void => {
    let type = 'coin';
    let amount = 25;

    if (superWin) {
      switch (window.store.getState().gameplay.luckyItem) {
        case 'bonfire':
          amount = 25;
          break;

        case 'bow':
          amount = 30;
          break;

        case 'leaf':
          amount = 35;
          break;

        case 'rope':
          amount = 50;
          break;

        case 'tent':
          amount = 100;
          break;
      }
    } else {
      if (this.item === window.store.getState().gameplay.luckyItem) {
        amount = 1;
        type = 'dollar';
      } else {
        amount = 25;
        type = 'coin';
      }
    }

    window.reduce('setGain', {
      gainType: type,
      gainAmount: amount
    });
  };

  public start = (item): void => {
    this.maskTexture = PIXI.RenderTexture.create({width: this.width, height: this.height});
    this.mask = new PIXI.Sprite(this.maskTexture);

    this.brush.beginFill(0xffffff);
    this.brush.drawCircle(0, 0, 40);
    this.brush.endFill();
    this.brush.x = -40;
    this.brush.y = -40;

    this.scratched = false;
    this.item = item;

    this.dots = [false, false, false, false, false];

    this.container.destroy();
    this.container = new PIXI.Container();
    this.container.zIndex = this.zIndex;
    this.container.x = this.cx;
    this.container.y = this.cy;

    let frame;

    if (this.bonus) {
      frame = new PIXI.Sprite(window.store.getState().assets.cardTextures.bonusFrame);
    } else {
      frame = new PIXI.Graphics();
      frame.beginFill(0xFEF5C0);
      frame.drawRoundedRect(0, 0, this.width, this.height, 63);
      frame.endFill();
    }

    const itemSprite = new PIXI.Sprite(window.store.getState().assets.universalTextures[item]);
    itemSprite.anchor.set(0.5, 0.5);
    itemSprite.x = this.width / 2;
    itemSprite.y = this.height / 2;

    this.container.addChild(frame, itemSprite, this.mask);

    itemSprite.mask = this.mask;
    frame.mask = this.mask;

    this.container.interactive = true;

    let scratching = false;

    const over = () => {
      if (!this.scratched && !this.bonus || !this.scratched && window.store.getState().gameplay.bonusIsUnlocked) {
        scratching = true;
        window.reduce('setMood', 'worry');
      }
    };

    const out = () => {
      if (!this.scratched && !this.bonus || !this.scratched && window.store.getState().gameplay.bonusIsUnlocked) {
        scratching = false;
        window.reduce('setMood', 'idle');
      }
    };

    const move = (e) => {
      if (!this.scratched && !this.bonus && scratching || !this.scratched && scratching && window.store.getState().gameplay.bonusIsUnlocked) {
        this.scratching(e);
      }
    };

    this.container.on('pointerover', over);
    this.container.on('pointerout', out);
    this.container.on('pointermove', move);

    this.container.on('touchstart', over);
    this.container.on('touchend', out);
    this.container.on('touchmove', move);
  };

  public update = (): void => {
    if (this.scratched || this.bonus && !window.store.getState().gameplay.bonusIsUnlocked) {
      return ;
    }

    if (this.checker()) {
      this.result();

      const mrProper = new PIXI.Graphics();
      mrProper.beginFill(0xffffff);
      mrProper.drawRect(0, 0, this.width, this.height);
      mrProper.endFill();

      // @ts-ignore
      this.app.renderer.render(mrProper, this.maskTexture, false, null, false);
    } else {
      // @ts-ignore
      this.app.renderer.render(this.brush, this.maskTexture, false, null, false);
    }
  };
}
