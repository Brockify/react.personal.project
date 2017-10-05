import Immutable from 'seamless-immutable';
const initialState = Immutable({'alertStyle': {"display": "none"}, "message": "", "password": "", "username": "", "email": ""});
export default (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESSFUL':
      return state.merge({"message": action.data.message, "username": "", "password": "", "email": "", register: true})
    case 'REGISTER_FAIL':
      return state.merge({"message": action.data.message, register: false})
    case 'REGISTER':
      return state.set("message", "Registering...")
    case 'CHANGE_PASSWORD_REGISTER':
      return state.merge({"password": action.data.password})
    case 'CHANGE_USERNAME_REGISTER':
      return state.merge({"username": action.data.username});
    case 'CHANGE_EMAIL_REGISTER':
      return state.merge({"email": action.data.email})
    case 'RESET_MESSAGE_REGISTER': 
      return state.merge({"message": action.data.message, register: false});
    case 'HIDE_ALERT_REGISTER':
      return state.merge({"alertStyle": action.data.alertStyle, "message": ""})
    case 'SHOW_ALERT_REGISTER':
      return state.merge({"alertStyle": action.data.alertStyle})
    default:
      return state
  }
}
