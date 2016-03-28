import { h, Component } from 'preact';

import States from 'core/States';
import Emitter from 'core/Emitter';
import Canvas from './Canvas';

import {
  SPLASHSCREEN_HIDE,
  PROJECT_CHANGE,
  WINDOW_RESIZE
} from 'config/messages';

class Background extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.bind();
  }

  componentDidMount() {

    this.addListerners();

    if(States.deviceType === 'desktop') {
      this.canvas = this.base.querySelector('canvas');
      this.canvas = new Canvas(this.canvas);
    }

  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {
    this.enterAnimation = this.enterAnimation.bind(this);
    this.onProjectChange = this.onProjectChange.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  addListerners() {
    Emitter.on(SPLASHSCREEN_HIDE, this.enterAnimation);
    Emitter.on(PROJECT_CHANGE, this.onProjectChange);
    Emitter.on(WINDOW_RESIZE, this.onWindowResize);
  }

  removeListerners() {
    Emitter.off(SPLASHSCREEN_HIDE, this.enterAnimation);
    Emitter.off(PROJECT_CHANGE, this.onProjectChange);
    Emitter.off(WINDOW_RESIZE, this.onWindowResize);
  }

  onProjectChange({currentProject}) {
    if(States.deviceType === 'desktop') {
      this.canvas.restart();
    }
  }

  onWindowResize() {
    this.canvas.onWindowResize();
  }

  enterAnimation() {
  }

  onMouseMove(ev) {

  }

  render(props, state) {

    return (
      <div class="background">
        <canvas class="background_canvas"></canvas>
      </div>
    );
  }

}

export default Background;