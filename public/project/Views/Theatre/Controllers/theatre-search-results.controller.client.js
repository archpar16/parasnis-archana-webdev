(function () {
    angular
        .module('ReserveYourSeat')
        .controller('theatreListController', theatreListController);

    function theatreListController(theatreMovieService, $location, currentUser,
                                   userService, $routeParams) {
        var ctlr = this;
        ctlr.currentUser = currentUser;
        console.log('in theatre list controller');

        ctlr.logout = logout;
        ctlr.favoriteTheatre = favoriteTheatre;
        ctlr.searchTheatresForZipcode = searchTheatresForZipcode;
        ctlr.searchTheatreDetailsForTheatreId = searchTheatreDetailsForTheatreId;

        init();

        function init() {
            var zipcode = $routeParams['zip'];
            searchTheatresForZipcode(zipcode);
        }

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

        function favoriteTheatre(theatre) {
            if (typeof currentUser._id === 'undefined') {
                ctlr.msg = 'You must sign-in to add a theatre as favorite';
                return;
            }

            var theatre = {
                name: theatre.name,
                zip: ctlr.zip,
                id: theatre.theatreId
            };
            console.log(theatre.name);
            userService
                .favoriteTheatre(theatre)
                .then(function () {
                    ctlr.msg = "Added " + theatre.name + ' to favorites';
                })
        }
    }
})();