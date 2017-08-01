var projectapp = require('../../express');
var projectUserModel = require('../Models/User/user.model.server');

var projectPassport = require('passport');
// For local Strategy
var LocalStrategy = require('passport-local').Strategy;
projectPassport.use(new LocalStrategy(localStrategy));
projectPassport.serializeUser(serializeUser);
projectPassport.deserializeUser(deserializeUser);

// For facebook strategy
var FacebookStrategy = require('passport-facebook').Strategy;
projectapp.get ('/auth/project/facebook', projectPassport.authenticate('projectFacebook', { scope : 'email' }));

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};

projectPassport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

function facebookStrategy(token, refreshToken, profile, done) {
    console.log(' in facebook' );
    console.log(profile);
    projectUserModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var newFacebookUser = {
                        username:  profile.displayName,
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     profile.email,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return projectUserModel.createUser(newFacebookUser);
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
projectapp.get('/auth/project/facebook/callback',
    projectPassport.authenticate('projectFacebook', {
        successRedirect: '/project/index.html#!/profile',
        failureRedirect: '/project/index.html#!/login'
    }));


// For google strategy
var projectGoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
projectapp.get('/auth/project/google', projectPassport.authenticate('google', { scope : ['profile', 'email'] }));

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_PROJECT_CALLBACK_URL
};

projectPassport.use(new projectGoogleStrategy(googleConfig, googleStrategy));

projectapp.get('/oauth/google/project/callback-myapp',
    projectPassport.authenticate('google', {
        successRedirect: '/project/index.html#!/profile',
        failureRedirect: '/project/index.html#!/login'
    }));

function googleStrategy(token, refreshToken, profile, done) {
    projectUserModel
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
                    return projectUserModel.createUser(newGoogleUser);
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


projectapp.get    ('/api/project/username', findUserByUsername);
projectapp.put    ('/api/project/updateUser', updateUser);
projectapp.delete ('/api/project/user/:userId', deleteUser);
projectapp.post   ('/api/project/user', createUser);


projectapp.post  ('/api/project/login', projectPassport.authenticate('local'), login);
projectapp.get   ('/api/project/checkLoggedIn', checkLoggedIn);
projectapp.post  ('/api/project/logout', logout);
projectapp.post  ('/api/project/register', register);


function localStrategy(username, password, done) {
    console.log('username =' + username + " " + password);
    projectUserModel
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

function createUser(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    projectUserModel
        .createUser(user)
        .then(function (user) {
            res.send(user);
        });
}

function deleteUser(req, res) {
    var userId = req.params['userId'];
    console.log('server got userid = ' + userId);

    projectUserModel
        .deleteUser(userId)
        .then(function () {
            res.send(200);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.user._id;
    console.log(user + ' ' + userId);
    projectUserModel
        .updateUser(userId, user)
        .then(function (user) {
            res.send(user);
        });
}

function findUserByUsername(req, res) {
    var username = req.query['username'];
    projectUserModel
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
    console.log(' printing the user in deseralize' + user);
    projectUserModel
        .findUserById(user._id)
        .then(
            function(user){
                console.log(' i found the user ');
                done(null, user);
            },
            function(err){
                console.log(' couldnt find the user');
                done(err, null);
            }
        );
}


function login(req, res) {
    var user = req.user;
    console.log(' adding user to cookie ' + user);
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
}

function checkLoggedIn(req, res) {
console.log(' printing the user ' + req.user);
    res.send(req.isAuthenticated() ? req.user : '0');
}

function register(req, res) {
    var user = req.body;
    projectUserModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.send(user);
            });

        });
}
