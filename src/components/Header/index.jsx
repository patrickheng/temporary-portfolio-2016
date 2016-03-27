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
        <h1 class="header__logo">Patrick Heng</h1>
        <strong class="header__logo-subtitle">creative developer</strong>
        <button class="header__about">About Me</button>
      </header>
    );
  }

}

export default Header;