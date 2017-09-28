import { put, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* resetPassword(action) {
   try {
      var response = yield(getResetPassword(action.data.username));
      if(response.message !== null && response.message !== "Password reset! Check your email."){
        yield put({type: "RESET_PASSWORD_FAIL", data: {'message': response.message}});        
      } else {
        yield put({type: "RESET_PASSWORD_SUCCESS", data: {'message': response.message}});                      
      }
   } catch (e) {
      //called if the endpoint is not valid or cannot be hit
      yield put({type: "RESET_PASSWORD_FAIL", data: {'message': 'Unavailable. Please try again later.'}});
   }
}

function getResetPassword(username){
    if(username === ""){
        return ({"message": "Please type a valid username."})
    } else {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        var myInit = { method: 'GET', headers: myHeaders, cache: 'default' };
        var myRequest = new Request('http://198.199.102.156:5000/ResetPassword/' + username, myInit);
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
function* resetPasswordSaga() {
  yield takeLatest("RESET_PASSWORD", resetPassword);
}

export default resetPasswordSaga;