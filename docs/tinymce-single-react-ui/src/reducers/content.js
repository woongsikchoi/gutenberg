// TODO: use redux-actions

// TODO: replace nulls with Option values below
const initialState = {
  focused: false,  // does the editor have focus
  collapsed: null, // current selection is collapsed
  bookmark: null,  // current bookmark for restoring the selection
  node: null,      // current node of the selection (if collapsed) or common ancestor containing the selection)
  range: null,     // current selection range
  editorRef: null  // reference to the editor
}

export default (state, action) => {
  console.log('>> content: ', state, action)
  if ( ! state ) {
    state = initialState;
  }

  switch (action.type) {
    case '@@redux/INIT':
      return state
    case 'SETUP':
      return {
        ...state,
        ...action
      }
    case 'FOCUS':
      return {
        ...state,
        ...action,
        focused: true
      }
    case 'BLUR':
      return {
        ...state,
        ...action,
        focused: false
      }
    case 'NODECHANGE':
      return {
        ...state,
        ...action
      }
    default:
      return state
  }
}