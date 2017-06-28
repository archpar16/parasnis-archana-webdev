var app = require('../../express');

app.get('/api/user/:userId', findUserById);
app.get('/api/user', findUserByCredentialsOrUsername);
app.put('/api/user/:userId', updateUser);
app.post('/api/user', createUser);


var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonder.com"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@gmail.com"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "char@yahoo.com"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@gmail.com" }
];

function findUserById(req, res) {
    var userId = req.params['userId'];
    console.log('server got userid = ' + userId);

    var user = users.find(function (user) {
        return user._id === userId;
    });

    res.send(user);
}


function findUserByCredentials(username, password) {
    console.log(username + password);
    for(var u in users) {
        var user = users[u];
        if(user.username === username &&
            user.password === password) {
            return user;
        }
    }
}


function createUser(req, res) {
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    //console.log(user);
    users.push(user);
    res.send(user);
}

function deleteUser(userId) {
    var user = users.find(function (user) {
        return user._id === userId;
    });
    // var user = findUserById(userId);
    var index = users.indexOf(user);
    users.splice(index, 1);
}

function updateUser(req, res) {
    var user = req.body;
    console.log(user);
    deleteUser(user._id);
    users.push(user);

    res.send(user);
}

function findUserByUsername(username) {
    return users.find(function (user) {
        return user.username === username;
    });
}

function findUserByCredentialsOrUsername(req, res) {
    var username = req.query['username'];
    var password = req.query.password;
    if(username && password) {
        var user = findUserByCredentials(username, password);
        if(typeof user === 'undefined') {
            res.sendStatus(404);
            return;
        } else {
            res.send(user);
            return;
        }
    }
    else if(username) {
        var user = findUserByUsername(username, password);
        if(typeof user === 'undefined') {
            res.sendStatus(200);
            return;
        } else {
            res.sendStatus(404);
            return;
        }
    } else {
        res.json(users);
    }
}
