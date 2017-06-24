var app = require('../../express');

app.get('/api/user/:userId', findUserById);


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

