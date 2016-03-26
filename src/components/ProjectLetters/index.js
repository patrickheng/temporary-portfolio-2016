import { h, Component } from 'preact';

import debounce from 'lodash.debounce';

import States from 'core/States';

import Emitter from 'core/Emitter';

import ProjectLetter from 'components/ProjectLetter';

import {
  PROJECT_CHANGE
} from 'config/messages';

class ProjectLetters extends Component {

  state = {
    currentProjectName: States.currentProject
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

  onProjectChange(currentProjectName) {
    this.setState({ currentProjectName });
  }

  render(props, state) {
    let letters = [];

    for (let i = 0; i < state.currentProjectName.length; i++) {
      letters.push(<ProjectLetter letter={state.currentProjectName[i]}/>)
    }

    return (
      <div class="project-letters">
        {letters}
      </div>
    );
  }

}

export default ProjectLetters;