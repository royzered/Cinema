const mongoose = require('mongoose');
const dotenv = require ('dotenv'); 
dotenv.config();

const dbContext = process.env.DATABASE_CONTEXT;

mongoose.connect(dbContext);