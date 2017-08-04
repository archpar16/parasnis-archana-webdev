(function () {
    angular
        .module('ReserveYourSeat')
        .controller('theatreController', theatreController);

    function theatreController(theatreMovieService, $location, currentUser, userService) {
        var ctlr = this;
        ctlr.currentUser = currentUser;
        console.log('in theatre controller');
        ctlr.logout = logout;

        ctlr.searchTheatresForZipcode = searchTheatresForZipcode;
        ctlr.searchTheatreDetailsForTheatreId = searchTheatreDetailsForTheatreId;

        function searchTheatresForZipcode(zipcode) {
            console.log('searching for ' + zipcode);
            ctlr.zip = zipcode;
            theatreMovieService
                .searchTheatres(zipcode)
                .then(function (response) {
                    ctlr.theatres = response.data;
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function searchTheatreDetailsForTheatreId(theatreId) {
            $location.url('/zip/' + ctlr.zip + '/theatre/'+ theatreId);
        }
    }
})();