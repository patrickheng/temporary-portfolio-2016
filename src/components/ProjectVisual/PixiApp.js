import raf from 'raf';
import PIXI from 'pixi.js';
import randomInt from 'utils/maths/random-int';
import randomFloat from 'utils/maths/random-float';

import Scene from './Scene';
import MaskParticule from './MaskParticule';

class PixiApp {
  constructor(root, drawingCanvas) {

    this.root = root;

    this.width = 0;
    this.height = 0;

    this.updateActive = true;

    this.videoRatio = 854/480;

    this.drawingCanvas = drawingCanvas;

    this.background = new PIXI.Sprite();

    this.mask = new PIXI.Sprite();

    this.bind();

    setTimeout(()=> {

      this.setCanvasSize();

      this.scene = new Scene(this.width, this.height);

      this.root.appendChild(this.scene.renderer.view);

      const video = document.createElement("video");
      video.preload = "auto";
      video.loop = true;
      video.oncanplay = this.drawBackground(video);
      video.src = '/videos/sample.mp4';

      this.update();

    }, 100);
  }

  bind() {

    this.update = this.update.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  drawBackground(videoSrc) {
    // this.setMask();

    const videoTexture = PIXI.Texture.fromVideo(videoSrc);

    this.background.texture = new PIXI.Texture(videoTexture);

    // this.background.mask = this.mask;

    this.scene.addChild(this.mask);

    this.setSizeByRatio(this.background);

    this.scene.addChild(this.background);
    this.scene.render();

  }

  setCanvasSize() {
    this.boundingRect = this.root.getBoundingClientRect();
    this.width = this.boundingRect.width;
    this.height = this.boundingRect.height;
    this.windowRatio = this.width / this.height;

    this.drawingCanvas.setSize(this.width, this.height);
  }

  setSizeByRatio(el) {

    this.boundingRect = this.root.getBoundingClientRect();

    if(this.windowRatio >= this.videoRatio) { // Video wider than container
      el.width = this.boundingRect.width;
      el.height = this.boundingRect.height * this.videoRatio;

      el.position.x = 0;
      el.position.y = (this.boundingRect.height - el.height) / 2;
    } else {
      el.width = this.boundingRect.width * this.videoRatio;
      el.height = this.boundingRect.height;

      el.position.x = (this.boundingRect.width - el.width) / 2;
      this.background.position.y = 0;
    }


  }

  setMask() {
    this.setCanvasSize();

    var myMask = new PIXI.Graphics();
    myMask.beginFill();
    myMask.drawCircle(0, 0, 300);
    myMask.drawCircle(200, 0, 300);
    myMask.endFill();



    this.scene.addChild(myMask)
    this.mask = myMask;
    this.mask.alpha = 0.5;

    this.scene.addChild(this.mask);
  }

  changeProject() {

  }

  onWindowResize() {
    this.setCanvasSize();
    this.setSizeByRatio(this.background);

    this.scene.resize(this.width, this.height);
  }

  onMouseMove({mouseX, mouseY}) {
    const maskParticule = new MaskParticule({mouseX, mouseY, background: this.background});
    this.scene.addChild(maskParticule.getEl());
  }

  update() {

    if(this.updateActive) {

      this.drawingCanvas.update();

      // this.mask.texture.update();

      this.scene.render();

      this.raf = raf(this.update);

    } else {

      raf.cancel(this.raf);

    }
  }
}

export default PixiApp;