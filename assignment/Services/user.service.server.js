var app = require('../../express');
var userModel = require('../Models/User/user.model.server');

var assignmentPassport = require('passport');

// For local Strategy
var assignmentLocalStrategy = require('passport-local').Strategy;
assignmentPassport.use(new assignmentLocalStrategy(localStrategy));
assignmentPassport.serializeUser(serializeUser);
assignmentPassport.deserializeUser(deserializeUser);

// // For facebook strategy
// var assignmentFacebookStrategy = require('passport-facebook').Strategy;
// app.get ('/auth/assignment/facebook', assignmentPassport.authenticate('assignmentFacebook', { scope : 'email' }));
//
// var facebookConfig = {
//     clientID     : process.env.FACEBOOK_CLIENT_ID,
//     clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
//     callbackURL  : process.env.FACEBOOK_CALLBACK_URL
// };
//
// assignmentPassport.use(new assignmentFacebookStrategy(facebookConfig, facebookStrategy));
//
// function facebookStrategy(token, refreshToken, profile, done) {
//     console.log(' in facebook' );
//     console.log(profile);
//     userModel
//         .findUserByFacebookId(profile.id)
//         .then(
//             function(user) {
//                 if(user) {
//                     return done(null, user);
//                 } else {
//                     var newFacebookUser = {
//                         username:  profile.displayName,
//                         firstName: profile.name.givenName,
//                         lastName:  profile.name.familyName,
//                         email:     profile.email,
//                         facebook: {
//                             id:    profile.id,
//                             token: token
//                         }
//                     };
//                     return userModel.createUser(newFacebookUser);
//                 }
//             },
//             function(err) {
//                 if (err) { return done(err); }
//             }
//         )
//         .then(
//             function(user){
//                 return done(null, user);
//             },
//             function(err){
//                 if (err) { return done(err); }
//             }
//         );
// }
// app.get('/auth/assignment/facebook/callback',
//     assignmentPassport.authenticate('assignmentFacebook', {
//         successRedirect: '/assignment/index.html#!/profile',
//         failureRedirect: '/assignment/index.html#!/login'
//     }));


// For google strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
app.get('/auth/assignment/google', assignmentPassport.authenticate('google', { scope : ['profile', 'email'] }));

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_ASSIGNMENT_CALLBACK_URL
};

assignmentPassport.use(new GoogleStrategy(googleConfig, googleStrategy));

app.get('/oauth/google/assignment/callback-myapp',
    assignmentPassport.authenticate('google', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
    }));

function googleStrategy(token, refreshToken, profile, done) {
    userModel
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
                    return userModel.createUser(newGoogleUser);
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

app.get('/api/assignment/user/:userId', findUserById);
app.get('/api/assignment/user', findUserByCredentials);
app.get('/api/assignment/username', findUserByUsername);
app.put('/api/assignment/updateUser', updateUser);

app.delete('/api/assignment/user/:userId', deleteUser);
app.post('/api/assignment/user', createUser);


app.post  ('/api/assignment/login', assignmentPassport.authenticate('local'), login);
app.get   ('/api/assignment/checkLoggedIn', checkLoggedIn);
app.post  ('/api/assignment/logout', logout);
app.post  ('/api/assignment/register', register);


function localStrategy(username, password, done) {
    console.log('finding user ' + username + password);
    userModel
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
    user.password = bcrypt.hashSync(user.password);
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
    var userId = req.user._id;
    console.log(user + ' ' + userId);
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
    res.sendStatus(200);
}

function checkLoggedIn(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function register(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.send(user);
            });

        });
}