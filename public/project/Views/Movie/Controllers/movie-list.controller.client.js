(function () {
    angular
        .module('ReserveYourSeat')
        .controller('movieListController', movieListController);

    function movieListController(currentUser, theatreMovieService, $routeParams,
                                 $location, userService) {
        var ctlr = this;
        console.log('in movie details cont');

        init();
        ctlr.movieLongDetails = movieLongDetails;
        ctlr.bookmarkMovie = bookmarkMovie;
        ctlr.logout = logout;

        ctlr.currentUser = currentUser;

        function init() {
             ctlr.theatreId = $routeParams['theatreId'];
             ctlr.zip = $routeParams['zip'];

            if (typeof ctlr.theatreId !== 'undefined') {
                searchMoviesForTheatre(ctlr.theatreId);
            }
        }

        function searchMoviesForTheatre(theatreId) {
            theatreMovieService
                .searchMovies(theatreId)
                .then(function (response) {
                    ctlr.movies = response.data;
                });
        }

        function movieLongDetails(movie) {
            console.log(movie.tmsId);
            var zip = $routeParams['zip'];
            $location.url('/zip/' + zip + '/theatre/' + ctlr.theatreId + '/movie/' + movie.tmsId);
        }

        function bookmarkMovie(movie) {
            if (typeof currentUser._id === 'undefined') {
                ctlr.msg = 'You must sign-in to bookmark a movie';
                return;
            }
            var zip = $routeParams['zip'];
            console.log('book mark zip = ' + zip);
            var bookmark = {
                title: movie.title,
                id: movie.tmsId,
                zip: zip
            };
            userService
                .bookmarkMovie(bookmark)
                .then(function () {
                    ctlr.msg = "Bookmarked the movie " + movie.title;
                })
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