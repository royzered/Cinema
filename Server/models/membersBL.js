const Member = require('./memberSchema');
const Subscription = require('./subscriptionSchema');
const { deleteSubscriptionByMemberID } = require('./subscriptionsBL');

const getMembers = () => {
    return Member.find( {} );
};

const getMember = (id) => {
    return Member.findById(id);
};

const addMmember = async (newMember) => {
    let add = new Member(newMember);
    await add.save();
    return add._id;
}

const updateMember = async (id, memberUpdate) => {
  return  await Member.findByIdAndUpdate(id, memberUpdate);
};

const deleteMember = async (id) => {
    await Member.findByIdAndRemove(id);
    if(Subscription.find( { memberID : id} )){
    return    await deleteSubscriptionByMemberID(id);
    }
};

module.exports = { getMembers, getMember, addMmember, updateMember, deleteMember };