import { put, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* SwitchComicToRead(action) {
   try {
      var response = yield(switchComicToReadFunction(action.data.username, action.data.id));
      console.log(response);
      if(response.message !== null && response.message !== "Switched successfully!"){
        yield put({type: "SWITCH_TO_READ_FAIL", data: {'message': response.message}});    
      } else {
        yield put({type: "SWITCH_TO_READ_SUCCESS", data: {'message': response.message, "comic": response.comic}});                      
      }
   } catch (e) {
     console.log(e);
      //called if the endpoint is not valid or cannot be hit
      yield put({type: "SWITCH_TO_READ_FAIL", data: {'message': 'Unavailable. Please try again later.'}});
   }
}

function switchComicToReadFunction(username, id){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    var myInit = { method: 'POST', headers: myHeaders, cache: 'default'};
    var myRequest = new Request('http://198.199.102.156:5000/SwitchToRead/' + username + '/' + id, myInit);
    const response = fetch(myRequest).then((response) => {
    //check to make sure the response was successful
    if(response.status !== 200){
        console.log(response.body);
        return {"message": "Server Error!!!"}
    } else {
        console.log(response);
        return response.json()
    }
    }).then(responseJson => {
    return responseJson
    }).catch((error) => console.log(error));
    return response;
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* switchComicToReadSaga() {
  yield takeLatest("SWITCH_TO_READ", SwitchComicToRead);
}

export default switchComicToReadSaga;