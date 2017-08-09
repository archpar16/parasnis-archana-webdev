(function () {
    angular
        .module('ReserveYourSeat')
        .controller('adminUpdateController', adminUpdateController);

    function adminUpdateController(currentUser, $routeParams, userService) {
        console.log('in admin controller now');
        var ctlr = this;

        ctlr.admin = currentUser;

        init();

        function init() {
            var username = $routeParams['username'];
            getUserProfile(username);
        }

        function getUserProfile(username) {
            userService
                .findUserByUsername(username)
                .then(function (user) {
                    ctlr.user = user;
                })
        }
        // event handlers

        // ctlr.listAllUsers = listAllUsers;

        ctlr.update = update;

        ctlr.checkAdmin = checkAdmin;

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