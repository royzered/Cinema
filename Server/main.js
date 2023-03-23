const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

const dbContext = require('./config/dbContext');
dbContext;

const movieRouter = require('./routers/movieRouter');
const subsRouter = require('./routers/subsRouter');


app.use(express.json());
app.use(cors());


app.use("/api/movies", movieRouter);
app.use("/api/subs", subsRouter);

app.listen(port, () => {
    console.info(`
    Server is UP @ http://127.0.0.1:${port}
    ------------------------------------
    API 
    movies = http://127.0.0.1:${port}/api/movies
    subscriptions = http://127.0.0.1:${port}/api/subs
    `)
});