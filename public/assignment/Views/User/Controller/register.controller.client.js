(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);
    
    function registerController($location, userService) {
        console.log('in register controller now');
        var ctlr = this;

        ctlr.register = register;

        function register(username, password, password_verify) {
            var found = userService.findUserByUsername(username);
            console.log('in register');
            if (found !== null) {
                // console.log('found him');
               ctlr.error = " Username is not unique, please choose another";
            } else {
                console.log('username available');
                if (password !== password_verify) {
                    ctlr.error = "Passwords must match";
                    return;
                }
                console.log('adding user');
                var user = {
                    username: username,
                    password: password
                };
                userService.createUser(user);
                console.log("navigating to " + '/user/' + user._id);
                $location.url('/user/' + user._id);
            }
        }
    }

})();