import Immutable from 'seamless-immutable';
const initialState = Immutable({'value': 0, "message": "", "username": "", "password": "", "logged_in": false, "buttonHover": false});
export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESSFUL':
      localStorage.setItem("user", JSON.stringify({"username": state.username, "password": state.password}));    
      return state.merge({"message": action.data.message, "password": "", "logged_in": true})
    case 'LOGIN_FAIL':
    return state.merge({"message": action.data.message, "logged_in": false})
    case 'LOGIN':
      return state.set("message", "Logging in...")
    case 'CHANGE_PASSWORD_LOGIN':
      return state.merge({"password": action.data.password})
    case 'CHANGE_USERNAME_LOGIN':
      return state.merge({"username": action.data.username});
    case 'RESET_LOGIN': 
      return state.merge({"message": action.data.message});
    case 'SET_LOGIN':
      return state.merge({"username": action.data.username, "logged_in": true})
    case 'LOGOUT': 
      localStorage.setItem("user", null);        
      return state.merge({"logged_in": false, "message": "", "username": ""});
    default:
      return state
  }
}
