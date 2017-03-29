import React, { createElement, Component } from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames';

import * as Icons from '../../external/dashicons'
import Dropbutton from '../dropbutton/Dropbutton'
import Button from '../button/Button'

import {isBold, isItalic, isDel, isLink} from '../../utils/tag'
import styles from './inlinetoolbar.scss'


const nodeOrParent = (pred, el) => {
	return pred(el.nodeName) || (el.parentNode && pred(el.parentNode.nodeName))
}

const status = (pred, el) => {
	return ( el && nodeOrParent(pred, el) ) ? 'ACTIVE' : 'INACTIVE'
}

export default class InlineToolbar extends React.Component {
	render() {
		let {isOpen, pos, node} = this.props || {}

		return isOpen ? (
			<div className={styles.toolbarWrapper}
				style={ pos } >
				<div className={styles.toolbar}>
					<Button status={ status( isBold, node ) }
						>
						<Icons.EditorBoldIcon />
					</Button>
					<Button status={ status( isItalic, node ) }
						>
						<Icons.EditorItalicIcon />
					</Button>
					<Button status={ status( isDel, node ) }
						>
						<Icons.EditorStrikethroughIcon />
					</Button>
				</div>
			</div>
		)
		: null
	}
}

/* TODO:
	onClick={ store.dispatch( { type: 'EFFECT_BOLD' } ) }
	onClick={ store.dispatch( { type: 'EFFECT_ITALIC' } ) }
	onClick={ store.dispatch( { type: 'EFFECT_DEL' } ) }
*/
