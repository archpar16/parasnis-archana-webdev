
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var assignmentuserModel = mongoose.model('UserModel', userSchema);


var bcrypt = require("bcrypt-nodejs");

assignmentuserModel.createUser = createUser;
assignmentuserModel.findUserById = findUserById;
assignmentuserModel.findUserByCredentials = findUserByCredentials;
assignmentuserModel.deleteUser = deleteUser;
assignmentuserModel.updateUser = updateUser;
assignmentuserModel.addWebsite = addWebsite;
assignmentuserModel.removeWebsite = removeWebsite;
assignmentuserModel.findUserByUsername = findUserByUsername;
assignmentuserModel.findUserByFacebookId = findUserByFacebookId;
assignmentuserModel.findUserByGoogleId = findUserByGoogleId;

module.exports = assignmentuserModel;


function findUserByFacebookId(facebookId) {
    return assignmentuserModel.findOne({'facebook.id': facebookId});
}

function findUserByGoogleId(googleId) {
    return assignmentuserModel.findOne({'google.id': googleId});
}

function removeWebsite(userId, websiteId) {
    return assignmentuserModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function addWebsite(userId, websiteId) {
    return assignmentuserModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        })
}

function updateUser(userId, newUser) {
    delete newUser.username;
    return assignmentuserModel.update({_id: userId}, {
        $set : {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        }
    });
}

function deleteUser(userId) {
    return assignmentuserModel.remove({_id: userId});
}

function findUserByCredentials(username, password) {
    return assignmentuserModel.findOne({username: username})
        .then(function (user) {
            if(user && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                null;
            }
        });
}

function findUserById(userId) {
    return assignmentuserModel.findById(userId);
}

function createUser(user) {
    if (typeof user.password !== 'undefined') {
        user.password = bcrypt.hashSync(user.password);
    }
    return assignmentuserModel.create(user);
}

function findUserByUsername(username) {
    return assignmentuserModel.findOne({username: username});
}