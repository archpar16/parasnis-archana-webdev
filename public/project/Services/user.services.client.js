(function () {
    angular
        .module('ReserveYourSeat')
        .factory('userService', userService);

    function userService($http) {

        return {
            createUser: createUser,
            // findUserByCredentials: findUserByCredentials,
            // findUserById: findUserById,
            // findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            checkLoggedIn: checkLoggedIn,
            logout: logout,
            register: register,
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

        function register(user) {
            var url = '/api/register';
            return $http.post(url, user)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        // function findUserByUsername(username) {
        //     var url = '/api/username?username=' + username;
        //     return $http.get(url)
        //         .then(function (response) {
        //                 return response.data;
        //             }
        //         );
        // }

        function updateUser(user) {
            var url = '/api/updateUser';
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

        // function findUserByCredentials(username, password) {
        //     var url = '/api/user?username=' + username + '&password=' + password;
        //     return $http.get(url)
        //         .then(function (response) {
        //                 return response.data;
        //             }
        //         );
        // }

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
        // function findUserById(userId) {
        //     var url = '/api/user/' + userId;
        //     return $http.get(url)
        //         .then(function (response) {
        //             return response.data;
        //         }
        //     );
        // }
    }
})();