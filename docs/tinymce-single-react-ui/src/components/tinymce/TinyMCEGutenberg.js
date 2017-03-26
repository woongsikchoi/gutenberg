import React, { createElement, Component } from 'react'
import { render } from 'react-dom'
import enhanceWithClickOutside from 'react-click-outside'

import * as Icons from '../../external/dashicons/index'
import Box from '../box/Box'
import InlineToolbar from '../toolbar/InlineToolbar'
import BlockToolbar from '../toolbar/BlockToolbar'
import TinyMCEReact from './tinymce-react-ui'
import '../../../shared/post-content'
import '../../assets/stylesheets/main.scss'


class TinyMCEGutenberg extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClickOutside = this.props.onClickOutside

  render() {
    let {
      blockRect, isInlineOpen, inlinePos, node,
      isBlockOpen, blockType, blockAlign, blockPos, content,
      onSetup, onFocus, onBlur, onNodeChange
    } = this.props

    return (
      <div>
        <Box rect={blockRect} />

        <TinyMCEReact content={content}
          onSetup={onSetup}
          onNodeChange={onNodeChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    )
  }
}

/*
<InlineToolbar isOpen={isInlineOpen}
          inlinePos={inlinePos}
          node={node}
        />
        <BlockToolbar isOpen={isBlockOpen}
          blockType={blockType}
          blockAlign={blockAlign}
          pos={blockPos}
        />
*/
TinyMCEGutenberg.propTypes = {
  blockRect: React.PropTypes.shape({
    top: React.PropTypes.number.isRequired, // initially these are empty
    left: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired
  }),
  isInlineOpen: React.PropTypes.bool.isRequired,
  inlinePos: React.PropTypes.shape({
    position: React.PropTypes.string,
    top: React.PropTypes.string,
    left: React.PropTypes.string,
    right: React.PropTypes.string,
    zIndex: React.PropTypes.number
  }).isRequired,
  node: React.PropTypes.object.isRequired, // Option(DOM element)
  isBlockOpen: React.PropTypes.bool.isRequired,
  blockType: React.PropTypes.string.isRequired,
  blockAlign: React.PropTypes.string.isRequired,
  blockPos: React.PropTypes.shape({
    position: React.PropTypes.string,
    top: React.PropTypes.string,
    left: React.PropTypes.string,
    right: React.PropTypes.string,
    zIndex: React.PropTypes.number
  }).isRequired,
  content: React.PropTypes.string,
  onSetup: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onNodeChange: React.PropTypes.func
};

export default enhanceWithClickOutside(TinyMCEGutenberg)
