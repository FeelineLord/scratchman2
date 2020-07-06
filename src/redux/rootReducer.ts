import {combineReducers} from 'redux';
import {gameplayReducer} from './gameplay/reducer';
import {assetsReducer} from './assets/reducer';

export const rootReducer = combineReducers({
  gameplay: gameplayReducer,
  assets: assetsReducer
});
