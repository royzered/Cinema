const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

const dbContext = require('./config/dbContext');
dbContext;

const movieRouter = require('./routers/movieRouter');

app.use(express.json());
app.use(cors());
app.use("/api/movies", movieRouter);

app.listen(port, () => {
    console.info(`
    Server is UP @ http://127.0.0.1:8000
    ------------------------------------
    API 
    movies = http://127.0.0.1:8000/api/movies
    `)
});