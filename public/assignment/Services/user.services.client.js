(function () {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService($http) {

        return {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            checkLoggedIn: checkLoggedIn,
            logout: logout,
            login: login
        };

        function logout() {
            var url = "/api/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = '/api/user';
            return $http.post(url, user)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function findUserByUsername(username) {
            var url = '/api/username?username=' + username;
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

        function login(username, password) {
            var url = '/api/login';
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user)
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