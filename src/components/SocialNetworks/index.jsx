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

  onProjectChange(currentProject) {
    this.setState({ currentProject });
  }

  render(props, state) {

    return (
      <ul class="social-networks">
        <li class="social-networks__el social-networks__el--twitter">
          <span class="social-networks__icon icon icon-twitter"></span>
        </li>
        <li class="social-networks__el social-networks__el--github">
          <span class="social-networks__icon icon icon-github"></span>
        </li>
        <li class="social-networks__el social-networks__el--linkedin">
          <span class="social-networks__icon icon icon-linkedin"></span>
        </li>
      </ul>
    );
  }

}

export default ProjectTags;