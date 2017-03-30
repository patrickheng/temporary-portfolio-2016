import './styles.scss';

import { h, Component } from 'preact';

import Emitter from 'core/Emitter';
import States from 'core/States';

import {
  PROJECT_CHANGE,
  SPLASHSCREEN_HIDE
} from 'config/messages';

class ProjectTags extends Component {

  state = {
    projects: States.projects,
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

    this.line = this.base.querySelector('.project-index__line');
  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {
    this.enterAnimation = this.enterAnimation.bind(this);
    this.onProjectChange = this.onProjectChange.bind(this);
  }

  addListerners() {
    Emitter.on(PROJECT_CHANGE, this.onProjectChange);
    Emitter.on(SPLASHSCREEN_HIDE, this.enterAnimation);
  }

  removeListerners() {
    Emitter.off(PROJECT_CHANGE, this.onProjectChange);
    Emitter.off(SPLASHSCREEN_HIDE, this.enterAnimation);
  }

  enterAnimation() {
    TweenMax.from(this.line, 0.7, {scaleY: 0, opacity: 0, ease: Back.easeOut.config(0.8)});
  }

  onProjectChange({currentProject}) {
    this.setState({currentProject});
  }

  render(props, {projects, currentProject}) {
    const number = currentProject.id < 9 ? `0${currentProject.id + 1}` : currentProject.id + 1
    const pLength = projects.length < 9 ? `0${projects.length}` : projects.length
    return (
      <div class="project-index">

        <span class="project-index__line"></span>
        <span class="project-index__number">{number}</span>
        <span class="project-index__total">{projects.length}</span>

      </div>
    );
  }

}

export default ProjectTags;
