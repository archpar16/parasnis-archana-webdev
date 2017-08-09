(function () {
    angular
        .module('ReserveYourSeat')
        .controller('adminController', adminController);

    function adminController(currentUser, $location, userService) {
        console.log('in admin controller now');
        var ctlr = this;

        ctlr.user = currentUser;

        // init();

        // event handlers

        ctlr.listAllUsers = listAllUsers;

        // ctlr.update = update;
        // ctlr.logout = logout;
        // ctlr.searchMovies = searchMovies;
        // ctlr.movieLongDetails = movieLongDetails;

        // ctlr.showUserProfile = showUserProfile;
        // ctlr.showTheatreDetails = showTheatreDetails;
        // ctlr.unfollowUser = unfollowUser;
        // ctlr.unfavoriteTheatre = unfavoriteTheatre;
        // ctlr.removeBookmarkMovie = removeBookmarkMovie;
        ctlr.checkAdmin = checkAdmin;

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

        function listAllUsers() {
            $location.url('/users');
        }

        function showUserProfile(username) {
            $location.url('/user/' + username);
        }

        function checkAdmin() {
            userService
                .checkAdmin()
                .then(function (currentUser) {
                    if (currentUser === '0') {
                        ctlr.admin = null;
                    } else {
                        ctlr.admin = currentUser;
                    }
                });
        }
    }

})();