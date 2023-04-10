const jwt = require('jsonwebtoken');
const User = require('./usersSchema');
const hash = require('hash.js');
const dotenv = require ('dotenv'); 
const { response } = require('express');

dotenv.config();

const key = process.env.A_SECRET;
const properSalt = process.env.PROPER_SALT;


const login = async (user) => {

    let userPasswordHash = hash.sha256().update(user.password + properSalt).digest('hex');
    let userExists = await User.findOne({ "username" : user.username, "password" : userPasswordHash });

    if(userExists) {
        let accessToken = jwt.sign(
            { id : userExists.id },
            key, 
            {
                expiresIn : 60 * 24 * 1000
            }
        ); 
        return {token : accessToken, status : "🪙"};
    }
    else {
        let checkUsername = await User.findOne({ "username" : user.username });
        if(checkUsername) {
            return {status : "Incorrect Password"};
        }
        
        else {
        return {status : "Incorrect Username / Password"};
    }
    }
};

const register = async (newUser) => {
    let userPasswordHash = hash.sha256().update(newUser.password + properSalt).digest('hex');
    let newUserAfterHash = {...newUser, password : userPasswordHash}
    let addUser = new User(newUserAfterHash);
    let newUserDetails = await addUser.save();
    return newUserDetails.id;
}


module.exports = { login, register };