(function () {
    angular
        .module('ReserveYourSeat')
        .controller('theatreDetailsController', theatreDetailsController);

    function theatreDetailsController(currentUser, theatreMovieService, $location,
                                      userService, $routeParams) {
        var ctlr = this;
        console.log('in theatre details controller');
        ctlr.currentUser = currentUser;

        ctlr.searchMovies = searchMovies;
        ctlr.logout = logout;

        init();

        function init() {
            var theatreId = $routeParams['theatreId'];
            ctlr.zip = $routeParams['zip'];
            searchTheatreDetailsForTheatreId(theatreId);
        }

        function searchTheatreDetailsForTheatreId(theatreId) {
            theatreMovieService
                .searchTheatreDetails(theatreId)
                .then(function (response) {
                    ctlr.theatreDetails = response.data;
                });
        }

        function searchMovies(theatreId) {
            $location.url('/zip/' + ctlr.zip + '/theatre/' + theatreId + '/movies');
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }
    }
})();