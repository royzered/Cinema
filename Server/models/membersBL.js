const Member = require('./memberSchema');

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
    await Member.findByIdAndUpdate(id, memberUpdate);
};

const deleteMember = async (id) => {
    await Member.findByIdAndRemove(id);
    if(Subscription.find( { memberID : id} )){
        await deleteSubscriptionByMemberID(id);
    }
};

module.exports = { getMembers, getMember, addMmember, updateMember, deleteMember };