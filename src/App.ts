import {textures, keys, names, preloadNames, preloadTextures, preloadKeys, loot} from './assets/assets';

import {Abstract} from './components/abstracts/Abstract';

import {Screen} from './components/Screen';
import {Red} from './components/Red';
import {Textarea} from './components/Textarea';
import {PopupWin} from './components/PopupWin';
import {PopupPlay} from './components/PopupPlay';
import {Motivation} from './components/Motivation';
import {Card} from './components/Card';
import {Shadow} from './components/Shadow';

export class App extends Abstract {
  private readonly app: PIXI.Application
  private readonly container: PIXI.Container
  private gameWasFinished: boolean
  private readonly updates: Array<() => void>
  private readonly red: Red
  private readonly components: {
    screen: Screen
    shadow: Shadow
    motivation: Motivation
    winnerArea: Textarea
    popupWin: PopupWin
    popupPlay: PopupPlay
    cards: Card[]
    bonus: Card
  }

  constructor(app, width, height) {
    super (width, height);
    this.app = app;
    this.container = app.stage;
    this.gameWasFinished = true;
    this.updates = [];
    this.red = new Red('red', 0, 278, 2);
    this.components = {
      screen: new Screen(this.width, this.height, 1),
      shadow: new Shadow(this.width, this.height, 5),
      motivation: new Motivation(this.width - 160 * 2, 130, 3, 160, 40),
      winnerArea: new Textarea(this.width - 55 * 2, 116, 3, 55, 1043),
      popupWin: new PopupWin(this.width - 44 * 2, 334, 44, false, 220, -334, 6),
      popupPlay: new PopupPlay(this.width, 392, 0, true, this.height - 392, this.height + 392, 6, this.newGame),
      cards: [],
      bonus: new Card(366,366, 614, 382, true, 4, this.app)
    }
  }

  private getTextures = (textures, names, keys, fields, callback): void => {
    const newTextures = {

    };

    for (const f of fields) {
      newTextures[f] = {}
    }

    const newTexturesKeys = Object.keys(newTextures);

    const load = (index): void => {
      this.app.loader
        .add(keys[index], textures[keys[index]])
        .load((_loader, res) => {
          for (const k of newTexturesKeys) {
            const checker = k.charAt(0).toUpperCase() + k.slice(1);
            if (
              names[index] + checker === keys[index]
            ) {
              // @ts-ignore
              newTextures[k][names[index]] = res[keys[index]].texture
            }
          }

          if (
            index === keys.length - 1
          ) {
            callback(newTextures);
          } else {
            load(index + 1);
          }
        });
    };

    load(0);
  };

  private getRedSpine = (callback: () => void): void => {
    this.red.preload(this.app, () => {
      this.container.addChild(this.red.container);
      callback();

      if (
        this.red.current
      ) {
        this.red.current.skeleton.setToSetupPose();
        this.red.current.autoUpdate = true;
      }

      this.updates.push(() => {
        if (
          this.red.current
        ) {
          this.red.animationSubscriber();
        }
      });

      window.reduce('setMood', 'loading_screen_animation');
    });
  };

  private getScreen = (): void => {
    this.components.screen.init();
    this.container.addChild(this.components.screen.container);
  };

  private getWinnerArea = (): void => {
    this.components.winnerArea.init();
    this.container.addChild(this.components.winnerArea.container);
  };

  private getPopupPlay = (): void => {
    this.components.popupPlay.init();
    this.container.addChild(this.components.popupPlay.container);
  };

  private getPopupWin = (): void => {
    this.components.popupWin.init();
    this.container.addChild(this.components.popupWin.container);
  };

  private getMotivation = (): void => {
    this.components.motivation.init();
    this.container.addChild(this.components.motivation.container);
  };

  private getShadow = (): void => {
    this.components.shadow.init();
    this.container.addChild(this.components.shadow.container);
  };

  private preload = (): void => {
    const secondPriority = () => {
      this.getTextures(
        textures,
        names,
        keys,
        ['card', 'popups', 'universal'],
        (textures) => {
          window.reduce('setCardTextures', textures['card']);
          window.reduce('setPopupTextures', textures['popups']);
          window.reduce('setUniversalTextures', textures['universal']);
          window.reduce('setMood', 'idle');
          this.init();
        });
    }

    this.getTextures(
      preloadTextures,
      preloadNames,
      preloadKeys,
      ['screen'],
      (textures) => {
        window.reduce('setScreenTextures', textures['screen']);
        this.getScreen();
        this.getWinnerArea();
        this.getMotivation();
        this.getRedSpine(secondPriority);
       });
  }

