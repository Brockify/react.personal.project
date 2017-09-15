import { combineReducers } from 'redux'
import login from './login'
import register from './register'
import change_password from './change_password'

export default combineReducers({
  login,
  register,
  change_password
})