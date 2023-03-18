const Movie = require('./movieModel');

const getMovies = () => {
    return Movie.find( {} );
};

const getMovie = (id) => {
    return Movie.findById(id);
};

const updateMovie = async (id, detailsUpdate) => {
    await Movie.findByIdAndUpdate(id, detailsUpdate);
};

const deleteMovie = async (id) => {
    await Movie.findByIdAndRemove(id);
}

module.exports = { getMovies, getMovie, updateMovie, deleteMovie };