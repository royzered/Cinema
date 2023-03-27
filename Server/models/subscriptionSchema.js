const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    movieID : mongoose.Types.ObjectId, 
    memberID : mongoose.Types.ObjectId,
    date : String
});

module.exports = mongoose.model("subscriptions", subscriptionSchema);