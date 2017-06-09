(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);
    
    function profileController($location, $routeParams) {
        console.log('in controller now');
        var ctlr = this;

        var userID = $routeParams['uid'];

        console.log('finding the user now');
        var users = [{_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonder.com"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@gmail.com"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "char@yahoo.com"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@gmail.com" }
        ];

        var user = findUserByID(userID);
        ctlr.user = user;

        function findUserByID() {
            return users.find(function (user) {
                return user._id === userID;
            })
        }
    }

})();