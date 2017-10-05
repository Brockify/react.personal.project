import { put, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* search(action) {
   try {
      var response = yield(getSearch(action.data.searchString));
      if(response.data.count > 0){
        yield put({type: "SEARCH_SUCCESS", data: {'message': '', "comicData": response.data}});        
      } else {
        yield put({type: "SEARCH_FAIL", data: {'message': 'Could not find any comics with that title', "comicData": response.data}});                
      }
   } catch (e) {
      //called if the endpoint is not valid or cannot be hit
      yield put({type: "SEARCH_FAIL", data: {'message': 'Unavailable. Please try again later.'}});
   }
}

function getSearch(searchString){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    var myInit = { method: 'GET', headers: myHeaders, cache: 'default' };
    var myRequest = new Request('https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=' + searchString + '&apikey=57fc4f7cf9b1254ad731992ab64b6aae');
    const response = fetch(myRequest).then((response) => {
      //check to make sure the response was successful
      if(response.status !== 200){
          console.log(response.status);
        return {"message": "Server Error!!!"}
      } else {
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
function* searchSaga() {
  yield takeLatest("SEARCH", search);
}

export default searchSaga;