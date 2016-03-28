import { h, Component } from 'preact';

import debounce from 'lodash.debounce';

import States from 'core/States';
import Emitter from 'core/Emitter';

import Splashscreen from 'components/Splashscreen';
import Background from 'components/Background';
import Header from 'components/Header';
import About from 'components/About';
import ProjectContainer from 'components/ProjectContainer';
import ProjectNavigation from 'components/ProjectNavigation';
import SocialNetworks from 'components/SocialNetworks';

import {
  WINDOW_RESIZE
} from 'config/messages';

class Application extends Component {

  state = {
  }

  constructor() {
    super();

  }

  componentDidMount() {

    this.bind();

    this.addListerners();

    this.addDeviceClass();
    this.addBrowserClass();
  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {

    this.onWindowResize = debounce(this.broadcastWindowOnResize, 100);
  }

  addListerners() {

    window.addEventListener('resize', this.onWindowResize, false);
  }

  removeListerners() {

    window.removeEventListerner('resize', this.onWindowResize, false);
  }

  addBrowserClass() {
    this.base.classList.add(States.browserName + '-browser');
  }

  addDeviceClass() {
    this.base.classList.add(States.deviceType + '-device');
  }

  broadcastWindowOnResize() {

    Emitter.emit(WINDOW_RESIZE, {width: window.innerWidth, height:window.innerHeight});
  }

  render(props, state) {

    return (
      <div class="application">
        <Splashscreen />
        <Header />
        <About />
        <div class="wrapper">
          <Background />
          <ProjectNavigation />
          <ProjectContainer />
          <SocialNetworks />
        </div>
      </div>
    );
  }

}

export default Application;