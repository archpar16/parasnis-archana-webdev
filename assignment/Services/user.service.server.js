var app = require('../../express');
var userModel = require('../Models/User/user.model.server');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get('/api/user/:userId', findUserById);
app.get('/api/user', findUserByCredentials);
app.get('/api/username', findUserByUsername);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);
app.post('/api/user', createUser);


app.post  ('/api/login', passport.authenticate('local'), login);
app.get   ('/api/checkLoggedIn', checkLoggedIn);
app.post  ('/api/logout', logout);
// app.post  ('/api/assignment/register', register);



function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) { return done(null, false); }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}
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

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}


function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function checkLoggedIn(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}