import { combineReducers } from 'redux'
import login from './login'
import register from './register'
import reset_password from './reset_password'

export default combineReducers({
  login,
  register,
  reset_password
})