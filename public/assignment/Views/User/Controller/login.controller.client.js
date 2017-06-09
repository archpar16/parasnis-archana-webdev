(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);
    
    function loginController($location) {
        console.log('in controller now');
        var ctlr = this;

        ctlr.login = login;

        function login(username, password) {
            var found = null;
            console.log('finding the user now');
            var users = [{_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonder.com"  },
                {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@gmail.com"  },
                {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "char@yahoo.com"  },
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@gmail.com" }
            ];

            for (var u in users) {
                var user = users[u];
                if (user.username === username && user.password === password) {
                    found = user;
                    break;
                }
            }

            if (found !== null) {
                // console.log('found him');
                $location.url('/profile/' + found._id);
            } else {
                ctlr.message = username + " not found or password isn't correct, please try again";
            }
        }


    }

})();