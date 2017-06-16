(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);
    
    function loginController($location, userService) {
        var ctlr = this;

        // event handlers
        ctlr.login = login;

        // Implementation of event handlers
        function login(username, password) {
            var found = userService.findUserByCredentials(username, password);
            if (found !== null) {
                $location.url('/user/' + found._id);
            } else {
                ctlr.message = username + " not found or password isn't correct, please try again";
            }
        }


    }

})();