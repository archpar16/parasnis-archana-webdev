(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);
    
    function registerController($location, userService) {
        console.log('in register controller now');
        var ctlr = this;

        // event handlers
        ctlr.register = register;

        // Implementation of event handlers
        function register(username, password, password_verify) {
            if (typeof password === 'undefined' || password !== password_verify) {
                ctlr.error = "Password cannot be empty and they must match";
                return;
            }
            //  check for username existing then only create new user
            userService
                .findUserByUsername(username)
                .then(usernameAvailable, handleError);

            function handleError() {
                   ctlr.error = " Username is not unique, please choose another";

            }

            function usernameAvailable() {
                var user = {
                    username: username,
                    password: password
                };
                userService
                    .register(user)
                    .then(function (user) {
                        $location.url('/profile');
                    });
             }
        }
    }

})();