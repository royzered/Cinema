const express = require('express');
const movieBL = require('../models/moviesBL');

const router = express.Router();

router.get('/', async function (req, resp) {
    let movies = await movieBL.getMovies();
    return resp.json(movies);
});

router.get('/:id', async function (req, resp) {
    const id = req.params.id; 
    let movie = await movieBL.getMovie(id);
    return resp.json(movie);
});

router.put('/:id', async function(req, resp) {
    const id = req.params.id;
    let updateDetails = req.body;
    let updateMovie = await movieBL.updateMovie(id, updateDetails);
    return `Movie ${updateDetails.name} Has Been Updated.`
});

router.post('/', async function(req, resp) {
    let newMovie = req.body;
    let addMovie = await movieBL.addMovie(newMovie);
    return resp.json(addMovie);
});

router.delete('/:id', async function(req, resp) {
    let id = req.params.id;
    try {
        await movieBL.deleteMovie(id);
        return `Movie Deleted`;
    } catch (error) {
        return error;
    }
});



module.exports = router;