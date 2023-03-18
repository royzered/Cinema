const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name : String, 
    released : Number,
    genres : [String],
    image : String
});

module.exports = mongoose.model("movies", movieSchema);