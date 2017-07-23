
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);


var bcrypt = require("bcrypt-nodejs");

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;
userModel.findUserByUsername = findUserByUsername;

module.exports = userModel;

function removeWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        })
}

function updateUser(userId, newUser) {
    delete newUser.username;
    return userModel.update({_id: userId}, {
        $set : {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        }
    });
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username})
        .then(function (user) {
            if(user && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                null;
            }
        });
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    user.password = bcrypt.hashSync(user.password);
    console.log(user.password);
    return userModel.create(user);
}

function findUserByUsername(username) {
    // console.log(' username' + username);
    return userModel.findOne({username: username});
}