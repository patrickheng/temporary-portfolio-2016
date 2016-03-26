import { h, Component } from 'preact';

import ProjectLetters from 'components/ProjectLetters';
import ProjectVisual from 'components/ProjectVisual';
import ProjectInfos from 'components/ProjectInfos';


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
        <div class="project-container_content">
          <ProjectLetters />
          <ProjectVisual />
          <ProjectInfos />
        </div>
      </div>
    );
  }

}

export default Application;