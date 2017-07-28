(function () {
    angular
        .module('ReserveYourSeat')
        .controller('theatreController', theatreController);

    function theatreController(theatreMovieService, $location, $routeParams) {
        var ctlr = this;
        console.log('in theatre controller');

        ctlr.searchTheatres = searchTheatres;
        // ctlr.searchTheatreDetails = searchTheatreDetails;
        ctlr.searchMovies = searchMovies;

        ctlr.searchTheatresForZipcode = searchTheatresForZipcode;
        ctlr.searchTheatreDetailsForTheatreId = searchTheatreDetailsForTheatreId;

        // init();
        //
        // function init() {
        //     var zipcode = $routeParams['zipcode'];
        //     var theatreId = $routeParams['theatreId'];
        //     if (typeof zipcode !== 'undefined') {
        //         searchTheatresForZipcode(zipcode);
        //     }
        //     if (typeof theatreId !== 'undefined') {
        //         searchTheatreDetailsForTheatreId(theatreId);
        //     }
        //
        // }

        function searchTheatresForZipcode(zipcode) {
            console.log('searching for ' + zipcode);
            theatreMovieService
                .searchTheatres(zipcode)
                .then(function (response) {
                    ctlr.theatres = response.data;
                });
        }

        function searchTheatres(zipcode) {
            $location.url('/theatres/'+zipcode);
        }

        //
        // function searchTheatreDetails(theatreId) {
        //     $location.url('/theatre/'+theatreId);
        // }

        function searchTheatreDetailsForTheatreId(theatreId) {
            theatreMovieService
                .searchTheatreDetails(theatreId)
                .then(function (response) {
                    ctlr.theatreDetails = response.data;

                });
        }

        function searchMovies(theatreId) {
            $location.url('/theatre/' + theatreId + '/movies');
        }

    }
})();