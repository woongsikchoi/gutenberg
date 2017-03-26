import React, { createElement, Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './box.scss';

// position a box at rect or no box if null
export default function Box({rect}) {
	return rect ? (
    <div>
      <div className={styles.box} style={ {background: '#ccc', position: 'absolute', top: rect.top + 'px', width: rect.width + 'px', height: '2px', } }></div>
      <div className={styles.box} style={ {background: '#ccc', position: 'absolute', top: rect.height + rect.top + 'px', width: rect.width + 'px', height: '2px' } }></div>
      <div className={styles.box} style={ {background: '#ccc', position: 'absolute', top: rect.top + 'px', width: '2px', height: rect.height + 'px' } }></div>
      <div className={styles.box} style={ {background: '#ccc', position: 'absolute', top: rect.top + 'px', width: '2px', height: rect.height + 'px', left: rect.width + rect.left + 'px' } }></div>
    </div>
	)
  : null
}
