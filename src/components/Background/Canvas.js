import SimplexNoise from 'simplex-noise';
import raf from 'raf';
import now from 'performance-now';

import Particle from './Particle';

class Canvas {

  constructor(el) {

    this.canvas = el;
    this.ctx = this.canvas.getContext('2d');
    this.updateActive = true;
    this.particles = [];
    this.zNoiseOffset = 0;

    this.timeBegin = now();
    this.timeLimit = 15 * 1000; // In seconds

    this.config = {
      particlesNb: 15,
      step: 10,
      base: 50,
      angleCoef: 3,
      strokeColor: "#f1f1f1",
      zNoiseStep: 0.001,
      noiseOctave: 500,
      noiseFallOut: 0.5
    };

    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    this.simplexNoise = new SimplexNoise();

    // Generate particules
    for (let i = 0; i < this.config.particlesNb; i++) {
      this.particles.push(new Particle());
      this.particles[i].init();
    }

    this.bind();
    this.start();
  }

  bind() {
    this.update = this.update.bind(this);
  }

  start() {
    this.update();
  }

  restart() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.timeBegin = now();

    if(!this.updateActive) {
      this.updateActive = true;
      this.update();
    }
  }

  getNoise(x, y, z) {
    const octaves = this.config.noiseOctave;
    const fallout = this.config.noiseFallOut;

    let amplitude = 0.5;
    let f = 0.5;
    let sum = 0;

    for (let i = 0; i < octaves; ++i) {
      amplitude *= fallout;
      sum += amplitude * (this.simplexNoise.noise3D(x * f, y * f, z * f) + 1);
      f *= 2;
    }

    return sum;
  }

  onWindowResize() {
    this.restart();
  }

  render() {

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.pastX = p.x;
      p.pastY = p.y;

      const angle = Math.PI * this.config.angleCoef * this.getNoise(p.x / this.config.base, p.y / this.config.base, this.zNoiseOffset);

      p.x += Math.cos(angle) * this.config.step;
      p.y += Math.sin(angle) * this.config.step;

      this.ctx.beginPath();
      this.ctx.strokeStyle = this.config.strokeColor;
      this.ctx.moveTo(p.pastX, p.pastY);
      this.ctx.lineTo(p.x, p.y);
      this.ctx.stroke();

      if (p.x < 0
          || p.x > this.width
          || p.y < 0
          || p.y > this.height) {
        p.init();
      }

    }

    this.zNoiseOffset += this.config.zNoiseStep;
  }

  update() {
    if(this.updateActive) {
      this.render();
      if((now() - this.timeBegin) < this.timeLimit) {
        this.raf = raf(this.update);
      } else {
        this.updateActive = false;
      }

    } else {
      raf.cancel(this.raf);
    }
  }

}

export default Canvas;