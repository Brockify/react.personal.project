import Immutable from 'seamless-immutable';
const initialState = Immutable({"message": "", "email": ""});
export default (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_USERNAME':
        return state.merge({"message": "Resetting email."})

    case 'RESET_USERNAME_FAIL':
        return state.merge({"message": action.data.message})
    
    case 'RESET_USERNAME_SUCCESS':
        return state.merge({"message": action.data.message, "email": ""})

    case 'CHANGE_EMAIL_RESET_USERNAME':
        return state.merge({"email": action.data.email})    

    case 'RESET_USERNAME_RESET_MESSAGE':
        return state.merge({"message": ""})

    default:
      return state
  }
}
