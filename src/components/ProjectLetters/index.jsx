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


    this.base.classList.add(`project-letters--${this.state.currentProject.ref}`);
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
    this.base.className = "project-letters";
    this.base.classList.add(`project-letters--${this.state.currentProject.ref}`);
  }

  render(props, state) {
    let letters = [];

    for (let i = 0; i < state.currentProject.letters.length; i++) {
      letters.push(<ProjectLetter letter={state.currentProject.letters[i]}/>)
    }

    return (
      <div class="project-letters">
        {letters}
      </div>
    );
  }

}

export default ProjectLetters;