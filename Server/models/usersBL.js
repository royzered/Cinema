const jwt = require('jsonwebtoken');
const User = require('./usersSchema');
const hash = require('hash.js');
const dotenv = require ('dotenv'); 

dotenv.config();

const key = process.env.A_SECRET;
const refreshKey = process.env.R_SECRET;
const properSalt = process.env.PROPER_SALT;

const login = async (user) => {
    let userPasswordHash = hash.sha256().update(user.password + properSalt).digest('hex');
    let userExists = await User.findOne({ "username" : user.username, "password" : userPasswordHash });
    if(userExists) {
        let accessToken = jwt.sign(
            { id : userExists.id },
            key, 
            {
                expiresIn : 720
            }
        ); 
        let refreshToken = jwt.sign(
            { id : userExists.id },
            refreshKey, 
            {
                expiresIn : 72000
            }
        );
        await User.findByIdAndUpdate(userExists.id, {token : refreshToken});
            const response = {
                "Logged In" : true,
                "token" : accessToken,
                "refresh" : refreshToken
            }
        return response;
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