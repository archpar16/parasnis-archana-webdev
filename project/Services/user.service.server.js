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
projectapp.get ('/auth/project/facebook', projectPassport.authenticate('facebook', { scope : 'email' }));

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
projectapp.get('/oauth/facebook/callback',
    projectPassport.authenticate('facebook', {
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
projectapp.get    ('/api/project/users', findAllUsers);
projectapp.put    ('/api/project/updateUser', updateUser);
projectapp.put    ('/api/project/bookmarkmovie', bookmarkMovie);
projectapp.put    ('/api/project/favoritetheatre', favoriteTheatre);
projectapp.put    ('/api/project/follow', followUser);
projectapp.put    ('/api/project/unfavoritetheatre', unfavoriteTheatre);
projectapp.put    ('/api/project/removebookmarkmovie', removeBookmarkMovie);
projectapp.put    ('/api/project/unfollow', unfollowUser);
projectapp.delete ('/api/project/user/:userId', deleteUser);
projectapp.post   ('/api/project/user', createUser);


projectapp.post  ('/api/project/login', projectPassport.authenticate('local'), login);
projectapp.get   ('/api/project/checkLoggedIn', checkLoggedIn);
projectapp.post  ('/api/project/logout', logout);
projectapp.post  ('/api/project/register', register);


function localStrategy(username, password, done) {
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
                res.send(user);
            } else {
                res.send(user);
            }
        }, function (err) {
            res.sendStatus(500);
        });
}

function findAllUsers(req, res) {
    projectUserModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        }, function (err) {
            res.sendStatus(500);
        });
}
function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    projectUserModel
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
    projectUserModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.send(user);
            });

        });
}

function bookmarkMovie(req, res) {
    var user = req.user;
    var bookmark = req.body;

    console.log( bookmark);
    user.bookmarks.push(bookmark);
    projectUserModel
        .updateUser(user._id, user)
        .then(function (user) {
            res.send(user);
        });
}


function favoriteTheatre(req, res) {
    var user = req.user;
    var theatre = req.body;

    user.favorite_theatre.push(theatre);
    projectUserModel
        .updateUser(user._id, user)
        .then(function (user) {
            res.send(user);
        });
}


function followUser(req, res) {
    var whom = req.body;
    var who = req.user;

    who.follows.push(whom.username);
    console.log(who.username + ' follows' + who.follows)
    projectUserModel
        .updateUser(who._id, who)
        .then(function (user) {
            whom.following.push(who.username);
            projectUserModel
                .updateUser(whom._id, whom)
                .then(function (newuser) {
                    res.send(user);
                });
        });
}


function unfollowUser(req, res) {
    var whom = req.body;
    var who = req.user;

    var index = who.follows.indexOf(whom.username);
    who.follows.splice(index, 1);

    console.log(who.username + ' unfollows ' + who.follows);
    projectUserModel
        .updateUser(who._id, who)
        .then(function () {
            projectUserModel
                .findUserByUsername(whom.username)
                .then(function (user) {
                    console.log(user);
                    var index1 = user.following.indexOf(who.username);
                    user.following.splice(index1, 1);
                    projectUserModel
                        .updateUser(user._id, user)
                        .then(function (newuser) {
                            res.send(newuser);
                        });
                });
        });
}


function unfavoriteTheatre(req, res) {
    var theatre = req.body;
    var user = req.user;

    var index = user.favorite_theatre.indexOf(theatre);
    user.favorite_theatre.splice(index, 1);

    console.log(user.favorite_theatre);
    projectUserModel
        .updateUser(user._id, user)
        .then(function (user) {
            res.send(user);
        });
}


function removeBookmarkMovie(req, res) {
    var movie = req.body;
    var user = req.user;

    var index = user.bookmarks.indexOf(movie);
    user.bookmarks.splice(index, 1);

    console.log(user.bookmarks);
    projectUserModel
        .updateUser(user._id, user)
        .then(function (user) {
            res.send(user);
        });
}