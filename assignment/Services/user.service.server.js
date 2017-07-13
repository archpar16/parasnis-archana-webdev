var app = require('../../express');
var userModel = require('../Models/User/user.model.server');

app.get('/api/user/:userId', findUserById);
app.get('/api/user', findUserByCredentials);
app.get('/api/username', findUserByUsername);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);
app.post('/api/user', createUser);

function findUserById(req, res) {
    var userId = req.params['userId'];
    console.log('server got userid = ' + userId);

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.send(user);
        });
}


function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    console.log(username + password);
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user != null) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function (error) {
            res.sendStatus(404);
        });
}


function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.send(user);
        });
}

function deleteUser(req, res) {
    var userId = req.params['userId'];
    console.log('server got userid = ' + userId);

    userModel
        .deleteUser(userId)
        .then(function () {
            res.send(200);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params['userId'];
    console.log(user);
    userModel
        .updateUser(userId, user)
        .then(function (user) {
            res.send(user);
        });
}

function findUserByUsername(req, res) {
    var username = req.query['username'];
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if(user != null) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }, function (err) {
            res.sendStatus(500);
        });
}
