import Immutable from 'seamless-immutable';
const initialState = Immutable({'alertStyle': {"display": "none"}, 'points': 0, "message": "", "username": "", "password": "", "logged_in": false, "buttonHover": false});
export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESSFUL':
      localStorage.setItem("user", JSON.stringify({"username": action.data.username, "password": state.password, "points": action.data.points}));    
      return state.merge({"message": action.data.message, "password": "", "logged_in": true, "points": action.data.points, "username": action.data.username})
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
      return state.merge({"username": action.data.username.username, "logged_in": true, "points": action.data.username.points})
    case 'UPLOAD_POINTS_SUCCESS':
      var cachedUser = JSON.parse(localStorage.getItem("user"));
      cachedUser.points = action.data.points;
      console.log(cachedUser);
      localStorage.setItem("user", JSON.stringify(cachedUser));
      return state.merge({"message": action.data.message, "points": action.data.points})
    case 'UPLOAD_POINTS_FAIL':
        if(action.data.points != null){
          cachedUser = JSON.parse(localStorage.getItem("user"));
          cachedUser.points = action.data.points;
          console.log(cachedUser);
          localStorage.setItem("user", JSON.stringify(cachedUser));
          return state.merge({"points": action.data.points})            
        } else {
            return state.merge({"message": "Unavailable. Please try again."})
        }
    case 'LOGOUT': 
      localStorage.setItem("user", null);        
      return state.merge({"logged_in": false, "message": "", "username": ""});
    
     case 'HIDE_ALERT_LOGIN':
        return state.merge({"alertStyle": action.data.alertStyle, "message": ""})

      case 'SHOW_ALERT_LOGIN':
        return state.merge({"alertStyle": action.data.alertStyle})
    default:
      return state
  }
}
