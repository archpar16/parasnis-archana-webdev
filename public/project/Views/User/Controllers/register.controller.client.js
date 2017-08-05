(function () {
    angular
        .module('ReserveYourSeat')
        .controller('registerController', registerController);
    
    function registerController($location, userService) {
        console.log('in register controller now');
        var ctlr = this;

        // event handlers
        ctlr.register = register;

        // Implementation of event handlers
        function register(username, password, password_verify) {
            if (typeof username === 'undefined' ||
                typeof password === 'undefined' ||
                password !== password_verify) {
                ctlr.error = "Username & Password cannot be empty and passwords must match";
                return;
            }
            //  check for username existing then only create new user
            userService
                .findUserByUsername(username)
                .then(function (user) {
                    if (typeof user.username === 'undefined') {
                        var newuser = {
                                    username: username,
                                    password: password
                                };
                                userService
                                    .register(newuser)
                                    .then(function (u) {
                                        $location.url('/profile');
                                    });
                    } else {
                        ctlr.error = " Username is not unique, please choose another";
                    }
                });
        }
    }

})();