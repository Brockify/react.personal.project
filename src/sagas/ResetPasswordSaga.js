import { put, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* resetPassword(action) {
   try {
      var response = yield(getResetPassword(action.data.username, action.data.oldPassword, action.data.newPassword, action.data.newConfirmPassword));
      if(response.message !== null && response.message !== "Password changed!"){
        yield put({type: "RESET_PASSWORD_FAIL", data: {'message': response.message}});        
      } else {
        yield put({type: "RESET_PASSWORD_SUCCESS", data: {'message': response.message}});                      
      }
   } catch (e) {
      //called if the endpoint is not valid or cannot be hit
      yield put({type: "RESET_PASSWORD_FAIL", data: {'message': 'Unavailable. Please try again later.'}});
   }
}

function getResetPassword(username, oldPassword, newPassword, newConfirmPassword){
  if(oldPassword === ""){
    return {'message': 'Please enter a valid old password.'}                          
  } else if(newPassword === ""){
    return {'message': 'Please enter a valid new password.'}  
  } else if(newConfirmPassword === ""){
      return {'message': 'Please enter a valid new confirm password.'}                                      
  } else if(newConfirmPassword !== newPassword){
      return {'message': 'Please make sure the new password and the confirmed new password match.'}  
  } else {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    var myInit = { method: 'GET', headers: myHeaders, cache: 'default' };
    var myRequest = new Request('http://198.199.102.156:5000/ResetPassword/' + username + '/' + oldPassword + '/' + newPassword, myInit);
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