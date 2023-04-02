const jwt = require('jsonwebtoken');
const tokenBL = require('../models/tokenBL');

function authToken(req, resp, next) { 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) {
        return resp.sendStatus(401);
    }
    else {
        jwt.verify(token, process.env.A_SECRET, (err, decode) => {
            if(err) {
                return resp.sendStatus(403);
            }
            next();            
        });
    }
};


module.exports = authToken;