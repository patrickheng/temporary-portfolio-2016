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

    this.base.classList.add(`project-tags--${this.state.currentProject.ref}`);
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
    this.base.className = "project-tags";
    this.base.classList.add(`project-tags--${this.state.currentProject.ref}`);
  }

  render(props, state) {

    return (
      <div class="project-tags">
        <ul class="projects-tags__list">
          <li class="projects-tags__el"></li>
        </ul>
      </div>
    );
  }

}

export default ProjectTags;