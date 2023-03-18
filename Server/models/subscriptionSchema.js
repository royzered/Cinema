const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    movieID : String, 
    memberID : String,
});

module.exports = mongoose.model("subscriptions", subscriptionSchema);