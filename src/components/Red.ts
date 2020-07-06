import {AbstractSpine} from './abstracts/AbstractSpine';

export class Red extends AbstractSpine {
  container: PIXI.Container
  private currentAnimation: string;

  constructor (name, startX, startY, zIndex) {
    super(name, startX, startY, zIndex)

    this.container = new PIXI.Container;
    this.container.zIndex = zIndex;
    this.currentAnimation = 'no';
  }

  private setAnimation = (name: string): void => {
    if (name === window.store.getState().mood) {
      return ;
    } else if (this.current !== null) {
      this.current.state.setAnimation(0, 'red_' + name + '_st', false);
      this.current.state.addAnimation(0, 'red_' + name + '_loop', false, 0);
      this.current.state.addAnimation(0, 'red_' + name + '_end', false, 0);
      this.current.state.addAnimation(0, 'red_idle_st', false, 0);
      this.current.state.addAnimation(0, 'red_idle_loop', true, 0);
    }
  };

  private scratchingAnimation = (start: boolean): void => {
    if (start && this.current !== null) {
      this.current.state.setAnimation(0, 'red_worry_st', false);
      this.current.state.addAnimation(0, 'red_worry_loop', true, 0);
    } else if (this.current !== null) {
      this.current.state.setAnimation(0, 'red_worry_end', false);
      this.current.state.addAnimation(0, 'red_idle_st', false, 0);
      this.current.state.addAnimation(0, 'red_idle_loop', true, 0);
    }
  };

  private loadingAnimation = (start: boolean): void => {
    if (start && this.current !== null) {
      this.current.state.setAnimation(0, 'red_loading_screen_animation_st', false);
      this.current.state.addAnimation(0, 'red_loading_screen_animation_loop', true, 0);
    } else if (
      this.current !== null
    ) {
      this.current.state.setAnimation(0, 'red_loading_screen_animation_end', false);
      this.current.state.addAnimation(0, 'red_idle_st', false, 0);
      this.current.state.addAnimation(0, 'red_idle_loop', true, 0);
    }
  };

  public animationSubscriber = (): void => {
    if (this.currentAnimation !== window.store.getState().gameplay.mood) {
      const prev = this.currentAnimation;
      this.currentAnimation = window.store.getState().gameplay.mood;

      if (this.currentAnimation === 'loading_screen_animation' && prev === 'no') {
        this.loadingAnimation(true);
      } else if (this.currentAnimation === 'idle' && prev === 'loading_screen_animation') {
        this.loadingAnimation(false);
      } else if (this.currentAnimation === 'worry') {
        this.scratchingAnimation(true);
      } else if (this.currentAnimation === 'idle' && prev === 'worry') {
        this.scratchingAnimation(false);
      } else {
        this.setAnimation(this.currentAnimation);
      }
    }
  }
}
