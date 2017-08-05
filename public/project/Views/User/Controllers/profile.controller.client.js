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
    }

})();