import './styles.scss';

import { h, Component } from 'preact';

class ProjectRewards extends Component {

  constructor() {
    super();
  }

  render({rewards}, {}) {

    const list = [];

    for (let i = 0; i < rewards.length; i++) {
      const className = `project-reward project-reward--${rewards[i]}`;

      list.push(<span class={className}></span>);
    }

    return (
      <div class="project-rewards">
        {list}
      </div>
    );
  }

}

export default ProjectRewards;
