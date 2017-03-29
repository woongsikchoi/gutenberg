import React, { createElement, Component } from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames';

import * as Icons from '../../external/dashicons'
import Button from '../button/Button'
import styles from './blocktoolbar.scss'
import { blockIconMap, blockList } from '../../utils/tag'

const getDropdownButtons = (options, selected) => ( options.filter((item) => (item !== selected)) )
const getActiveButton = (options, selected) => ( options.filter((item) => (item === selected)) )

export default class BlockChangeToolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  toggleMenu = () => {
    console.log('>toggle click', !this.state.open)
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    let {selected} = this.props
    let activeButton = getActiveButton(blockList, selected)
    let dropdownButtons = getDropdownButtons(blockList, selected)
    console.log('>act,drop', selected, activeButton, dropdownButtons)

    return (
      <div className={cx(styles.horizontal, styles.toolbarStyle)} onClick={this.toggleMenu.bind(this)} >
        <div>
          {activeButton.map((choice, index) => (
            <Button key={index}
              status={'ACTIVE'}>
              {blockIconMap[choice]}
            </Button>
          )
          )}

          {this.state.open && dropdownButtons.map((choice, index) => (
            <Button key={index} extraClass={[styles.verticalStyle]}
              status={'INACTIVE'}>
              {blockIconMap[choice]}
            </Button>
          )
          )}
        </div>
      </div>
    )
  }

}


