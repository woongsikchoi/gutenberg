import React, { createElement, Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'

import TinyMCEGutenberg from '../components/tinymce/TinyMCEGutenberg'
import { blockList, blockType, blockAlign, getTopLevelBlock } from '../utils/tag'
import * as content from '../actions/content'
import * as ui from '../actions/ui'
import '../../shared/post-content'

let blockOpen = (focused, collapsed) => (focused)               // block menu shown when focused
let inlineOpen = (focused, collapsed) => (focused && !collapsed) // inline if range selection

// get tiny node from the container, and the top level block from the caret node
let tinyNode = (containerNode) => ((containerNode && containerNode.children.length > 0) ? containerNode.children[0] : null)
let topLevelBlock = (tinyNode, node) => ((tinyNode && node) ? getTopLevelBlock(tinyNode, node) : {})

// Rect for the Range
let rangeRect = (range) => {
  return range === {} ? {} : range.getBoundingClientRect()
}

let blockMenuPos = (rect) => (rect ? { position: 'absolute', top: rect.top - 38 + 'px', right: rect.left + 38 + 'px', zIndex: 23 } : {})
let insertMenuPos = (rect) => (rect ? { position: 'absolute', top: rect.top - 38 + 'px', left: rect.left + 38 + 'px' } : {})

const mapStateToProps = ({collapsed, focused, range, node, editorRef, store}) => {
  let tiny = tinyNode(editorRef)
  let block = topLevelBlock(tiny, node)
  let blockRect = rangeRect(block)
  console.log('>> editor', editorRef, 'tiny:',tiny,'topBl:', block, 'br:', blockRect)

  return {
    store: store,
    blockRect: blockRect,
    isInlineOpen: inlineOpen(focused, collapsed),
    inlinePos: insertMenuPos(rangeRect(block)),
    node: node,
    isBlockOpen: blockOpen(focused, collapsed),
    blockType: blockType(block),
    blockAlign: blockAlign(block),
    blockPos: blockMenuPos(blockRect),
    content: window.content
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetup: (editorRef) => dispatch(content.setup(editorRef)),
    onNodeChange: (collapsed, bookmark, node, event) => dispatch(content.nodechange(collapsed, bookmark, node, event)),
    onFocus: (collapsed, bookmark, node) => dispatch(content.focus(collapsed, bookmark, node)),
    onBlur: (collapsed, bookmark, node) => dispatch(content.blur(collapsed, bookmark, node)),
    onClickOutside: () => dispatch(ui.clickOutside)
  }
}

const Turducken = connect(
  mapStateToProps,
  mapDispatchToProps
)(TinyMCEGutenberg)

export default Turducken

// ////////
// Anna's style: InlineToolbar appears at the start of the current Range
let findStartOfRange = (range) => {
  // make a collapsed range at the start point
  if (range) {
    let r = range.cloneRange();
    r.setEnd(range.startContainer, range.startOffset);
    return r.getBoundingClientRect();
  }
}

let positionNearCursor = (range) => {
  if (range) {
    let r = findStartOfRange(range)
    return { position: 'absolute', left: r.left - 10 + 'px', top: r.top - 48 + window.pageYOffset + 'px' }
  }
}
// ////////