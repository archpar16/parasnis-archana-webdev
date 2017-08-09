(function () {
    angular
        .module('ReserveYourSeat')
        .controller('adminCreateController', adminCreateController);

    function adminCreateController(currentUser, $location, userService) {
        console.log('in admin controller now');
        var ctlr = this;

        ctlr.admin = currentUser;

        init();

        function init() {
            ctlr.roles = [
                {name: "User", value: "User" },
                {name: "Agent", value: "Agent" },
                {name: "Admin", value: "Admin" }
            ];
        }

        // event handlers
        ctlr.checkAdmin = checkAdmin;
        ctlr.createUser = createUser;

        // Implementation of event handlers

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

        function createUser(user) {
            if (typeof user === 'undefined' ||
                typeof user.username === 'undefined' ||
                typeof user.pwd1 === 'undefined' ||
                user.pwd1 !== user.pwd2) {
                ctlr.message = "Username & Password cannot be empty and passwords must match";
                return;
            }
            //  check for username existing then only create new user
            userService
                .findUserByUsername(user.username)
                .then(function (existinguser) {
                    if (typeof existinguser.username === 'undefined') {
                        var newuser = {
                            username: user.username,
                            password: user.pwd1,
                            role: user.role.value,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email
                        };

                        userService
                            .createUser(newuser)
                            .then(function (u) {
                                $location.url('/admin');
                            });
                    } else {
                        ctlr.message = " Username is not unique, please choose another";
                    }
                });
        }
    }

})();