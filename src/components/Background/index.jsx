import SVG from 'preact-svg';
import { h, Component } from 'preact';

import Emitter from 'core/Emitter';

import {
  SPLASHSCREEN_HIDE,
  PROJECT_CHANGE
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
    this.slashLeft = this.base.querySelector('.background_el--left');
    this.slashRight = this.base.querySelector('.background_el--right');
  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {
    this.enterAnimation = this.enterAnimation.bind(this);
    this.onProjectChange = this.onProjectChange.bind(this);
  }

  addListerners() {
    Emitter.on(SPLASHSCREEN_HIDE, this.enterAnimation);
    Emitter.on(PROJECT_CHANGE, this.onProjectChange);
  }

  removeListerners() {
    Emitter.off(SPLASHSCREEN_HIDE, this.enterAnimation);
    Emitter.off(PROJECT_CHANGE, this.onProjectChange);
  }

  onProjectChange({currentProject}) {
  }

  enterAnimation() {
    TweenMax.from(this.slashLeft, 1, { x: "-10%", y: '100%', ease: Power2.easeOut});
    TweenMax.from(this.slashRight, 1, { x: "10%",  y: '-100%', ease: Power2.easeOut});
  }

  onMouseMove(ev) {

  }

  render(props, state) {

    return (
      <div class="background">
        <SVG class="background_el background_el--left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">

          <path class="background_path background_el--slash" d="M246.5 2.2l128.6 2.2L164.3 398H26"/>
        </SVG>
        <SVG class="background_el background_el--right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">

          <path class="background_path background_el--slash" d="M246.5 2.2l128.6 2.2L164.3 398H26"/>
        </SVG>
      </div>
    );
  }

}

export default Background;