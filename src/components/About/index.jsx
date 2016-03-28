import { h, Component } from 'preact';

import Emitter from 'core/Emitter';

import {
  ABOUT_OPEN,
  ABOUT_CLOSE
} from 'config/messages';

class About extends Component {
  state = {
    isOpen: false
  }

  constructor() {
    super();

  }

  componentWillMount() {
    this.bind();
  }

  componentDidMount() {

    this.addListerners();

    setTimeout(()=>{
      this.generateTimelineMax();
    }, 1000);

  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  addListerners() {
    Emitter.on(ABOUT_OPEN, this.onOpen);
    Emitter.on(ABOUT_CLOSE, this.onClose);

    document.addEventListener('keyup', this.onKeyUpEscapeKey, false);
  }

  removeListerners() {
    Emitter.off(ABOUT_OPEN, this.onOpen);
    Emitter.off(ABOUT_CLOSE, this.onClose);
  }

  generateTimelineMax() {

    this.appWrapper = document.querySelector('.wrapper');

    this.tl = new TimelineMax({
      paused: true,
      onReverseComplete: () =>{
        Emitter.emit(ABOUT_CLOSE);
      }
    });

    this.tl
      .to(this.base, 1, {x: '0%', ease: Expo.easeOut})
      .to(this.appWrapper, 1, {left: -400, ease: Expo.easeOut}, 0);

  }

  onOpen() {
    this.setState({isOpen: true});

    this.tl.play(0);
  }

  onClose() {
    this.setState({isOpen: false});

    this.tl.reverse();
  }

  onKeyUpEscapeKey(ev) {
    if(ev.keyCode === 27) {
      Emitter.emit(ABOUT_CLOSE);
    }
  }

  render(props, state) {

    return (
      <div class="about">

      </div>
    );
  }

}

export default About;