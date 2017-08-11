(function () {
    angular
        .module('ReserveYourSeat')
        .factory('userService', userService);

    function userService($http) {

        return {
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            bookmarkMovie: bookmarkMovie,
            bookYourSeats: bookYourSeats,
            favoriteTheatre: favoriteTheatre,
            deleteUser: deleteUser,
            followUser: followUser,
            unfollowUser: unfollowUser,
            unfavoriteTheatre: unfavoriteTheatre,
            removeBookmarkMovie: removeBookmarkMovie,
            getOrderDetails: getOrderDetails,
            findAllUsers: findAllUsers,
            checkLoggedIn: checkLoggedIn,
            checkAdmin: checkAdmin,
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


        function checkAdmin() {
            var url = "/api/project/checkadmin";
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

        function bookYourSeats(order) {
            var url = '/api/project/bookseats';
            return $http.put(url, order)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function deleteUser(user) {
            var url = '/api/project/user/' + user._id;
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

        function bookmarkMovie(movie) {
            var url = '/api/project/bookmarkmovie';
            return $http.put(url, movie)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function findAllUsers() {
            var url = '/api/project/users';
            return $http.get(url)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function followUser(whom) {
            var url = '/api/project/follow';
            return $http.put(url, whom)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function favoriteTheatre(theatre) {
            var url = '/api/project/favoritetheatre';
            return $http.put(url, theatre)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function unfollowUser(username) {
            var whom = {
                username: username
            };
            var url = '/api/project/unfollow';
            return $http.put(url, whom)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function unfavoriteTheatre(theatre) {
            var url = '/api/project/unfavoritetheatre';
            return $http.put(url, theatre)
                .then(function (response) {
                        return response.data;
                    }
                );
        }


        function removeBookmarkMovie(movie) {
            var url = '/api/project/removebookmarkmovie';
            return $http.put(url, movie)
                .then(function (response) {
                        return response.data;
                    }
                );
        }


        function getOrderDetails(orderId) {
            var url = '/api/project/order?orderId=' + orderId;
            return $http.get(url)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

    }
})();