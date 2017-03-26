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
      blockRect, isInlineOpen, store, inlinePos, node,
      isBlockOpen, blockType, blockAlign, blockPos, content,
      onSetup, onFocus, onBlur, onNodeChange
    } = this.props

    return (
      <div>
        <Box blockRect={blockRect} />
        <InlineToolbar isOpen={isInlineOpen}
          myStore={store}
          inlinePos={inlinePos}
          node={node}
        />
        <BlockToolbar isOpen={isBlockOpen}
          blockType={blockType}
          blockAlign={blockAlign}
          pos={blockPos}
        />
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

TinyMCEGutenberg.propTypes = {
  blockRect: React.PropTypes.shape({
    top: React.PropTypes.number.isRequired, // initially these are empty
    left: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired
  }).isRequired,
  isInlineOpen: React.PropTypes.bool.isRequired,
  store: React.PropTypes.object.isRequired, // TODO: removeme
  inlinePos: React.PropTypes.shape({
    position: React.PropTypes.string,
    top: React.PropTypes.string,
    left: React.PropTypes.string,
    right: React.PropTypes.string,
    zIndex: React.PropTypes.number
  }).isRequiredl,
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
  content: React.PropTypes.object.isRequired,
  onSetup: React.PropTypes.func.isRequired,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onNodeChange: React.PropTypes.func
};

export default enhanceWithClickOutside(TinyMCEGutenberg)
