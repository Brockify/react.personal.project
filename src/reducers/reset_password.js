import Immutable from 'seamless-immutable';
const initialState = Immutable({"alertStyle": {"display": "none"}, "username": "", "message": "", "resetPassword": false});
export default (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_PASSWORD':
        return state.merge({"message": "Resetting password."})

    case 'RESET_PASSWORD_FAIL':
        return state.merge({"message": action.data.message, "resetPassword": false})
    
    case 'RESET_PASSWORD_SUCCESS':
        return state.merge({"message": action.data.message, "username": "", "resetPassword": true})

    case 'CHANGE_USERNAME_RESET':
        return state.merge({"username": action.data.username})    
        
    case 'RESET_PASSWORD_RESET':
        return state.merge({"message": ""})
    case 'HIDE_ALERT_PASSWORD_RESET':
        return state.merge({"alertStyle": action.data.alertStyle, "message": ""})

      case 'SHOW_ALERT_PASSWORD_RESET':
        return state.merge({"alertStyle": action.data.alertStyle})
    default:
      return state
  }
}
