(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);
    
    function loginController($location, userService) {
        // console.log('in controller now');
        var ctlr = this;

        ctlr.login = login;

        function login(username, password) {
            var found = userService.findUserByCredentials(username, password);
            // console.log('found the user now' + found.username);

            if (found !== null) {
                // console.log('found him');
                $location.url('/user/' + found._id);
            } else {
                ctlr.message = username + " not found or password isn't correct, please try again";
            }
        }


    }

})();