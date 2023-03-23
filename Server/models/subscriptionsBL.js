const Subscription = require('./subscriptionSchema');

const getSubscriptions = () => {
    return Subscription.find( {} );
};

const getSubscription = (id) => {
    return Subscription.findById(id);
};

const updateSubscription = async (id, subscriptionUpdate) => {
    await Subscription.findByIdAndUpdate(id, subscriptionUpdate);
};

const deleteSubscription = async (id) => {
    await Subscription.findByIdAndRemove(id);
}

const subsDetails = async () => {
   return Subscription.aggregate([ { 
        "$lookup" :
        {
            "from" : "movies",
            "localField" : "movieID",
            "foreignField" : "_id",
            "as" : "MovieDetails"
        },
        "$lookup" :
        {
            "from" : "members",
            "localField" : "memberID",
            "foreignField" : "_id",
            "as" : "MemberDetails"
        }
    }]);
}

module.exports = { getSubscriptions, getSubscription, updateSubscription, deleteSubscription, subsDetails };