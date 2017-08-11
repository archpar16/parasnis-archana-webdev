(function () {
    angular
        .module('ReserveYourSeat')
        .controller('movieLongDetailController', movieLongDetailController);

    function movieLongDetailController(currentUser, $routeParams, theatreMovieService,
                                       $location, userService) {
        var ctlr = this;
        console.log('in movie long details cont');

        ctlr.currentUser = currentUser;
        ctlr.logout = logout;
        ctlr.bookSeats = bookSeats;

        init();

        function init() {
            ctlr.theatreId = $routeParams['theatreId'];
            ctlr.zip = $routeParams['zip'];
            getMovieLongDetails();
        }

        function getMovieLongDetails() {
            var movieId = $routeParams['movieId'];
            var zip = $routeParams['zip'];
            console.log(' movie id ' + movieId);
            theatreMovieService
                .getMovieLongDetails(movieId, zip)
                .then(function (response) {
                    ctlr.movieDetail = response.data[0];
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function bookSeats(showtime) {
            var movieId = $routeParams['movieId'];
            var zip = $routeParams['zip'];
            $location.url('/zip/' + zip + '/movie/' + movieId + '/bookseats/theatre/'
                + showtime.theatre.id + '/' + showtime.dateTime);
        }
    }
})();