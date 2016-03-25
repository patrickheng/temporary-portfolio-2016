import raf from 'raf';
import PIXI from 'pixi.js';
import now from 'performance-now';
import randomInt from 'utils/maths/random-int';
import randomFloat from 'utils/maths/random-float';

import Scene from './Scene';

class PixiApp {
  constructor(root) {

    this.root = root;

    setTimeout(()=> {
      this.setSize();
      this.scene = new Scene(this.width, this.height);

      this.root.appendChild(this.scene.renderer.view);

      this.bind();
      this.addListeners();
      this.update();
    }, 100);
  }


  bind() {

    this.update = this.update.bind(this);
  }

  addListeners() {

  }

  setSize() {
    this.boundingRect = this.root.getBoundingClientRect();
    this.width = this.boundingRect.width;
    this.height = this.boundingRect.height;
  }

  update() {

    if(this.updateActive) {

      this.scene.render();
      this.raf = raf(this.update);

    } else {

      raf.cancel(this.raf);

    }

  }

  onWindowResize() {
    this.setSize();

    this.scene.resize(this.width, this.height);
  }
}

export default PixiApp;