import Immutable from 'seamless-immutable';
const initialState = Immutable({switchReadToUnread: false, switchReadToUnreadMessage: "",switchToReadMessage: "", switchingToRead: false, deleting: false, "search": false, read: [], unread: [], "adding": false, "addMessage": "", "deleteMessage": ""});
export default (state = initialState, action) => {
  switch (action.type) {
      case 'SHOW_SEARCH_MODAL': 
        return state.merge({"search": true})
      case 'HIDE_SEARCH_MODAL':
        return state.merge({"search": false})
      case 'SET_DASHBOARD':
        return state.merge({"unread": action.data.unread, "read": action.data.read})
      case 'SWITCH_TO_READ':
        return state.merge({switchingToRead: true, "switchToReadMessage": "loading..."})
      case 'SWITCH_TO_READ_SUCCESS':
        var cachedUser = JSON.parse(localStorage.getItem("user"));
        var newReadArray = [];
        var unreadArray = []
        for(var i = 0; i < state.read.length; i++){
          newReadArray.push(state.read[i])
        }
        for(var j = 0; j < state.unread.length; j++){
          if(state.unread[j].id === action.data.comic.id){
            newReadArray.push(state.unread[j])
          } else {
            unreadArray.push(state.unread[j])
          }
        }
        cachedUser.unread = unreadArray
        cachedUser.read = newReadArray
        localStorage.setItem("user", JSON.stringify(cachedUser));        
        return state.merge({unread: unreadArray, read: newReadArray, switchingToRead: false, switchToReadMessage: action.data.message})
      case 'SWITCH_TO_READ_FAIL':
        return state.merge({switchingToRead: false, switchToReadMessage: action.data.message})  

      case 'SWITCH_READ_TO_UNREAD':
        return state.merge({switchReadToUnread: true, switchReadToUnreadMessage: "loading..."})
      case 'SWITCH_READ_TO_UNREAD_SUCCESS':
        var cachedUser = JSON.parse(localStorage.getItem("user"));
        var newReadArray = [];
        var unreadArray = []
        for(var i = 0; i < state.unread.length; i++){
          unreadArray.push(state.unread[i])
        }
        for(var j = 0; j < state.read.length; j++){
          if(state.read[j].id === action.data.comic.id){
            unreadArray.push(state.read[j])
          } else {
            newReadArray.push(state.read[j])
          }
        }
        cachedUser.unread = unreadArray
        cachedUser.read = newReadArray
        localStorage.setItem("user", JSON.stringify(cachedUser));        
        return state.merge({unread: unreadArray, read: newReadArray, switchReadToUnread: false, switchReadToUnreadMessage: action.data.message})
      case 'SWITCH_READ_TO_UNREAD_FAIL':
        return state.merge({switchReadToUnread: false, switchReadToUnreadMessage: action.data.message})  
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
