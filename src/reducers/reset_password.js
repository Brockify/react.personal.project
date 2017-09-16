import Immutable from 'seamless-immutable';
const initialState = Immutable({"username": "", "message": ""});
export default (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_PASSWORD':
        return state.merge({"message": "Resetting password."})

    case 'RESET_PASSWORD_FAIL':
        return state.merge({"message": action.data.message})
    
    case 'RESET_PASSWORD_SUCCESS':
        return state.merge({"message": action.data.message, "username": ""})

    case 'CHANGE_USERNAME_RESET':
        return state.merge({"username": action.data.username})    
    default:
      return state
  }
}
