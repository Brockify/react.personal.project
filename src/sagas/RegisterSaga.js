import { put, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* register(action) {
   try {
      var response = yield(getRegister(action.data.username, action.data.password));
      if(response.message !== null && response.message !== "Register successful!"){
        yield put({type: "REGISTER_FAIL", data: {'message': response.message}});        
      } else {
        yield put({type: "REGISTER_SUCCESSFUL", data: {'message': response.message}});                      
      }
   } catch (e) {
      //called if the endpoint is not valid or cannot be hit
      yield put({type: "REGISTER_FAIL", data: {'message': 'Unavailable. Please try again later.'}});
   }
}

function getRegister(username, password){
  if(username === ""){
    return {'message': 'Please enter a valid username.'}                          
  } else if(password === ""){
    return {'message': 'Please enter a valid password.'}  
  } else if(!(/^\w+$/i.test(username))){
      return {'message': 'Username must only have letters and numbers'}                                      
  } else {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    var myInit = { method: 'GET', headers: myHeaders, cache: 'default' };
    var myRequest = new Request('http://198.199.102.156:5000/Register/' + username + '/' + password, myInit);
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
function* registerSaga() {
  yield takeLatest("REGISTER", register);
}

export default registerSaga;