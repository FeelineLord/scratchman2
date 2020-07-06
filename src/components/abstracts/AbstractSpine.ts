export class AbstractSpine {
  public readonly name: string
  public readonly startX: number;
  public readonly startY: number;
  public current: PIXI.spine.Spine | null
  public readonly container: PIXI.Container

  constructor(
    name: string,
    startX: number,
    startY: number,
    zIndex: number
  ) {
    this.name = name;
    this.current = null;
    this.container = new PIXI.Container();
    this.startX = startX;
    this.startY = startY;

    this.container.zIndex = zIndex;
  }

  public preload = (app: PIXI.Application, callback: () => void) => {
    const spineLoaderOptions = {
      metadata: {
        spineAtlasFile: `${this.name}/${this.name}.atlas`
      }
    };

    app.loader
      .add(this.name, `${this.name}/${this.name}.json`, spineLoaderOptions)
      .load((loader, resources) => {
        save(loader, resources)
      });

    const save = (_loader, res) => {
      this.current = new PIXI.spine.Spine(res.red.spineData);

      const container = new PIXI.Container();

      const localRect = this.current.getLocalBounds();
      this.current.position.set(-localRect.x, -localRect.y);

      this.container.addChild(this.current);
      this.container.x = this.startX;
      this.container.y = this.startY - container.height;

      callback();
    };
  };
}
