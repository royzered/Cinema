const e = require('express');
const Subscription = require('./subscriptionSchema');
const mongoose = require('mongoose');

const getDetailedSubs = async () => {
    return Subscription.aggregate([
     { 
         "$lookup" :
         {
             "from" : "movies",
             "localField" : "movieID",
             "foreignField" : "_id",
             "as" : "MovieDetails"
         } 
     }, 
     {
         "$lookup" :
         {
             "from" : "members",
             "localField" : "memberID",
             "foreignField" : "_id",
             "as" : "MemberDetails"
         }
     },
     {
        "$unwind": "$MovieDetails"
    },
    {
        "$unwind": "$MemberDetails"
    },
    {
        "$replaceRoot" :{ "newRoot" : { "$mergeObjects" : ["$MovieDetails", "$MemberDetails", {"date" : "$date", "movieID" : "$movieID", "memberID" : "$memberID"}]} }
    }
    ]);
 };

const getSubdetails = (id) => { 
    let objID = new mongoose.Types.ObjectId(id);
    let sub = Subscription.aggregate([ {
        "$match" : { "_id" : objID }
        },
        {
        "$lookup" :
        {
            "from" : "movies",
            "localField" : "movieID",
            "foreignField" : "_id",
            "as" : "MovieDetails"
        } 
    }, 
    {
        "$lookup" :
        {
            "from" : "members",
            "localField" : "memberID",
            "foreignField" : "_id",
            "as" : "MemberDetails"
        }
    }
    ]);
    return sub;
};

const addSubscription = async (newSubscription) => {
    console.log(newSubscription);
    let exist = Subscription.find({ memberID : newSubscription.memberID, movieID : newSubscription.movieID });
    if(!(await exist).length) {
        try {
            let newSub = new Subscription(newSubscription);
        let newSubCreate = await newSub.save();
        return newSubCreate._id;
        } catch (error) {
            return "Already Subscribed."
        }
    }
    else  {
        return "Try Again.";
    }
};

const updateSubscription = async (id, subscriptionUpdate) => {
    await Subscription.findByIdAndUpdate(id, subscriptionUpdate);
};

const deleteSubscription = async (id) => {
    await Subscription.findByIdAndRemove(id);
};



module.exports = { getDetailedSubs, getSubdetails, addSubscription, updateSubscription, deleteSubscription };