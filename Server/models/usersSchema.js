const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName : String, 
    username : String,
    password : String,
});

module.exports = mongoose.model("users", userSchema);