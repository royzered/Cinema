const moviesReducer = (state = {movies : []}, action) => {
    switch(action.type) {
        case "GETDATA" : 
            return {...state, movies : action.payload  }

            
            
            
            default: 
            return state
        }
}

export default moviesReducer;