import { put, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* AddComic(action) {
   try {
      var response = yield(addComicFunction(action.data.username, action.data.comic));
      if(response.message !== null && response.message !== "Added successfully!"){
        yield put({type: "ADD_COMIC_FAIL", data: {'message': response.message}});    
      } else {
        yield put({type: "ADD_COMIC_SUCCESS", data: {'message': response.message, "comic": response.comic}});                      
      }
   } catch (e) {
     console.log(e);
      //called if the endpoint is not valid or cannot be hit
      yield put({type: "ADD_COMIC_FAIL", data: {'message': 'Unavailable. Please try again later.'}});
   }
}

function addComicFunction(username, comic){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    var myInit = { method: 'POST', headers: myHeaders, cache: 'default', body: JSON.stringify(comic)};
    var myRequest = new Request('http://198.199.102.156:5000/AddComic/' + username, myInit);
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
function* addComicSaga() {
  yield takeLatest("ADD_COMIC", AddComic);
}

export default addComicSaga;