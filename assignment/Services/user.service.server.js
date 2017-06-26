var app = require('../../express');

app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.get('/api/user', findUserByCredentials);
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


function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    //console.log(username + password);
    for(var u in users) {
        var user = users[u];
        if(user.username === username &&
            user.password === password) {
            res.json(user);
            return;
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