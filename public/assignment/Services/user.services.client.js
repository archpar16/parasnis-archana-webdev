(function () {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService($http) {

        return {
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            checkLoggedIn: checkLoggedIn,
            logout: logout,
            register: register,
            login: login
        };

        function logout() {
            var url = "/api/assignment/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/assignment/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = '/api/assignment/user';
            return $http.post(url, user)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function register(user) {
            var url = '/api/assignment/register';
            return $http.post(url, user)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function findUserByUsername(username) {
            var url = '/api/assignment/username?username=' + username;
            return $http.get(url)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function updateUser(user) {
            var url = '/api/assignment/updateUser';
            return $http.put(url, user)
                .then(function (response) {
                        return response.data;
                    }
                );
        }
        function deleteUser(userId) {
            var url = '/api/assignment/user/' + userId;
            return $http.delete(url)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function login(username, password) {
            // console.log('sending ' + username + " " + password);
            var url = '/api/assignment/login';
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
    }
})();