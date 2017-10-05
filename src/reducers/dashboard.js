import Immutable from 'seamless-immutable';
const initialState = Immutable({"search": false});
export default (state = initialState, action) => {
  switch (action.type) {
      case 'SHOW_SEARCH_MODAL': 
        return state.merge({"search": true})
      case 'HIDE_SEARCH_MODAL':
        return state.merge({"search": false})
    default:
      return state
  }
}
