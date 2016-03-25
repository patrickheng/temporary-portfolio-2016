import { h, Component } from 'preact';

import ProjectVisual from 'components/ProjectVisual';

class Application extends Component {

  constructor() {
    super();

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render(props, state) {
    return (
      <div class="application">

        <ProjectVisual />

      </div>
    );
  }

}

export default Application;