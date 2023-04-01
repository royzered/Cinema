const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;

const dbContext = require('./config/dbContext');
dbContext;

const movieRouter = require('./routers/movieRouter');
const subsRouter = require('./routers/subsRouter');
const membersRouter = require('./routers/membersRouter');
const usersRouter = require('./routers/usersRouter');
const tokenRouter = require('./routers/tokenRouter')

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/movies", movieRouter);
app.use("/api/subs", subsRouter);
app.use("/api/members", membersRouter);
app.use("/login", usersRouter);
app.use("/refresh", tokenRouter);

app.listen(port, () => {
    console.info(`
    Server is UP @ http://127.0.0.1:${port}
    ------------------------------------
     API 
    ======
    movies 
    http://127.0.0.1:${port}/api/movies

    subscriptions 
    http://127.0.0.1:${port}/api/subs

    members 
    http://127.0.0.1:${port}/api/members

    users 
    http://127.0.0.1:${port}/login
    `)
});