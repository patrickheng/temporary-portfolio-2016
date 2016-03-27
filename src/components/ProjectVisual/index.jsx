import { h, Component } from 'preact';

import Emitter from 'core/Emitter';
import States from 'core/States';

import {
  PROJECT_CHANGE
} from 'config/messages';

class ProjectVisual extends Component {

  state = {
    projects: States.projects,
    currentProject: States.projects[0]
  }

  constructor() {
    super();

  }

  componentWillMount() {
    this.bind();
    this.tl = new TimelineMax();
  }

  componentDidMount() {

    this.addListerners();
    this.visualEls = this.base.getElementsByClassName('project-visual__el');

    this.visualEls[0].classList.add('project-visual__el--is-active');
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

  onProjectChange({currentProject, direction}) {
    this.setState({currentProject});

    const visualActive = this.visualEls[currentProject.id];

    for (let i = 0; i < this.visualEls.length; i++) {
      this.visualEls[i].classList.remove('project-visual__el--is-active');
    }

    visualActive.classList.add('project-visual__el--is-active');

    this.tl.clear();
    this.tl.kill();

    const x = -direction * 0;

    this.tl
      .fromTo(visualActive, 2, {scale: 1.04, x: x + '%'}, {scale: 1, x: "0%", ease: Expo.easeOut})
  }

  render({}, {projects, currentProject}) {
    let projectVisuals = [];

    for (let i = 0; i < projects.length; i++) {
      const imgPath = `/images/${projects[i].ref}.jpg`
      projectVisuals.push(<img class="project-visual__el" src={imgPath} />)
    }

    return (
      <div class="project-visual">
        <div class="project-visual__container">
          <div class="project-visual__transition-block"></div>
          <div class="project-visual__list">
            {projectVisuals}
          </div>
        </div>
      </div>
    );
  }

}

export default ProjectVisual;