const express = require('express');
const movieBL = require('../models/moviesBL');
const { deleteSubscription } = require('../models/subscriptionsBL');

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
    return resp.json(updateMovie)
});

router.post('/', async function(req, resp) {
    let newMovie = req.body;
    let addMovie = await movieBL.addMovie(newMovie);
    return resp.json(addMovie);
});

router.delete('/:id', async function(req, resp) {
    let id = req.params.id;
        await movieBL.deleteMovie(id);
        return resp.json("Deleted");
   
});



module.exports = router;