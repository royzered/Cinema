const Member = require('./memberSchema');

const getMembers = () => {
    return Member.find( {} );
};

const getMember = (id) => {
    return Member.findById(id);
};

const updateMember = async (id, memberUpdate) => {
    await Member.findByIdAndUpdate(id, memberUpdate);
};

const deleteMember = async (id) => {
    await Member.findByIdAndRemove(id);
}

module.exports = { getMembers, getMember, updateMember, deleteMember };