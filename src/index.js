import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { CSSTransitionGroup } from 'react-transition-group'
import ResetPassword from './components/ResetPassword/ResetPassword'

// Logger with default options
import logger from 'redux-logger'

//Components
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/Dashboard'
import Search from './components/Search/Search'
import Unread from './components/Unread/Unread'

//Reducers
import reducer from './reducers/index'

//Sagas
import loginSaga from './sagas/LoginSaga'
import registerSaga from './sagas/RegisterSaga'
import changePasswordSaga from './sagas/ChangePasswordSaga'
import resetPasswordSaga from './sagas/ResetPasswordSaga'
import resetUsernameSaga from './sagas/ResetUsernameSaga'
import searchSaga from './sagas/SearchSaga'
import addComicSaga from './sagas/AddComicSaga'
import deleteComicSaga from './sagas/DeleteComicSaga'
import switchComicToReadSaga from './sagas/SwitchComicToReadSaga'
import switchReadToUnreadSaga from './sagas/SwitchReadToUnreadSaga'


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
      onLogin={(username, password, alertStyles) => store.dispatch({type: 'LOGIN', data: {'username': username, 'password': password}})}
      onChangeUsername={(event) => store.dispatch({type: "CHANGE_USERNAME_LOGIN", data: {"username": event.target.value}})}
      onChangePassword={(event) => store.dispatch({type: "CHANGE_PASSWORD_LOGIN", data: {"password": event.target.value}})}
      setLogin={(username) => store.dispatch({type: "SET_LOGIN", data: {"username": username}})}
      resetLogin={() => store.dispatch({type: "RESET_LOGIN", data: {"message": ""}})}
      alertStyle={store.getState().login.alertStyle}
      hideAlert={(alertStyle) => store.dispatch({type: "HIDE_ALERT_LOGIN", data: {"alertStyle": alertStyle}})}
      showAlert={(alertStyle) => store.dispatch({type: "SHOW_ALERT_LOGIN", data: {"alertStyle": alertStyle}})}
    />
  );
}

const UnreadComponent = (props) => {
  return (
    <Unread
      unread={store.getState().dashboard.unread}
      deleteComic={(username, comic) => {store.dispatch({type: "DELETE_COMIC", data: {"username": username, "comic": comic}})}}      
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
      showSearchModal={() => store.dispatch({type: "SHOW_SEARCH_MODAL"})}
      hideSearchModal={() => store.dispatch({type: "HIDE_SEARCH_MODAL"})}
      store={store}
      unread={store.getState().dashboard.unread}
      search={store.getState().dashboard.search}
      setDashboard={(comicData)=> store.dispatch({type: "SET_DASHBOARD", data: comicData})}
      addComic={(username, comic) => store.dispatch({type: "ADD_COMIC", data: {"username": username, "comic": comic}})}
      value={"Dashboard"}
      username={store.getState().login.username}
      read={store.getState().dashboard.read}
      library={store.getState().dashboard.library}
      switchToRead={(username, id) => store.dispatch({type: "SWITCH_TO_READ", data: {"username": username, "id": id}})}
      switchToUnread={(username, id) => store.dispatch({type: "SWITCH_READ_TO_UNREAD", data: {"username": username, "id": id}})}
      deleteComic={(username, comic, type) => {store.dispatch({type: "DELETE_COMIC", data: {"username": username, "comic": comic, "comic_type": type}})}}
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
        alertStyle={store.getState().register.alertStyle}
        hideAlert={(alertStyle) => store.dispatch({type: "HIDE_ALERT_REGISTER", data: {"alertStyle": alertStyle}})}
        showAlert={(alertStyle) => store.dispatch({type: "SHOW_ALERT_REGISTER", data: {"alertStyle": alertStyle}})}
        register={store.getState().register.register}
      />
  );
}

const ForgotPasswordComponent = (props) => {
  return (
    <ResetPassword
      status={store.getState().reset_password.message}
      username={store.getState().reset_password.username}
      onResetPassword={(username) => store.dispatch({type: "RESET_PASSWORD", data: {"username": username}})}
      onChangeUsername={(event) => store.dispatch({type: "CHANGE_USERNAME_RESET", data: {"username": event.target.value}})}
      resetMessage={() => store.dispatch({type: "RESET_PASSWORD_RESET"})}
      resetPassword={store.getState().reset_password.resetPassword}
      alertStyle={store.getState().reset_password.alertStyle}
      hideAlert={(alertStyle) => store.dispatch({type: "HIDE_ALERT_PASSWORD_RESET", data: {"alertStyle": alertStyle}})}
      showAlert={(alertStyle) => store.dispatch({type: "SHOW_ALERT_PASSWORD_RESET", data: {"alertStyle": alertStyle}})}
    />);
}

const SearchComponent = (props) => {
  return (
    <Search
      hideSearchModal={() => store.dispatch({type: "HIDE_SEARCH_MODAL"})}
    />);
}

const render = () => 
  ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={LoginComponent}/>
      <Route path="/dashboard" component={DashboardComponenet}/>
      <Route path="/register" component={RegisterComponent}/>
      <Route path="/forgot_pass" component={ForgotPasswordComponent}/>
      <Route path="/search" component={SearchComponent}/>
      <Route path="/unread" component={UnreadComponent}/>
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
sagaMiddleware.run(searchSaga)
sagaMiddleware.run(addComicSaga)
sagaMiddleware.run(deleteComicSaga)
sagaMiddleware.run(switchComicToReadSaga)
sagaMiddleware.run(switchReadToUnreadSaga)
const cachedUser = localStorage.getItem("user");
if (JSON.parse(cachedUser) != null) {
  store.dispatch({type: "SET_LOGIN", data: {"username": JSON.parse(cachedUser)}})
}
