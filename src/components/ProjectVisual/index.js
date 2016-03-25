import { h, Component } from 'preact';

import PixiApp from './PixiApp';

class ProjectVisual extends Component {

  constructor() {
    super();

  }

  componentDidMount() {
    this.pixiApp = new PixiApp(this.base);
  }

  componentWillUnmount() {

  }

  render(props, state) {
    return (
      <div class="ProjectVisual">

      </div>
    );
  }

}

export default ProjectVisual;