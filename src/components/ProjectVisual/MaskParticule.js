import PIXI from 'pixi.js';

class MaskParticule extends PIXI.Sprite {
  constructor({mouseX, mouseY, background}) {
    super();
    this.background = new PIXI.Sprite();

    this.background.position.x = background.position.x;
    this.background.position.y = background.position.y;
    this.background.texture = background.texture;

    this.texture = PIXI.Texture.fromImage('/images/paint.png');
    this.position.x = mouseX - 25;
    this.position.y = mouseY - 25;

    this.background.mask = this;
  }

  getEl() {
    return this.background;
  }
  update() {
  }
}

export default MaskParticule;