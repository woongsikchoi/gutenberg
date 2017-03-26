import React, { createElement, Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import Option from 'option'

import TinyMCEGutenberg from '../components/tinymce/TinyMCEGutenberg'
import * as Utils from '../utils/tag'
import * as Content from '../actions/content'
import * as Ui from '../actions/ui'
import '../../shared/post-content'

let blockOpen = (focused, collapsed) => (focused)               // block menu shown when focused
let inlineOpen = (focused, collapsed) => (focused && !collapsed) // inline if range selection

// get tiny node from the container, and the top level block from the caret node
let tinyNode = (containerOpt) => (containerOpt.flatMap((node) => (node.children.length > 0 ? Option.fromNullable(node.children[0]) : Option.none)))
let topLevelBlock = (tinyOpt, nodeOpt) => (tinyOpt.flatMap((tiny) => (nodeOpt.flatMap((node) => Option.fromNullable(Utils.getTopLevelBlock(tiny, node))))))

// Rect for the Range
let rangeRect = (rangeOpt) => rangeOpt.map((range) => range.getBoundingClientRect())

let blockMenuPos = (rectOpt) => rectOpt.map((rect) => ({
  position: 'absolute', top: rect.top - 38 + 'px', right: rect.left + 38 + 'px', zIndex: 23
})).valueOrElse({position: 'absolute', top: '0px', right: '0px', zIndex: 23})
let insertMenuPos = (rectOpt) => rectOpt.map((rect) => ({
  position: 'absolute', top: rect.top - 38 + 'px', left: rect.left + 38 + 'px' // TODO: Why no zIndex?
})).valueOrElse({position: 'absolute', top: '0px', right: '0px'})

const mapStateToProps = ({collapsed, focused, range, node, editorRef}) => {
  let tinyOpt = tinyNode(editorRef)
  let blockOpt = topLevelBlock(tinyOpt, node)
  let blockRectOpt = rangeRect(blockOpt)
  console.log('>> editor', editorRef.valueOrElse('none'), 'tiny:',tinyOpt.valueOrElse('none'),'topBl:', blockOpt.valueOrElse('none'), 'br:', blockRectOpt.valueOrElse('none'))

  return {
    blockRect: blockRectOpt.valueOrElse(null),
    isInlineOpen: inlineOpen(focused, collapsed),
    inlinePos: insertMenuPos(blockRectOpt),
    node: node,
    isBlockOpen: blockOpen(focused, collapsed),
    blockType: blockOpt.map((block) => Utils.blockType(block)).valueOrElse(''),
    blockAlign: blockOpt.map((block) => Utils.blockAlign(block)).valueOrElse(''),
    blockPos: blockMenuPos(blockRectOpt),
    content: window.content
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetup: (editorRef) => dispatch(Content.setup(editorRef)),
    onNodeChange: (collapsed, bookmark, node, event) => dispatch(Content.nodechange(collapsed, bookmark, node, event)),
    onFocus: (collapsed, bookmark, node) => dispatch(Content.focus(collapsed, bookmark, node)),
    onBlur: (collapsed, bookmark, node) => dispatch(Content.blur(collapsed, bookmark, node)),
    onClickOutside: () => dispatch(Ui.clickOutside)
  }
}

const Turducken = connect(
  mapStateToProps,
  mapDispatchToProps
)(TinyMCEGutenberg)

export default Turducken

// ////////
// Anna's style: InlineToolbar appears at the start of the current Range
// let findStartOfRange = (range) => {
//   // make a collapsed range at the start point
//   if (range) {
//     let r = range.cloneRange();
//     r.setEnd(range.startContainer, range.startOffset);
//     return r.getBoundingClientRect();
//   }
// }

// let positionNearCursor = (range) => {
//   if (range) {
//     let r = findStartOfRange(range)
//     return { position: 'absolute', left: r.left - 10 + 'px', top: r.top - 48 + window.pageYOffset + 'px' }
//   }
// }
// ////////