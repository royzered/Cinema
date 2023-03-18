const Movie = require('./movieModel');

const getMovies = () => {
    return Movie.find( {} );
};

const getMovie = (id) => {
    return Movie.findById(id);
};

const addMovie = async (newMovie) => {
    let addMovie = new Movie(newMovie);
    await addMovie.save();
    return `${addMovie.name} Added.`
};

const updateMovie = async (id, detailsUpdate) => {
    await Movie.findByIdAndUpdate(id, detailsUpdate);
};

const deleteMovie = async (id) => {
    await Movie.findByIdAndRemove(id);
};

module.exports = { getMovies, getMovie, addMovie, updateMovie, deleteMovie };