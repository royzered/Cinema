const jwt = require('jsonwebtoken');
const User = require('./usersSchema');
const hash = require('hash.js');
const dotenv = require ('dotenv'); 

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
        return accessToken;
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

const register = async (newUser) => {

    let addUser = new User(newUser);
    let newUserDetails = await addUser.save();
    return newUserDetails.id;
}


module.exports = { login, register };