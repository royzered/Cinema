const jwt = require('jsonwebtoken');
const User = require('./usersSchema');
const hash = require('hash.js');
const dotenv = require ('dotenv'); 
dotenv.config();

const key = process.env.HEATSAUCE;
const properSalt = process.env.PROPER_SALT;

const login = async (user) => {
    let userPasswordHash = hash.sha256().update(user.password + properSalt).digest('hex')
    let userExists = await User.findOne({ "username" : user.username, "password" : userPasswordHash });
    if(userExists) {
        let jwtForUser = jwt.sign(
            { id : userExists.id },
            key, 
            {
                expiresIn : 7200
            }
        );
        return jwtForUser;
    }
    let checkUsername = await User.findOne({ "username" : user.username });
    if(checkUsername) 
    {
        return "Incorrect Password"
    }
    else {
        return "Incorrect Username / Password";
    }

};

module.exports = { login };