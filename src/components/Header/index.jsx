import './styles.scss'

import { h, Component } from 'preact'

import Emitter from 'core/Emitter'
import States from 'core/States'

import {
  ABOUT_OPEN
} from 'config/messages'

class Header extends Component {
  constructor () {
    super()

  }

  openAbout () {
    Emitter.emit(ABOUT_OPEN)
  }

  render (props, state) {
    return (
      <header class='header'>
        <h1 class='header__logo'>Patrick Heng</h1>
        <strong class='header__logo-subtitle'>creative developer</strong>
        <button class='header__about' onClick={this.openAbout}>About</button>
      </header>
    )
  }
}

export default Header
