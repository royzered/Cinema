const subsReducer = (state = {subs : []}, action) => {
    switch(action.type) {
        case "GETDATA" : 
            return {...state, subs : action.payload  }

            
            
            
            default: 
            return state
        }
}

export default subsReducer;