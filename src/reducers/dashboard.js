import Immutable from 'seamless-immutable';
const initialState = Immutable({deleting: false, "search": false, unread: [], "adding": false, "addMessage": "", "deleteMessage": ""});
export default (state = initialState, action) => {
  switch (action.type) {
      case 'SHOW_SEARCH_MODAL': 
        return state.merge({"search": true})
      case 'HIDE_SEARCH_MODAL':
        return state.merge({"search": false})
      case 'SET_DASHBOARD':
        return state.merge({"unread": action.data.unread})
      case 'ADD_COMIC': 
        return state.merge({adding: true, "addMessage": "loading..."});
      case 'ADD_COMIC_SUCCESS':
      var cachedUser = JSON.parse(localStorage.getItem("user"));      
      var newArray = [];
        for(var i =0; i < state.unread.length; i++){
          newArray.push(state.unread[i])
        }
        newArray.push(action.data.comic)
        cachedUser.unread = newArray;
        localStorage.setItem("user", JSON.stringify(cachedUser));
        return state.merge({adding: false, "addMessage": "", unread: newArray});
      case 'ADD_COMIC_FAIL':
        return state.merge({adding: false, "addMessage": action.data.message});     
      case 'DELETE_COMIC':
        return state.merge({deleting: true, "deleteMessage": "loading..."})
      case 'DELETE_COMIC_SUCCESS':
        var cachedUser = JSON.parse(localStorage.getItem("user"));      
        var newArray = [];
        for(var i =0; i < state.unread.length; i++){
          if(state.unread[i].id == action.data.id){

          } else {
            newArray.push(state.unread[i]);
          }
        }
        cachedUser.unread = newArray;
        localStorage.setItem("user", JSON.stringify(cachedUser));
        return state.merge({unread: newArray, deleting: false, "deleteMessage": ""})
      case 'DELETE_COMIC_FAIL':
        return state.merge({deleting: false, "deleteMessage": action.data.message});      
    default:
      return state
  }
}
