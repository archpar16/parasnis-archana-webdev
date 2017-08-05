(function () {
    angular
        .module('ReserveYourSeat')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userService, theatreMovieService) {
        console.log('in profile controller now');
        var ctlr = this;

        ctlr.user = currentUser;

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
                    ctlr.message = "You un-followed " + username;
                });
        }

        function unfavoriteTheatre(theatre) {
            userService
                .unfavoriteTheatre(theatre)
                .then(function () {
                    ctlr.message = theatre.name + " is removed from your favorites ";
                });
        }


        function removeBookmarkMovie(movie) {
            userService
                .removeBookmarkMovie(movie)
                .then(function () {
                    ctlr.message = movie.title + " is removed from your bookmarks ";
                });
        }
    }

})();