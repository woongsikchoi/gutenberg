
export const setup = (editorRef) => ({
  type: 'SETUP',
  editorRef
})

export const nodechange = (collapsed, bookmark, node, range, event) => ({
  type: 'NODECHANGE',
  collapsed, bookmark, node, range
})

export const focus = (collapsed, bookmark, node, range) => ({
  type: 'FOCUS',
  collapsed, bookmark, node, range
})

export const blur = (collapsed, bookmark, node, range) => ({
  type: 'BLUR',
  collapsed, bookmark, node, range
})

export default { setup, nodechange, focus, blur }
