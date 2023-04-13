const subsReducer = (state = {subs : []}, action) => {
    switch(action.type) {
        case "GETSUBSDATA" : 
            return {...state, subs : action.payload  }

            case "ADDSUB":
                return {
                  ...state,
                  subs: [...state.subs, action.payload],
                };
          
              
            default: 
            return state
        }
}

export default subsReducer;