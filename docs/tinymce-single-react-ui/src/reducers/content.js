import option from 'option'

// TODO: use redux-actions

// TODO: replace nulls with Option values below
const initialState = {
  focused: false,  // does the editor have focus
  collapsed: null, // current selection is collapsed
  bookmark: null,  // current bookmark for restoring the selection
  node: option.none,      // current node of the selection (if collapsed) or common ancestor containing the selection)
  range: option.none,     // current selection range
  editorRef: option.none,  // reference to the editor,
  uiFocus: false,
}

export default (state, action) => {
  if ( ! state ) {
    state = initialState;
  }

  switch (action.type) {
    case 'SETUP':
      return {
        ...state,
        editorRef: option.fromNullable(action.editorRef)
      }
    case 'FOCUS':
      return {
        ...state,
        focused: true,
        collapsed: action.collapsed,
        bookmark: action.bookmark,
        node: option.fromNullable(action.node),
        range: option.fromNullable(action.range)
      }
    case 'BLUR':
      return {
        ...state,
        focused: false,
        collapsed: action.collapsed,
        bookmark: action.bookmark,
        node: option.fromNullable(action.node),
        range: option.fromNullable(action.range)
      }
    case 'NODECHANGE':
      return {
        ...state,
        collapsed: action.collapsed,
        bookmark: action.bookmark,
        node: option.fromNullable(action.node),
        range: option.fromNullable(action.range)
      }
    case 'OUTER_CLICK_OUTSIDE':
      return {
        ...state,
        uiFocus: true
      }
    case 'OUTER_CLICK_INSIDE':
      return {
        ...state,
        uiFocus: false
      }
    default:
      return state
  }
}