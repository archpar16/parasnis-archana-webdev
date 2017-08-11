(function () {
    angular
        .module('ReserveYourSeat')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userService) {
        console.log('in profile controller now');
        var ctlr = this;

        ctlr.user = currentUser;

        init();

        function init() {
            checkAdmin();
        }
        // event handlers
        ctlr.update = update;
        ctlr.logout = logout;
        ctlr.searchMovies = searchMovies;
        ctlr.movieLongDetails = movieLongDetails;
        ctlr.searchOtherUsers = searchOtherUsers;
        ctlr.showUserProfile = showUserProfile;
        ctlr.showTheatreDetails = showTheatreDetails;
        ctlr.unfollowUser = unfollowUser;
        ctlr.unfavoriteTheatre = unfavoriteTheatre;
        ctlr.removeBookmarkMovie = removeBookmarkMovie;
        ctlr.orderDetails = orderDetails;

        // Implementation of event handlers

        function update(user) {
            if (user.pwd1 !== user.pwd2){
                ctlr.message = "Passowrds must match";
                return;
            }

            userService
                .updateUser(user)
                .then(function () {
                    ctlr.message = " User updated successfully";
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }
        
        function searchMovies() {
            $location.url('/theatres')
        }

        function movieLongDetails(zip, movieTmsId) {
            $location.url('/zip/'+ zip + '/movie/' + movieTmsId);
        }

        function searchOtherUsers() {
            $location.url('/users');
        }

        function showUserProfile(username) {
            $location.url('/user/' + username);
        }

        function showTheatreDetails(theatre) {
            $location.url('/zip/' + theatre.zip + '/theatre/' + theatre.id);
        }

        function unfollowUser(username) {
            userService
                .unfollowUser(username)
                .then(function () {
                    getUserInfo(ctlr.user.username);
                });
        }

        function unfavoriteTheatre(theatre) {
            userService
                .unfavoriteTheatre(theatre)
                .then(function () {
                    getUserInfo(ctlr.user.username);
                });
        }


        function removeBookmarkMovie(movie) {
            userService
                .removeBookmarkMovie(movie)
                .then(function () {
                    getUserInfo(ctlr.user.username);
                });
        }

        function orderDetails(orderId) {
            $location.url('/order/' + orderId);
        }

        function getUserInfo(username) {
            userService
                .findUserByUsername(username)
                .then(function (user) {
                    ctlr.user = user;
                });
        }

        function checkAdmin() {
            userService
                .checkAdmin()
                .then(function (currentUser) {
                    if(currentUser === '0') {
                        ctlr.admin = null;
                    } else {
                        ctlr.admin = currentUser;
                    }
                });
        }
    }

})();