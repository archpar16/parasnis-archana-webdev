(function () {
    angular
        .module('projectPOC')
        .controller('movieController', movieController);

    function movieController(theatreMovieService, $routeParams) {
        var ctlr = this;
        console.log('in poc movie cont');

        init();

        function init() {
            var theatreId = $routeParams['theatreId'];

            if (typeof theatreId !== 'undefined') {
                searchMoviesForTheatre(theatreId);
            }

        }

        function searchMoviesForTheatre(theatreId) {
            theatreMovieService
                .searchMovies(theatreId)
                .then(function (response) {
                    ctlr.movies = response.data;
                });
        }
    }
})();