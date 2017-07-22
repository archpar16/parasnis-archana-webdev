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
            userService
                // .findUserByCredentials(username, password)
                .login(username, password)
                .then(completeLogin, handleError);

            function completeLogin(found) {
                if (found !== null) {
                    $location.url('/profile');
                }
            }

            function handleError() {
                ctlr.message = username + " not found or password isn't correct, please try again";
            }
        }


    }

})();