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
            var found = userService.findUserByUsername(username);

            if (found !== null) {
               ctlr.error = " Username is not unique, please choose another";
            } else {
                if (password !== password_verify) {
                    ctlr.error = "Passwords must match";
                    return;
                }
                var user = {
                    username: username,
                    password: password
                };
                userService.createUser(user);
                $location.url('/user/' + user._id);
            }
        }
    }

})();