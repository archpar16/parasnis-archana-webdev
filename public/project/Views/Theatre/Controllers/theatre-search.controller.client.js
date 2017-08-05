(function () {
    angular
        .module('ReserveYourSeat')
        .controller('theatreController', theatreController);

    function theatreController(theatreMovieService, $location, currentUser, userService) {
        var ctlr = this;
        ctlr.currentUser = currentUser;
        console.log('in theatre controller');

        ctlr.logout = logout;
        ctlr.favoriteTheatre = favoriteTheatre;
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

        function favoriteTheatre(theatre) {
            if (typeof currentUser._id === 'undefined') {
                ctlr.msg = 'You must sign-in to add a theatre as favorite';
                return;
            }

            var theatre = {
                name: theatre.name,
                id: theatre.theatreId
            };
            console.log(theatre.name);
            userService
                .favoriteTheatre(theatre)
                .then(function () {
                    ctlr.msg = "Added " + theatre.name + 'to favorites';
                })
        }
    }
})();