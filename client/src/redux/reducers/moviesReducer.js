const moviesReducer = (state = {movies : []}, action) => {
    switch(action.type) {
        case "GETDATA" : 
            return {...state, movies : action.payload  }

        case "DELETEMOVIE" :
            let mvs = [...state.movies]
            let indx = mvs.findIndex(movie => movie._id === action.payload);
            if(indx >= 0) {
                mvs.splice(indx, 1);
            }
            return {...state, movies : mvs} 
            
            
        default: 
            return state
    }
}

export default moviesReducer;