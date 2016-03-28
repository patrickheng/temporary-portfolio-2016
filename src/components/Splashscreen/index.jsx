import { h, Component } from 'preact';

import Emitter from 'core/Emitter';

import {
  ABOUT_OPEN,
  ABOUT_CLOSE
} from 'config/messages';

class Splashscreen extends Component {
  constructor() {
    super();

  }

  componentWillMount() {
    this.bind();
  }

  componentDidMount() {

    this.addListerners();
    this.generateTimelineMax();

  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {
  }

  addListerners() {
  }

  removeListerners() {
  }

  generateTimelineMax() {

    this.tl = new TimelineMax({
      onComplete: ()=> {
        this.base.classList.add('splashscreen--is-hidden');
      }
    });

    this.tl
      .to(this.base, 6, {opacity: 0, ease: Expo.easeOut});
  }


  render(props, state) {

    return (
      <div class="splashscreen"></div>
    );
  }

}

export default Splashscreen;