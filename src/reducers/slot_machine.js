import Immutable from 'seamless-immutable';
const initialState = Immutable({"message": "", "a": 1, "b": 2, "c": 3, "d": 7, "e": 7, "f": 7, "g": 8, "h": 9, "i": "5", "totalPoints": 100, "loading": false});
export default (state = initialState, action) => {
  switch (action.type) {

    case 'RUN_SLOT':
        return state.merge({"loading": true, "message": "Uploading points..."})
    
    case 'UPLOAD_POINTS_SUCCESS':
        return state.merge({"loading": false, "message": action.data.message})

    case 'UPLOAD_POINTS_FAIL':
        if(action.data.points != null){
            return state.merge({"loading": false, "message": action.data.message})            
        } else {
            return state.merge({"loading": false, "message": action.data.message})            
        }

    case 'CHANGE_NUMBERS_SLOT':
       var a = getRandomWeightedNumber()      
       var b = getRandomWeightedNumber()
       var c = getRandomWeightedNumber()    
       var d = getRandomWeightedNumber()    
       var e = getRandomWeightedNumber()      
       var f = getRandomWeightedNumber()  
       var g = getRandomWeightedNumber()   
       var h = getRandomWeightedNumber()    
       var i = getRandomWeightedNumber()   
       return state.merge({"a": a, "b": b, "c": c, "d": d, "e": e, "f": f, "g": g, "h": h, "i": i, "message": "Spinning...", "loading": true})
    
   default:
      return state
  }
}


function getRandomWeightedNumber(){
    //7 1%chance , 6 10% , 5, 15%, 4, 20%,
    var lot_nums = [1, 2, 3, 4, 5, 6, 7]
    var weight = [35, 25, 13, 13 ,8, 5 ,1]
    //var weight = [100, 5, 5, 5 , 5, 5 ,5]    
    var weighed_list = [];
        
    // Loop over weights
    for (var i = 0; i < weight.length; i++) {
        var multiples = weight[i];
            
        // Loop over the list of items
        for (var j = 0; j < multiples; j++) {
            weighed_list.push(lot_nums[i]);
        }
    }
    var final_weighted_num = weighed_list[Math.floor(Math.random() * (weighed_list.length - 0) + 0)];
    return final_weighted_num;
}