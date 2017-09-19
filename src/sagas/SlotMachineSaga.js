import { put, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* runSlot(action) {
    const {a, b, c, d, e, f, g, h, i, points, username} = action.data
    var winning_dict = getWinner(a, b, c, d, e, f, g, h, i)
    var winning_amount = winning_dict.winning_amount
    console.log(winning_dict.winners);
    try {
      var response = yield(uploadPoints(a, b, c, d, e, f, g, h, i, username, winning_amount));
      if(response.message !== null && response.message !== "You won!"){
        yield put({type: "UPLOAD_POINTS_FAIL", data: {'message': response.message, "points": response.points}});                      
    } else {
        yield put({type: "UPLOAD_POINTS_SUCCESS", data: {"winners": winning_dict.winners, 'message': response.message + " - +" + winning_amount + " credits", "points": response.points}});                
      }
   } catch (e) {
      //called if the endpoint is not valid or cannot be hit
      yield put({type: "UPLOAD_POINTS_FAIL", data: {'message': 'Unavailable. Please try again later.'}});
   }
}

function uploadPoints(a, b, c, d, e, f, g, h, i, username, points){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    var myInit = { method: 'GET', headers: myHeaders, cache: 'default' };
    var myRequest = new Request('http://198.199.102.156:5000/UploadPoints/' + username + "/" + points, myInit);
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

var winning_combos = [{"combo": "111", "points": 20}, {"combo": "222", "points": 40}, {"combo": "333", "points": 60}, {"combo": "444", "points": 60}, {"combo": "555", "points": 80}, {"combo": "666", "points": 120}, {"combo": "777", "points": 600}, {"combo": "654", "points": 300}, {"combo": "543", "points": 150}, {"combo": "432", "points": 70}, {"combo": "321", "points": 40}, {"combo": "123", "points": 40}, {"combo": "234", "points": 60}, {"combo": "345", "points": 80}, {"combo": "456", "points": 120}, {"combo": "567", "points": 40}]
function getWinner(a, b, c, d, e, f, g, h, i){
    var top_line = getTopLine(a, b, c)
    var middle_line = getMiddleLine(d, e, f);    
    var bottom_line = getBottomLine(g, h, i)
    var top_diagnol_line = getTopDiagnol(a,e,i)
    var bottom_diagnol_line = getBottomDiagnol(g, e, c)
    var final_dict = {"winning_amount": (middle_line + top_line + bottom_line + top_diagnol_line + bottom_diagnol_line), "winners": {"topDiagnol": false, "top": false, "middle": false, "bottom": false, "bottomDiagnol": false}}
    // console.log(top_line)
    // console.log(bottom_diagnol_line)
    // console.log(top_diagnol_line)
    // console.log(bottom_line)
    // console.log(middle_line)
    
    if(top_line > 0){
        final_dict.winners.top = true;
    }
    if(middle_line > 0){
        final_dict.winners.middle = true;
    }
    if(bottom_line > 0){
        final_dict.winners.bottom = true;
    }
    if(top_diagnol_line > 0){
        final_dict.winners.top_diagnol_line = true;
    }
    if(bottom_diagnol_line > 0){
        final_dict.winners.bottom_diagnol_line = true;
    }
    return final_dict;
}

function getMiddleLine(a, b, c){
    var found = false;
    var points_earned = 0;
    for(var i = 0; i < winning_combos.length; i++){
        if((parseInt(winning_combos[i].combo.charAt(0)) == a|| a == 3) && (parseInt(winning_combos[i].combo.charAt(1)) == b || b == 3) && (parseInt(winning_combos[i].combo.charAt(2)) == c || c == 3)){
            console.log("Winning combo: " + winning_combos[i].combo)                        
            points_earned = winning_combos[i].points
        }
    }
    return points_earned;
}

function getTopDiagnol(a, e, i){
    var found = false;
    var points_earned = 0;
    for(var i = 0; i < winning_combos.length; i++){
        if((parseInt(winning_combos[i].combo.charAt(0)) == a|| a == 3) && (parseInt(winning_combos[i].combo.charAt(1)) == e || e == 3) && (parseInt(winning_combos[i].combo.charAt(2)) == i || i == 3)){
            console.log("Winning combo: " + winning_combos[i].combo)                        
            points_earned = winning_combos[i].points
        }
    }
    return points_earned;
}

function getBottomDiagnol(g, e, c){
    var found = false;
    var points_earned = 0;
    for(var i = 0; i < winning_combos.length; i++){
        if((parseInt(winning_combos[i].combo.charAt(0)) == g|| g == 3) && (parseInt(winning_combos[i].combo.charAt(1)) == e || e == 3) && (parseInt(winning_combos[i].combo.charAt(2)) == c || c == 3)){
            console.log("Winning combo: " + winning_combos[i].combo)                        
            points_earned = winning_combos[i].points
        }
    }
    return points_earned;
}

function getTopLine(d, e, f){
    var found = false;
    var points_earned = 0;
    for(var i = 0; i < winning_combos.length; i++){
        if((parseInt(winning_combos[i].combo.charAt(0)) == d|| d == 3) && (parseInt(winning_combos[i].combo.charAt(1)) == e || e == 3) && (parseInt(winning_combos[i].combo.charAt(2)) == f || f == 3)){
            console.log("Winning combo: " + winning_combos[i].combo)            
            points_earned = winning_combos[i].points
        }
    }
    return points_earned;
}

function getBottomLine(g, h, i){
    var found = false;
    var points_earned = 0;
    console.log()
    for(var j = 0; j < winning_combos.length; j++){
        if((parseInt(winning_combos[j].combo.charAt(0)) == g|| g == 3) && (parseInt(winning_combos[j].combo.charAt(1)) == h || h == 3) && (parseInt(winning_combos[j].combo.charAt(2)) == i || i == 3)){
            console.log("Winning combo: " + winning_combos[j].combo)                        
            points_earned = winning_combos[j].points
        }
    }
    return points_earned;
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* slotMachineSaga() {
  yield takeLatest("RUN_SLOT", runSlot);
}

export default slotMachineSaga;