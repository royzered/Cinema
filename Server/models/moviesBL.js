const Movie = require('./movieModel');
const Subscription = require('./subscriptionSchema');
const { deleteSubscription } = require('./subscriptionsBL');

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
    await Movie.findByIdAndUpdate(id, detailsUpdate);
};

const deleteMovie = async (id) => {
    await Movie.findByIdAndDelete(id);
    if(Subscription.find( { movieID : id} )){
        await deleteSubscription(id);
    }
    return "Deleted."
};

module.exports = { getMovies, getMovie, addMovie, updateMovie, deleteMovie };