import { h, Component } from 'preact';

import Emitter from 'core/Emitter';
import States from 'core/States';

import {
  PROJECT_CHANGE
} from 'config/messages';

class ProjectVisual extends Component {

  state = {
    currentProject: States.currentProject
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
      <div class="project-visual">
        <div class="project-visual_container">
          <ul class="project-visual__list">
            <li class="project-visual__el" style="background: url(/images/codevember.jpg) center no-repeat;">{state.currentProject}</li>
          </ul>
        </div>
      </div>
    );
  }

}

export default ProjectVisual;