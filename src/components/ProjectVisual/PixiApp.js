import raf from 'raf';
import PIXI from 'pixi.js';
import now from 'performance-now';
import randomInt from 'utils/maths/random-int';
import randomFloat from 'utils/maths/random-float';

import Scene from './Scene';

class PixiApp {
  constructor(root) {

    this.root = root;
    this.updateActive = true;

    this.videoRatio = 854/480;

    setTimeout(()=> {
      this.scene = new Scene(this.width, this.height);

      this.root.appendChild(this.scene.renderer.view);

      this.setSize();

      var video = document.createElement("video");
      video.preload = "auto";
      video.loop = true;
      video.oncanplay = this.drawVideo(video);
      video.src = '/videos/sample.mp4';

      this.setVideoSize();


      this.bind();

      this.update();

    }, 100);
  }

  bind() {

    this.update = this.update.bind(this);
  }

  drawVideo(videoSrc) {

    this.videoTexture = PIXI.Texture.fromVideo(videoSrc);
    this.videoSprite = new PIXI.Sprite(this.videoTexture);

    this.scene.addChild(this.videoSprite);

    this.setVideoSize();
    this.scene.resize(this.width, this.height);
  }

  setSize() {
    this.boundingRect = this.root.getBoundingClientRect();
    this.width = this.boundingRect.width;
    this.height = this.boundingRect.height;
    this.windowRatio = this.width / this.height;
  }

  setVideoSize() {

    this.boundingRect = this.root.getBoundingClientRect();

    if(this.windowRatio >= this.videoRatio) { // Video wider than container
      this.videoSprite.width = this.boundingRect.width;
      this.videoSprite.height = this.boundingRect.height * this.videoRatio;

      this.videoSprite.position.x = 0;
      this.videoSprite.position.y = (this.boundingRect.height - this.videoSprite.height) / 2;
    } else {
      this.videoSprite.width = this.boundingRect.width * this.videoRatio;
      this.videoSprite.height = this.boundingRect.height;

      this.videoSprite.position.x = (this.boundingRect.width - this.videoSprite.width) / 2;
      this.videoSprite.position.y = 0;
    }

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
    this.setVideoSize();

    this.scene.resize(this.width, this.height);
  }
}

export default PixiApp;