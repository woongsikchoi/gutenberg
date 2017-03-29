import React, { createElement, Component } from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames';

import * as Icons from '../../external/dashicons'
import BlockChangeToolbar from './BlockChangeToolbar'
import BlockAlignToolbar from './BlockAlignToolbar'
import Button from '../button/Button'
import styles from './blocktoolbar.scss'

export default class BlockToolbar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false,
			pos: this.props.pos
		}
	}

	render() {
		let pos = this.props.pos || this.state.pos
		let blockAlignOpen = this.state.open
		let {isOpen, blockAlign, blockType, editorFocus} = this.props

		// TODO: add option types
		return (isOpen && pos) ? (
			<div style={ pos }>
				<div className={styles.toolbar}
						onMouseEnter={ () => { this.setState({ open: true }) } }
						onMouseLeave={ () => { this.setState({ open: false }) } }
						>
					<BlockAlignToolbar  isOpen={blockAlignOpen} selected={blockAlign} />
					<BlockChangeToolbar selected={blockType} editorFocus={editorFocus} />
				</div>
			</div>
		)
		: null
	}
}