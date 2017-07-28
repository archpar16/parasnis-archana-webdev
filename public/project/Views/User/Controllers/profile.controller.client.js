(function () {
    angular
        .module('ReserveYourSeat')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, $routeParams, userService) {
        console.log('in profile controller now');
        var ctlr = this;

        ctlr.user = currentUser;

        // event handlers
        ctlr.update = update;
        ctlr.logout = logout;

        // Implementation of event handlers

        function update(user) {
            if (user.pwd1 !== user.pwd2){
                ctlr.message = "Passowrds must match";
                return;
            }

            userService
                .updateUser(user)
                .then(function () {
                    ctlr.message = " User updated successfully";
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }

})();