
var mongoose = require('mongoose');
var projectUserSchema = require('./user.schema.server');
var projectUserModel = mongoose.model('ProjectUserModel', projectUserSchema);


var bcrypt = require("bcrypt-nodejs");

projectUserModel.createUser = createUser;
projectUserModel.findUserById = findUserById;
projectUserModel.findUserByCredentials = findUserByCredentials;
projectUserModel.deleteUser = deleteUser;
projectUserModel.updateUser = updateUser;
projectUserModel.findUserByUsername = findUserByUsername;
projectUserModel.findUserByFacebookId = findUserByFacebookId;
projectUserModel.findUserByGoogleId = findUserByGoogleId;
projectUserModel.findAllUsers = findAllUsers;

module.exports = projectUserModel;


function findUserByFacebookId(facebookId) {
    return projectUserModel.findOne({'facebook.id': facebookId});
}

function findUserByGoogleId(googleId) {
    return projectUserModel.findOne({'google.id': googleId});
}

// function removeWebsite(userId, websiteId) {
//     return projectUserModel
//         .findById(userId)
//         .then(function (user) {
//             var index = user.websites.indexOf(websiteId);
//             user.websites.splice(index, 1);
//             return user.save();
//         });
// }
//
// function addWebsite(userId, websiteId) {
//     return projectUserModel
//         .findById(userId)
//         .then(function (user) {
//             user.websites.push(websiteId);
//             return user.save();
//         })
// }

// function updateUser(userId, newUser) {
//     delete newUser.username;
//     return projectUserModel.update({_id: userId}, {
//         $set : {
//             firstName: newUser.firstName,
//             lastName: newUser.lastName,
//             email: newUser.email,
//
//             phone: newUser.phone
//         }
//     });
// }

function updateUser(userId, newUser) {
    delete newUser.username;
    return projectUserModel.update({_id: userId}, newUser);
}

function deleteUser(userId) {
    return projectUserModel.remove({_id: userId});
}

function findUserByCredentials(username, password) {
    return projectUserModel.findOne({username: username})
        .then(function (user) {
            if(user && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                null;
            }
        });
}

function findUserById(userId) {
    return projectUserModel.findById(userId);
}

function createUser(user) {
    if (typeof user.password !== 'undefined') {
        user.password = bcrypt.hashSync(user.password);
        console.log(user.password);
    }
    return projectUserModel.create(user);
}

function findUserByUsername(username) {
    return projectUserModel.findOne({username: username});
}


function findAllUsers() {
    return projectUserModel.find();
}