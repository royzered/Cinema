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

module.exports = { getSubscriptions, getSubscription, updateSubscription, deleteSubscription };