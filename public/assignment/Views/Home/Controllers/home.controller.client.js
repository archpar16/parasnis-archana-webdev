(function () {
    angular
        .module('WebAppMaker')
        .controller('homeController', homeController);

    function homeController(currentUser, userService, $location) {
        var ctlr = this;
        console.log('in home ctlr ' + currentUser._id);
        ctlr.currentUser = currentUser;

        ctlr.logout = logout;

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();