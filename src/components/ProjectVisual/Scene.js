import {
  autoDetectRenderer,
  Container
}
from 'pixi.js';

class Scene {

  constructor() {
    
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer = new autoDetectRenderer(this.width, this.height, {
      antialias: true
    });
    this.renderer.backgroundColor = 0x101010;

    this.stage = new Container();
  }

  addChild(child) {

    this.stage.addChild(child);
  }

  removeChild(child) {

    this.stage.removeChild(child);
  }

  render() {

    this.renderer.render(this.stage);
  }

  resize(newWidth, newHeight) {

    this.renderer.resize(newWidth, newHeight);
  }

}

export default Scene;