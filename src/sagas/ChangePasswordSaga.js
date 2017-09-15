import { put, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* changePassword(action) {
   try {
      var response = yield(getChangePassword(action.data.username, action.data.oldPassword, action.data.newPassword, action.data.newConfirmPassword));
      if(response.message !== null && response.message !== "Password changed!"){
        yield put({type: "CHANGE_PASSWORD_FAIL", data: {'message': response.message}});        
      } else {
        yield put({type: "CHANGE_PASSWORD_SUCCESS", data: {'message': response.message}});                      
      }
   } catch (e) {
      //called if the endpoint is not valid or cannot be hit
      yield put({type: "CHANGE_PASSWORD_FAIL", data: {'message': 'Unavailable. Please try again later.'}});
   }
}

function getChangePassword(username, oldPassword, newPassword, newConfirmPassword){
  if(oldPassword === ""){
    return {'message': 'Please enter a valid old password.'}                          
  } else if(newPassword === ""){
    return {'message': 'Please enter a valid new password.'}  
  } else if(newConfirmPassword === ""){
      return {'message': 'Please enter a valid new confirm password.'}                                      
  } else if(newConfirmPassword !== newPassword){
      return {'message': 'Make sure the new passwords match.'}  
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
function* changePasswordSaga() {
  yield takeLatest("CHANGE_PASSWORD", changePassword);
}

export default changePasswordSaga;