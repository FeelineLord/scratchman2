import {Abstract} from './Abstract';

export class AbstractPopup extends Abstract {
  public visible: boolean
  public container: PIXI.Container
  private readonly visiblePosition: number
  private readonly hiddenPosition: number
  private currentPosition: number

  constructor(
    width,
    height,
    cx,
    visible,
    visiblePosition,
    hiddenPosition,
    zIndex
  ) {
    super(width, height);

    this.visible = visible;
    this.visiblePosition = visiblePosition;
    this.hiddenPosition = hiddenPosition;

    this.container = new PIXI.Container();
    this.container.width = this.width;
    this.container.height = this.height;
    this.container.x = cx;
    this.container.zIndex = zIndex;

    this.currentPosition = visible ? this.visiblePosition : this.hiddenPosition;
    this.container.y = this.currentPosition;
  }

  public relocate = (time: number, fps: number) => {
    if (this.visible && this.currentPosition === this.visiblePosition || !this.visible && this.currentPosition === this.hiddenPosition
    ) {
      return ;
    }

    const requiredPosition = this.visible
      ? this.visiblePosition
      : this.hiddenPosition;

    const toBottom = this.visible && this.hiddenPosition < this.visiblePosition
      ? true
      : !this.visible && this.hiddenPosition > this.visiblePosition;

    const distance = this.hiddenPosition > this.visiblePosition
      ? this.hiddenPosition - this.visiblePosition
      : this.visiblePosition - this.hiddenPosition;

    if (toBottom) {
      if (this.currentPosition >= requiredPosition) {
        this.currentPosition = requiredPosition;
        this.container.y = this.currentPosition;

        return ;
      }

      this.currentPosition += distance / (fps * time);
      this.container.y = this.currentPosition;
    } else {
      if (this.currentPosition <= requiredPosition) {
        this.currentPosition = requiredPosition;
        this.container.y = this.currentPosition;

        return ;
      }

      this.currentPosition -= distance / (fps * time);
      this.container.y = this.currentPosition;
    }
  }
}
