import { put, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* resetUsername(action) {
   try {
      var response = yield(getResetUsername(action.data.email));
      if(response.message !== null && response.message !== "Username sent to your email."){
        yield put({type: "RESET_USERNAME_FAIL", data: {'message': response.message}});        
      } else {
        yield put({type: "RESET_USERNAME_SUCCESS", data: {'message': response.message}});                      
      }
   } catch (e) {
      //called if the endpoint is not valid or cannot be hit
      yield put({type: "RESET_USERNAME_FAIL", data: {'message': 'Unavailable. Please try again later.'}});
   }
}

function getResetUsername(email){
    if(email == ""){
        return ({"message": "Please type a valid email."})
    } else {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        var myInit = { method: 'GET', headers: myHeaders, cache: 'default' };
        var myRequest = new Request('http://198.199.102.156:5000/ResetUsername/' + email, myInit);
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
function* resetUsernameSaga() {
  yield takeLatest("RESET_USERNAME", resetUsername);
}

export default resetUsernameSaga;