import { put, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* login(action) {
   try {
      var response = yield(getLogin(action.data.username, action.data.password));
      if(response.message !== null && response.message !== "Login success!"){
        yield put({type: "LOGIN_FAIL", data: {'message': response.message}});    
        console.log(action.data.alertStyles);
      } else {
        yield put({type: "LOGIN_SUCCESSFUL", data: {'message': response.message, "points": response.points, "username": response.username}});                      
      }
   } catch (e) {
     console.log(e);
      //called if the endpoint is not valid or cannot be hit
      yield put({type: "LOGIN_FAIL", data: {'message': 'Unavailable. Please try again later.'}});
   }
}

function getLogin(username, password){
    if(username === ""){
      return {'message': 'Please enter a valid username.'}                          
    } else if(password === ""){
      return {'message': 'Please enter a valid password.'}                          
    } else if(!(/^\w+$/i.test(username))) {
      return {'message': 'Username must only have letters and numbers'}                              
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");
      var myInit = { method: 'GET', headers: myHeaders, cache: 'default' };
      var myRequest = new Request('http://198.199.102.156:5000/Login/' + username + '/' + password, myInit);
      const response = fetch(myRequest).then((response) => {
        //check to make sure the response was successful
        if(response.status !== 200){
          return {"message": "Server Error!!!"}
        } else {
          return response.json()
        }
      }).then(responseJson => {
        return responseJson
      }).catch((error) => console.log(error));
      return response;
    }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* loginSaga() {
  yield takeLatest("LOGIN", login);
}

export default loginSaga;