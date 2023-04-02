const jwt =require('jsonwebtoken');
const User = require('../models/usersSchema');
require('dotenv').config();

const refreshTokenSecret = process.env.R_SECRET;
const tokenSecret = process.env.A_SECRET;


const refreshToken = (req, res) => {
    const cookie = req.cookies.token;
     if(!cookie) {
         return res.sendStatus(401);
     }
     
     const user = User.findOne( {token : cookie});
     if(user) {
         jwt.verify(cookie, refreshTokenSecret, (err, decode) => {
             if(err) {
               console.log(err);
                 return res.sendStatus(403);
             }
             const newAccessToken = jwt.sign(
                 {
                     "id" : decode.id
                 },
                 tokenSecret,
                 {expiresIn : 720 }
             );
             return res.json(newAccessToken);
         } )
     };
    };

    const refreshBeforeExepration = (token) => {
        jwt.verify(token, tokenSecret, (err, decode) => {
            if(err) {
                refreshToken();
            }
        })
    }

module.exports = { refreshToken, refreshBeforeExepration };