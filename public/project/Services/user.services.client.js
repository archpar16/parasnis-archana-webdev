(function () {
    angular
        .module('ReserveYourSeat')
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
            var url = "/api/project/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/project/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = '/api/project/user';
            return $http.post(url, user)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function register(user) {
            var url = '/api/project/register';
            return $http.post(url, user)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function findUserByUsername(username) {
            var url = '/api/project/username?username=' + username;
            return $http.get(url)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function updateUser(user) {
            var url = '/api/project/updateUser';
            return $http.put(url, user)
                .then(function (response) {
                        return response.data;
                    }
                );
        }
        function deleteUser(userId) {
            var url = '/api/project/user/' + userId;
            return $http.delete(url)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function login(username, password) {
            var url = '/api/project/login';
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