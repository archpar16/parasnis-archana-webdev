(function () {
    angular
        .module('ReserveYourSeat')
        .controller('userBookSeatController', userBookSeatController);
    
    function userBookSeatController(currentUser, $location, userService, $filter, $routeParams) {
        var ctlr = this;

        ctlr.user = currentUser;
        init();

        function init() {
            ctlr.numSeats = [
                {name: "1", value: "1" },
                {name: "2", value: "2" },
                {name: "3", value: "3" },
                {name: "4", value: "4" },
                {name: "5", value: "5" },
                {name: "6", value: "6" }
            ];

            ctlr.seatNumbers = [
                {name: "1A", value: "1A" },
                {name: "1B", value: "1B" },
                {name: "1C", value: "1C" },
                {name: "1D", value: "1D" },
                {name: "1E", value: "1E" },
                {name: "2A", value: "2A" },
                {name: "2B", value: "2B" },
                {name: "2C", value: "2C" },
                {name: "2D", value: "2D" },
                {name: "2E", value: "2E" },
                {name: "3A", value: "3A" },
                {name: "3B", value: "3B" },
                {name: "3C", value: "3C" },
                {name: "3D", value: "3D" },
                {name: "3E", value: "3E" },
                {name: "4A", value: "4A" },
                {name: "4B", value: "4B" },
                {name: "4C", value: "4C" },
                {name: "4D", value: "4D" },
                {name: "4E", value: "4E" },
                {name: "5A", value: "5A" },
                {name: "5B", value: "5B" },
                {name: "5C", value: "5C" },
                {name: "5D", value: "5D" },
                {name: "5E", value: "5E" },
                {name: "6A", value: "6A" },
                {name: "6B", value: "6B" },
                {name: "6C", value: "6C" },
                {name: "6D", value: "6D" },
                {name: "6E", value: "6E" }
            ];
        }
        // event handlers
        ctlr.bookYourSeats = bookYourSeats;

        // Implementation of event handlers
        function bookYourSeats(username, numOfSeats, seats, cc, expiry) {
            if (numOfSeats.value !== seats.length.toString()) {
                ctlr.message = " Number of seats selected is not same as seats selected";
                return;
            }
            var exp = $filter('date')(expiry, 'MM/yyyy');

            var movieId = $routeParams['movieId'];
            var zip = $routeParams['zip'];
            var theatreId = $routeParams['theatreId'];
            var showtime = $routeParams['showtime'];
            var order = {
                username: username,
                movieId: movieId,
                zip: zip,
                theatreId: theatreId,
                numOfSeats: numOfSeats.value,
                seats:[],
                showtime: showtime
            };
            for (var i = 0; i < seats.length; i++)
                order.seats.push(seats[i].value);

            userService
                .bookYourSeats(order)
                .then(function () {
                    $location.url('/profile');
                }, function () {
                    ctlr.message = "User for whom you are trying to book ticket doesn't exist";
                })
        }
    }

})();