const express = require('express');
const membersBL = require('../models/membersBL');

const router = express.Router();

router.get('/', async function(req,resp) {
    let members = await membersBL.getMembers();
    return resp.json(members);
} );

router.get('/:id', async function(req,resp) {
    let id = req.params.id;
    let member = await membersBL.getMember(id);
    return resp.json(member);
} );

router.post('/', async function(req,resp) {
    let newMember = req.body;
    let addMember = await membersBL.addMmember(newMember);
    return resp.json(addMember);
} );

router.put('/:id', async function(req,resp) {
    let id = req.params.id;
    let updateMember = req.body;
    let update = await membersBL.updateMember(id, updateMember);
    return resp.json(update);
});

router.delete('/:id', async function(req, resp) {
    let id = req.params.id;
    let deleteMember = await membersBL.deleteMember(id);
    return resp.json(deleteMember);
});

module.exports = router;