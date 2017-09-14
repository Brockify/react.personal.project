import Immutable from 'seamless-immutable';
const initialState = Immutable({"message": "", "password": "", "username": ""});
export default (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESSFUL':
      return state.merge({"message": action.data.message, "username": "", "password": ""})
    case 'REGISTER_FAIL':
    return state.set("message", action.data.message)
    case 'REGISTER':
      return state.set("message", "Registering...")
    case 'CHANGE_PASSWORD_REGISTER':
      return state.merge({"password": action.data.password})
    case 'CHANGE_USERNAME_REGISTER':
      return state.merge({"username": action.data.username});
    case 'RESET_MESSAGE_REGISTER': 
      return state.merge({"message": action.data.message});
    default:
      return state
  }
}
