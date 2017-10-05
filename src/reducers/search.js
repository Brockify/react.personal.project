import Immutable from 'seamless-immutable';
const initialState = Immutable({"search": false, "comicData": []});
export default (state = initialState, action) => {
  switch (action.type) {
      case 'SEARCH': 
        return state.merge({"search": true})
      case 'SEARCH_SUCCESS':
        return state.merge({"search": false, comicData: action.data.comicData})
      case 'SEARCH_FAIL':
        return state.merge({"search": false, comicData: []})
    default:
      return state
  }
}
