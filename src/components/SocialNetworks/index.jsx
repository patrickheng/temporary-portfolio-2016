import './styles.scss';

import { h, Component } from 'preact';

import Emitter from 'core/Emitter';
import States from 'core/States';

import {
  PROJECT_CHANGE
} from 'config/messages';

class ProjectTags extends Component {

  state = {
    currentProject: States.projects[0]
  }

  constructor() {
    super();

  }

  componentWillMount() {
    this.bind();
  }

  componentDidMount() {

    this.addListerners();
  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {
    this.onProjectChange = this.onProjectChange.bind(this);
  }

  addListerners() {
    Emitter.on(PROJECT_CHANGE, this.onProjectChange);
  }

  removeListerners() {
    Emitter.off(PROJECT_CHANGE, this.onProjectChange);
  }

  onProjectChange({currentProject}) {
    this.setState({ currentProject });
  }

  render(props, state) {

    return (
      <ul class="social-networks">
        <li class="social-networks__el social-networks__el--twitter">
          <a href="https://twitter.com/Pat_Hg" target="_blank">
            <span class="social-networks__icon icon icon-twitter"></span>
          </a>
        </li>
        <li class="social-networks__el social-networks__el--github">
          <a href="https://github.com/patrickheng" target="_blank">
            <span class="social-networks__icon icon icon-github"></span>
          </a>
        </li>
        <li class="social-networks__el social-networks__el--linkedin">
          <a href="https://www.linkedin.com/in/patrick-heng-67043184" target="_blank">
            <span class="social-networks__icon icon icon-linkedin"></span>
          </a>
        </li>
      </ul>
    );
  }

}

export default ProjectTags;
