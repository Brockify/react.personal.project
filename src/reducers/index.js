import { combineReducers } from 'redux'
import login from './login'
import register from './register'
import change_password from './change_password'
import reset_password from './reset_password'
import reset_username from './reset_username'
import slot_machine from './slot_machine'

export default combineReducers({
  login,
  register,
  change_password,
  reset_password,
  reset_username,
  slot_machine
})