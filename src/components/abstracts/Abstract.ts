export class Abstract {
  public readonly width: number;
  public readonly height: number;

  constructor(
    width: number,
    height: number,
  ) {
    this.width = width;
    this.height = height;
  }

  protected getRandomInt = (min: number, max: number, without?: number[]): number => {
    let result = Math.floor(min + Math.random() * (max + 1 - min));

    /* Тут была ошибка) В случае метода find, 0 приравнивался к false и пропускался. Как-то я протупил. Вообще, метод
      find здесь точно не уместен, даже если бы мы никогда не принимали 0. Если бы "случайное" число было действительно
      случайным, шанс на выигрыш теперь равнялся бы ровно 30%. Жаль, что рандома не существует) */
    if (without && without.some(n => result === n)) {
      return this.getRandomInt(min, max, without)
    } else {
      return result;
    }
  };

  protected mixArray = (array) => {
    let j ;
    let temp ;
    const mixedArr = [ ...array ];

    for (let i = mixedArr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random()*(i + 1));

      temp = mixedArr[j];
      mixedArr[j] = mixedArr[i];
      mixedArr[i] = temp;
    }

    return mixedArr;
  }

  protected getCanvas = (w: number, h: number): HTMLCanvasElement => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    return canvas;
  };
}
