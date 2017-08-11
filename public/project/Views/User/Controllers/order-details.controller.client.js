(function () {
    angular
        .module('ReserveYourSeat')
        .controller('orderController', orderController);

    function orderController(currentUser, $location, userService,
                             $routeParams, theatreMovieService) {
        console.log('in profile controller now');
        var ctlr = this;

        ctlr.user = currentUser;

        init();
        // event handlers
        ctlr.logout = logout;


        function init() {
            var orderId = $routeParams['orderId'];
            getOrderDetails(orderId);
        }

        function getOrderDetails(orderId) {
            userService
                .getOrderDetails(orderId)
                .then(function (resp) {
                    ctlr.details = resp;
                    ctlr.cost = ctlr.details.numOfSeats * 25;
                    theatreMovieService
                        .getMovieLongDetails(ctlr.details.movieId, ctlr.details.zip)
                        .then(function (response) {
                            var movieInfo  = response.data;
                            ctlr.movieName = movieInfo[0].title;

                            for (var i = 0; i < movieInfo[0].showtimes.length; i++) {
                                if (movieInfo[0].showtimes[i].theatre.id === ctlr.details.theatreId){
                                    ctlr.theatreName = movieInfo[0].showtimes[i].theatre.name;
                                }
                            }
                        })
                })
        }

        // Implementation of event handlers

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }


    }

})();