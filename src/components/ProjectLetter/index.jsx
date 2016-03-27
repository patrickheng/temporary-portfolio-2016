import { h, Component } from 'preact';

import Emitter from 'core/Emitter';

import States from 'core/States';

import randomFloat from 'utils/maths/random-float'

import {
  WINDOW_RESIZE
} from 'config/messages';

class ProjectLetter extends Component {

  constructor() {
    super();

  }

  componentDidMount() {

    this.bind();

    this.addListerners();

    TweenMax.from(this.base, 1, {scale: 0, opacity: 0,  ease: Expo.easeOut});
  }

  componentWillUpdate() {
    TweenMax.killTweensOf(this.base, {scale: true, opacity: true});
  }

  componentDidUpdate() {


    const delay = randomFloat(0, 0.5);

    TweenMax.fromTo(this.base, 0.5, {scale: 0, opacity: 0}, {scale: 1, opacity: 1, delay: delay, ease: Expo.easeOut});
  }

  componentWillUnmount() {

    this.removeListerners();

    console.log("unmount")
  }

  bind() {

  }

  addListerners() {

  }

  removeListerners() {

  }

  broadcastWindowOnResize() {

    Emitter.emit(WINDOW_RESIZE, {width: window.innerWidth, height:window.innerHeight});
  }

  render(props, state) {

    return (
      <div class="project-letter">
        {props.letter}
      </div>
    );
  }

}

export default ProjectLetter;