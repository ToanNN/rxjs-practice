interface Drawable {
  draw: () => void;
}

function renderToScreen<T extends Drawable>(input: T[]) {
  input.forEach((i) => i.draw());
}

const objectsWithDraw = [{ draw: () => {} }, { draw: () => {} }];
renderToScreen(objectsWithDraw);

interface CacheHost<ContentType> {
  save: (a: ContentType) => void;
}

function addToCache<T, Cache extends CacheHost<T>>(
  obj: T,
  cache: Cache
): Cache {
  cache.save(obj);
  return cache;
}

class AddNumbers {
  private n: number;
  constructor(start = 0) {
    this.n = start;
  }

  public add(inc = 1) {
    this.n = this.n + inc;
    return this;
  }

  public print() {
    console.log(this.n);
    return this;
  }
}

new AddNumbers(3).add(2).print();
