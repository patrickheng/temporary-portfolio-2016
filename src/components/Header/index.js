import { h, Component } from 'preact';

import Emitter from 'core/Emitter';
import States from 'core/States';


class Header extends Component {

  constructor() {
    super();

  }

  render(props, state) {

    return (
      <header class="header">
        <h1 class="header_logo">Patrick Heng</h1>
        <button class="header_about">About Me</button>
      </header>
    );
  }

}

export default Header;