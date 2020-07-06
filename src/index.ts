import {
  setScreenTextures,
  setCardTextures,
  setPopupTextures,
  setUniversalTextures
} from './redux/assets/actions';

import {
  startGame,
  setBonus,
  setLucky,
  addScratched,
  addLuckyScratched,
  setGain,
  setMood,
  finishGame
} from "./redux/gameplay/actions";

import WebFont from 'webfontloader';
import * as PIXI from 'pixi.js';
import './styles/styles.scss';
import 'pixi-spine';

import {rootReducer} from './redux/rootReducer';
import {createStore} from 'redux';

const allActions = {
  setScreenTextures,
  setCardTextures,
  setPopupTextures,
  setUniversalTextures,
  startGame,
  setBonus,
  setLucky,
  addScratched,
  addLuckyScratched,
  setGain,
  setMood,
  finishGame
}

const reduceState = (action, value, callback?: () => void) => {
  window.store.dispatch(allActions[action](value));

  if (
    typeof callback !== 'undefined'
  ) {
    callback();
  }
};

declare global {
  interface Window {
    store: any
    reduce: any
  }
}

window.store = createStore(rootReducer);
window.reduce = reduceState;

import {App} from './App';

WebFont.load({
  custom: {
    families: ['DRAguSans-Black']
  }
});

const start = (width, height) => {
  const root = document.querySelector('#root') as HTMLElement;
  const scratch = new PIXI.Application({
    antialias: true,
    width,
    height
  });

  scratch.view.id = 'scratch';
  scratch.view.className= 'scratch';

  root.append(scratch.view);

  const app = new App(scratch, width, height);

  app.start();
}

window.addEventListener('load', () => {
  start(1096, 1920);
});

window.addEventListener('resize', () => {
  const scratch = document.querySelector('#scratch') as HTMLCanvasElement;
  if (window.innerWidth < scratch.offsetWidth) {
    scratch.style.height = 'auto';
    scratch.style.width = '100%';
  } else if (window.innerHeight < scratch.offsetHeight) {
    scratch.style.width = 'auto';
    scratch.style.height = '100vh';
  }
});
