class Particle {

  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.pastX = this.x;
    this.pastY = this.y;
  }

  init() {
    this.x = this.pastX = window.innerWidth * Math.random();
    this.y = this.pastY = window.innerHeight * Math.random();
  }

}

export default Particle;