import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'
// Logger with default options
import logger from 'redux-logger'

//Components
import Login from './components/Login/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

//Reducers
import reducer from './reducers/index'

//Sagas
import loginSaga from './sagas/LoginSaga'
import registerSaga from './sagas/RegisterSaga'
import changePasswordSaga from './sagas/ChangePasswordSaga'
import resetPasswordSaga from './sagas/ResetPasswordSaga'
import resetUsernameSaga from './sagas/ResetUsernameSaga'
import slotMachineSaga from './sagas/SlotMachineSaga'
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(logger, sagaMiddleware))
const rootEl = document.getElementById('root')

//component to pass to the router with props included 'needed'
const LoginComponent = (props) => {
  return (
    <Login
      status={store.getState().login.message}
      username={store.getState().login.username}
      password={store.getState().login.password}
      logged_in={store.getState().login.logged_in}
      store={store}
      onLogin={(username, password) => store.dispatch({type: 'LOGIN', data: {'username': username, 'password': password}})}
      onChangeUsername={(event) => store.dispatch({type: "CHANGE_USERNAME_LOGIN", data: {"username": event.target.value}})}
      onChangePassword={(event) => store.dispatch({type: "CHANGE_PASSWORD_LOGIN", data: {"password": event.target.value}})}
      setLogin={(username) => store.dispatch({type: "SET_LOGIN", data: {"username": username}})}
      resetLogin={() => store.dispatch({type: "RESET_LOGIN", data: {"message": ""}})}
    />
  );
}

//component to pass to the router with props included 'needed'
const DashboardComponenet = (props) => {
  return (
    <Dashboard
      logout={() => store.dispatch({type: "LOGOUT"})}
      logged_in={store.getState().login.logged_in}
      setLogin={(username) => store.dispatch({type: "SET_LOGIN", data: {"username": username}})}
      store={store}
      value={"Dashboard"}
    />
  );
}

//component to pass to the router with props included 'needed'
const RegisterComponent = (props) => {
  return (
    <Register
      status={store.getState().register.message}
      username={store.getState().register.username}
      password={store.getState().register.password}
      email={store.getState().register.email}
      logged_in={store.getState().login.logged_in}
      onRegister={(username, password, email) => store.dispatch({type: 'REGISTER', data: {'username': username, 'password': password, "email": email}})}
      onChangeUsername={(event) => store.dispatch({type: "CHANGE_USERNAME_REGISTER", data: {"username": event.target.value}})}
      onChangePassword={(event) => store.dispatch({type: "CHANGE_PASSWORD_REGISTER", data: {"password": event.target.value}})}
      onChangeEmail={(event) => store.dispatch({type: "CHANGE_EMAIL_REGISTER", data: {"email": event.target.value}})}
      resetMessage={() => store.dispatch({type: "RESET_MESSAGE_REGISTER", data: {"message": ""}})}
    />
  );
}

const render = () => 
  ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={LoginComponent}/>
      <Route path="/register" component={RegisterComponent}/>
      <Route path="/dashboard" component={DashboardComponenet}/>
      <div style={{"width": "100%", "backgroundColor": "#00b0c7", "textAlign": "center", "height": "50px", "position": "fixed", "bottom": "0", "lineHeight": "50px", "color": "white"}}>
        <p>
          Brock's Personal Project
        </p>
      </div>
    </div>
  </Router>,
  rootEl)

render()
store.subscribe(render)
sagaMiddleware.run(loginSaga)
sagaMiddleware.run(registerSaga)
sagaMiddleware.run(changePasswordSaga)
sagaMiddleware.run(resetPasswordSaga)
sagaMiddleware.run(resetUsernameSaga)
sagaMiddleware.run(slotMachineSaga)
const cachedUser = localStorage.getItem("user");
if (JSON.parse(cachedUser) != null) {
  store.dispatch({type: "SET_LOGIN", data: {"username": JSON.parse(cachedUser)}})
}
