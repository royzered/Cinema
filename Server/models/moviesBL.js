const Movie = require('./movieModel');
const Subscription = require('./subscriptionSchema');
const { deleteSubscriptionByMovieID } = require('./subscriptionsBL');

const getMovies = () => {
    return Movie.find( {} );
};

const getMovie = (id) => {
    return Movie.findById(id);
};

const addMovie = async (newMovie) => {
    let addMovie = new Movie(newMovie);
    await addMovie.save();
    return `${addMovie.filmName} Added.`
};

const updateMovie = async (id, detailsUpdate) => {
    try { await Movie.findByIdAndUpdate(id, detailsUpdate);
       return `Movie ${updateDetails.filmName} Has Been Updated.`
    } catch(error) {
        return error
    }
};

const deleteMovie = async (id) => {
    await Movie.findByIdAndRemove(id);
    if(Subscription.find( { movieID : id} )){
        await deleteSubscriptionByMovieID(id);
    }
    return "Deleted."
};

module.exports = { getMovies, getMovie, addMovie, updateMovie, deleteMovie };