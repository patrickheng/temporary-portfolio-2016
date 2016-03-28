import { h, Component } from 'preact';

import Emitter from 'core/Emitter';
import States from 'core/States';

import {
  SPLASHSCREEN_HIDE,
  PROJECT_CHANGE
} from 'config/messages';

class ProjectLetters extends Component {

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

    this.projectInfoEls = this.base.getElementsByClassName('project-infos__el');
    this.projectInfoEls[0].classList.add(`project-infos__el--is-active`);

    this.transitionBlock = this.base.querySelector('.project-infos__transition-block');
  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {
    this.enterAnimation = this.enterAnimation.bind(this);
    this.onProjectChange = this.onProjectChange.bind(this);
  }

  addListerners() {
    Emitter.on(SPLASHSCREEN_HIDE, this.enterAnimation);
    Emitter.on(PROJECT_CHANGE, this.onProjectChange);
  }

  removeListerners() {
    Emitter.off(SPLASHSCREEN_HIDE, this.enterAnimation);
    Emitter.off(PROJECT_CHANGE, this.onProjectChange);
  }

  enterAnimation() {
    this.tl
      .set(this.transitionBlock, {scaleX: 1, transformOrigin: 'right'})
      .to(this.transitionBlock, 0.5, {scaleX: 0, ease: Expo.easeOut})
  }

  onProjectChange({currentProject, direction}) {
    // this.setState({ currentProject });

    let config = {};
    const activeInfo = this.projectInfoEls[currentProject.id];
    this.tl.clear();
    this.tl.kill();


    if (direction > 0)  {
      config = {
        startOrigin: 'left',
        endOrigin: 'right'
      }
    } else {
      config = {
        startOrigin: 'right',
        endOrigin: 'left'
      }
    }

    this.tl
      .set(this.transitionBlock, {transformOrigin: config.startOrigin})
      .to(this.transitionBlock, 0.5, {scaleX: 1, ease: Back.easeOut.config(0.7)})
      .addCallback(()=>{
        for (let i = 0; i < this.projectInfoEls.length; i++) {
          this.projectInfoEls[i].className = "project-infos__el";
        }
        activeInfo.classList.add(`project-infos__el--is-active`);
      })
      .set(this.transitionBlock, {transformOrigin: config.endOrigin})
      .to(this.transitionBlock, 0.5, {scaleX: 0, ease: Expo.easeOut})
  }

  render({}, {projects}) {
    let infos = [];

    for (let i = 0; i < projects.length; i++) {
      infos.push(
        <div class="project-infos__el">
          <h2 class="project-infos__title">{projects[i].name}</h2>
          <p class="project-infos__description">{projects[i].description}</p>
        </div>
      );
    }

    return (
      <div class="project-infos">
        <div class="project-infos__transition-block"></div>
          {infos}
      </div>
    );
  }

}

export default ProjectLetters;