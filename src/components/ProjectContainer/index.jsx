import { h, Component } from 'preact';

import ProjectLetters from 'components/ProjectLetters';
import ProjectVisual from 'components/ProjectVisual';
import ProjectInfos from 'components/ProjectInfos';
import ProjectTags from 'components/ProjectTags';
import ProjectIndex from 'components/ProjectIndex';
import ProjectTitle from 'components/ProjectTitle';
import ProjectLinks from 'components/ProjectLinks';


class Application extends Component {

  constructor() {
    super();

  }

  componentDidMount() {

    this.bind();

    this.addListerners();
  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {
  }

  addListerners() {
  }

  removeListerners() {
  }


  render(props, state) {

    return (
      <div class="project-container">
        <div class="project-container__content">
          <ProjectIndex />
          <ProjectTitle />
          <ProjectVisual />
          <ProjectInfos />
          <ProjectTags />
          <ProjectLinks />
        </div>
      </div>
    );
  }

}

export default Application;