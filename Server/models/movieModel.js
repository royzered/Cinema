const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    filmName : String, 
    released : Number,
    genres : [String],
    image : String
});

module.exports = mongoose.model("movies", movieSchema);