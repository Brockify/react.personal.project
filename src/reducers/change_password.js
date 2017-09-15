import Immutable from 'seamless-immutable';
const initialState = Immutable({"oldPassword": "", "newPassword": "", "newConfirmPassword": "", "message": ""});
export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_OLD_CHANGE':
        return state.merge({"oldPassword": action.data.oldPassword})
    
    case 'CHANGE_NEW_CHANGE':
        return state.merge({"newPassword": action.data.newPassword})

    case 'CHANGE_NEW_CONFIRM_CHANGE':
        return state.merge({"newConfirmPassword": action.data.newConfirmPassword});

    case 'CHANGE_PASSWORD_SUCCESS':
        return state.merge({"message": action.data.message, "oldPassword": "", "newPassword": "", "newConfirmPassword": ""})

    case 'CHANGE_PASSWORD_FAIL':
        return state.merge({"message": action.data.message})

    case 'RESET_MESSAGE_CHANGE':
        return state.merge({"message": ""})
    default:
      return state
  }
}
