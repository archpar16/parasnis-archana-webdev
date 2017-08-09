(function () {
    angular
        .module('ReserveYourSeat')
        .controller('adminController', adminController);

    function adminController(currentUser, $location, userService) {
        console.log('in admin controller now');
        var ctlr = this;

        ctlr.user = currentUser;

        // init();

        // event handlers

        ctlr.listAllUsers = listAllUsers;
        ctlr.checkAdmin = checkAdmin;
        ctlr.createUser = createUser;

        // Implementation of event handlers

        function listAllUsers() {
            $location.url('/users');
        }

        function createUser() {
            $location.url('/createuser');
        }
        function checkAdmin() {
            userService
                .checkAdmin()
                .then(function (currentUser) {
                    if (currentUser === '0') {
                        ctlr.admin = null;
                    } else {
                        ctlr.admin = currentUser;
                    }
                });
        }
    }

})();