  private makeCards = (): void => {
    let accumulatorX =  0;
    let accumulatorY = 0;

    for (let i = 0; i < 6; i++) {
      accumulatorX += 337;

      if (
        i % 3 === 0
      ) {
        accumulatorX = 0;
        if (
          i !== 0
        ) {
          accumulatorY += 335;
        }
      }

      const cx = 73 + accumulatorX;
      const cy = 1227 + accumulatorY;

      const card = new Card(280,280, cx, cy, false, 4, this.app);
      this.components.cards.push(card);
      this.updates.push(() => {
        card.update();
      });
    }

    this.updates.push(() => {
      this.components.bonus.update();
    })
  };

  private getLuckyItem = (): string => {
    const newLoot = {...loot};
    const keys = Object.keys(newLoot);

    for (const l of keys) {
      newLoot[l] = newLoot[l] * (100 / 30);
    }

    const int = this.getRandomInt(100, 10000) / 100;

    let sum = 0;
    for (const l of keys) {
      sum += newLoot[l];
      if (int <= sum) {
        return l;
      } else if (keys.indexOf(l) === keys.length - 1) {
        return keys[keys.length - 1];
      }
    }

    return 'bonfire';
  };

  private jackpot = (): string[] => {
    const happyItem = window.store.getState().gameplay.luckyItem;

    const keys = Object.keys(loot);
    const result: string[] = [];

    let int1 = this.getRandomInt(0, keys.length - 1, [keys.indexOf(happyItem)]);
    result.push(keys[int1]);
    let int2 = this.getRandomInt(0, keys.length - 1, [keys.indexOf(happyItem), int1]);
    result.push(keys[int2]);
    let int3 = this.getRandomInt(0, keys.length - 1, [keys.indexOf(happyItem), int1]);
    result.push(keys[int3]);

    for (let i = 3; i < 6; i++) {
      result.push(happyItem);
    }

    return this.mixArray(result);
  };

  private loose = (): string[] => {
    const happyItem = window.store.getState().gameplay.luckyItem;

    const keys = Object.keys(loot);
    const result: string[] = [];

    let int1 = this.getRandomInt(0, keys.length - 1);
    result.push(keys[int1]);
    let int2 = this.getRandomInt(0, keys.length - 1, [int1]);
    result.push(keys[int2]);
    let int3 = this.getRandomInt(0, keys.length - 1, [keys.indexOf(happyItem), int1]);
    result.push(keys[int3]);
    let int4 = this.getRandomInt(0, keys.length - 1, [keys.indexOf(happyItem), int2]);
    result.push(keys[int4]);
    let int5 = this.getRandomInt(0, keys.length - 1, [keys.indexOf(happyItem), int1, int3]);
    result.push(keys[int5]);
    let int6 = this.getRandomInt(0, keys.length -1, [keys.indexOf(happyItem), int2, int4]);
    result.push(keys[int6]);

    return this.mixArray(result);
  }

  private watcher = (): void => {
    if (window.store.getState().gameplay.gameWasFinished !== this.gameWasFinished) {
      const prev = this.gameWasFinished;
      this.gameWasFinished = window.store.getState().gameplay.gameWasFinished;

      if (!prev) {
        this.components.popupWin.update();
        this.components.popupWin.visible = true;
        this.components.popupPlay.visible = true;
      } else {
        this.components.popupWin.visible = false;
        this.components.popupPlay.visible = false;
      }
    }
  };

  private setInitial = (): void => {
    window.reduce('setBonus', false);
    window.reduce('addScratched', -1);
    window.reduce('addLuckyScratched', -1);
    window.reduce('startGame', true);
  };

  private init = (): void => {
    this.getShadow();
    this.getPopupPlay();
    this.getPopupWin();

    this.updates.push(() => {
      this.components.popupPlay.relocate(0.4, 60);
      this.components.popupWin.relocate(0.4, 60);
      this.components.shadow.update();
    });

    this.makeCards();
    this.container.sortChildren();
  };

  private newGame = () => {
    this.setInitial();
    const keys = Object.keys(loot);

    window.reduce('setLucky', this.getLuckyItem());

    this.components.popupPlay.visible = false;
    this.components.popupWin.visible = false;

    this.components.winnerArea.start();
    this.container.addChild(this.components.winnerArea.container);

    const grid = this.getRandomInt(1, 100) >= 71 ? this.jackpot() : this.loose();

    this.components.cards.forEach((c, i) => {
      c.start(grid[i]);
      this.container.addChild(c.container);
    });

    this.components.bonus.start(keys[this.getRandomInt(0, 4)]);
    this.container.addChild(this.components.bonus.container);
    this.container.sortChildren();
  };

  private update = () => {
    this.app.ticker.add(() => {
      if (this.updates.length) {
        for (const t of this.updates) {
          t();
        }
      }
      this.watcher();
    });
  };

  public start = () => {
    this.update();
    this.preload();
  };
}

