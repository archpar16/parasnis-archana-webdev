var assignmentapp = require('../../express');
var assignmentuserModel = require('../Models/User/user.model.server');

var assignmentPassport = require('passport');

// For local Strategy
var assignmentLocalStrategy = require('passport-local').Strategy;
assignmentPassport.use("assignmentLocal", new assignmentLocalStrategy(assignmentlocalStrategy));
assignmentPassport.serializeUser(assignmentSerializeUser);
assignmentPassport.deserializeUser(assignmentDeserializeUser);

// For google strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
assignmentapp.get('/auth/assignment/google',
    assignmentPassport.authenticate('google', { scope : ['profile', 'email'] }));

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_ASSIGNMENT_CALLBACK_URL
};

assignmentPassport.use(new GoogleStrategy(googleConfig, googleStrategy));

assignmentapp.get('/oauth/google/assignment/callback-myapp',
    assignmentPassport.authenticate('google', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
    }));

function googleStrategy(token, refreshToken, profile, done) {
    assignmentuserModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return assignmentuserModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );

}

assignmentapp.get('/api/assignment/user/:userId', findUserById);
assignmentapp.get('/api/assignment/user', findUserByCredentials);
assignmentapp.get('/api/assignment/username', findUserByUsername);
assignmentapp.put('/api/assignment/updateUser', updateUser);

assignmentapp.delete('/api/assignment/user/:userId', deleteUser);
assignmentapp.post('/api/assignment/user', createUser);


assignmentapp.post  ('/api/assignment/login', assignmentPassport.authenticate('assignmentLocal'), login);
assignmentapp.get   ('/api/assignment/checkLoggedIn', checkLoggedIn);
assignmentapp.post  ('/api/assignment/logout', logout);
assignmentapp.post  ('/api/assignment/register', register);


function assignmentlocalStrategy(username, password, done) {
    console.log('finding user ' + username + password);
    assignmentuserModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function(err) {
                if (err) {
                    return done(err);
                }
            }
        );
}
function findUserById(req, res) {
    var userId = req.params['userId'];
    assignmentuserModel
        .findUserById(userId)
        .then(function (user) {
            res.send(user);
        });
}


function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    console.log(username + password);
    assignmentuserModel
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
    user.password = bcrypt.hashSync(user.password);
    assignmentuserModel
        .createUser(user)
        .then(function (user) {
            res.send(user);
        });
}

function deleteUser(req, res) {
    var userId = req.params['userId'];
    console.log('server got userid = ' + userId);

    assignmentuserModel
        .deleteUser(userId)
        .then(function () {
            res.send(200);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.user._id;
    console.log(user + ' ' + userId);
    assignmentuserModel
        .updateUser(userId, user)
        .then(function (user) {
            res.send(user);
        });
}

function findUserByUsername(req, res) {
    var username = req.query['username'];
    assignmentuserModel
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

function assignmentSerializeUser(user, done) {
    done(null, user);
}

function assignmentDeserializeUser(user, done) {
    console.log('in assign');
    console.log(user);
    assignmentuserModel
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
    res.sendStatus(200);
}

function checkLoggedIn(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function register(req, res) {
    var user = req.body;
    assignmentuserModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.send(user);
            });

        });
}