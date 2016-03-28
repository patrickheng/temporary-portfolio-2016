import { h, Component } from 'preact';

import Emitter from 'core/Emitter';
import States from 'core/States';

import {
  PROJECT_CHANGE,
  SPLASHSCREEN_HIDE
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
    this.timeout = null;
  }

  componentDidMount() {

    this.addListerners();

    this.els = this.base.querySelectorAll('.project-navigation__el');
    this.prevEl = this.base.querySelector('.project-navigation__el--previous');
    this.nextEl = this.base.querySelector('.project-navigation__el--next');

  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {
    this.onProjectChange = this.onProjectChange.bind(this);
  }

  enterAnimation() {
    //TweenMax.from(this.base, 1.6, {scale: 0.9, ease: Power2.easeOut}, 1);
  }

  addListerners() {
    Emitter.on(SPLASHSCREEN_HIDE, this.enterAnimation);
    Emitter.on(PROJECT_CHANGE, this.onProjectChange);
  }

  removeListerners() {
    Emitter.off(SPLASHSCREEN_HIDE, this.enterAnimation);
    Emitter.off(PROJECT_CHANGE, this.onProjectChange);
  }

  onProjectChange({currentProject, direction}) {
    this.setState({ currentProject });
    this.base.className = "project-navigation";

    if(direction < 0) {
      this.prevEl.classList.add('project-navigation__el--feedback');
    } else {
      this.nextEl.classList.add('project-navigation__el--feedback');
    }

    this.timeout = setTimeout(()=> {
      for (let i = 0; i < this.els.length; i++) {
        this.els[i].classList.remove('project-navigation__el--feedback');
      }
    }, 300);
  }

  previousProject() {
    States.currentProjectIndex = (States.currentProjectIndex > 0) ? States.currentProjectIndex - 1 : States.projectsNb - 1;
    Emitter.emit(PROJECT_CHANGE, {
      currentProject: States.projects[States.currentProjectIndex],
      direction: -1
    });
  }

  nextProject() {
    States.currentProjectIndex = (States.currentProjectIndex < States.projectsNb - 1) ? States.currentProjectIndex + 1 : 0;
    Emitter.emit(PROJECT_CHANGE, {
      currentProject: States.projects[States.currentProjectIndex],
      direction: 1
    });
  }

  render(props, state) {

    return (
      <div class="project-navigation">
        <button
          class="project-navigation__el project-navigation__el--previous"
          onClick={ this.previousProject }
        >
          <span class="project-navigation__el-line"></span>
          <span class="project-navigation__el-text">Previous</span>
          <span class="project-navigation__el-icon icon icon-chevron-thin-left"></span>
        </button>

        <button
          class="project-navigation__el project-navigation__el--next"
          onClick={ this.nextProject }
        >
          <span class="project-navigation__el-line"></span>
          <span class="project-navigation__el-text">Next</span>
          <span class="project-navigation__el-icon icon icon-chevron-thin-right"></span>
        </button>

      </div>
    );
  }

}

export default ProjectNavigation;