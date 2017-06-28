(function () {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService($http) {

        var users = [{_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonder.com"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@gmail.com"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "char@yahoo.com"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@gmail.com" }
        ];

        return {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        function createUser(user) {
            var url = '/api/user';
            return $http.post(url, user)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function findUserByUsername(username) {
            var url = '/api/user?username=' + username;
            return $http.get(url)
                .then(function (response) {
                    // console.log(" resp " + response.data);
                        return response.data;
                    }
                );
        }

        function updateUser(userId, user) {
            var url = '/api/user/' + userId;
            return $http.put(url, user)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function deleteUser(userId) {
            var url = '/api/user/' + userId;
            return $http.delete(url)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username=' + username + '&password=' + password;
            return $http.get(url)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function findUserById(userId) {
            var url = '/api/user/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }
            );
        }
    }
})();