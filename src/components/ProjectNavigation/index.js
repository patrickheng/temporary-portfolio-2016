import { h, Component } from 'preact';

import Emitter from 'core/Emitter';
import States from 'core/States';

import {
  PROJECT_CHANGE
} from 'config/messages';

class ProjectNavigation extends Component {

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

    this.base.classList.add(`project-navigation--${this.state.currentProject.ref}`);
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
    this.base.className = "project-navigation";
    this.base.classList.add(`project-navigation--${this.state.currentProject.ref}`);
  }

  render(props, state) {

    return (
      <div class="project-navigation">
        <button class="project-navigation_el project-navigation_el--previous">Previous</button>
        <button class="project-navigation_el project-navigation_el--next">Next</button>
      </div>
    );
  }

}

export default ProjectNavigation;