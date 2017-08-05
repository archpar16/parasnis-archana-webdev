(function () {
    angular
        .module('ReserveYourSeat')
        .controller('userProfileController', userProfileController);

    function userProfileController(currentUser, $location, userService, $routeParams) {
        console.log('in profile controller now');
        var ctlr = this;

        ctlr.user = currentUser;

        init();
        // event handlers
        ctlr.logout = logout;
        ctlr.showUserProfile = showUserProfile;
        ctlr.followUser = followUser;

        function init() {
            var username = $routeParams['username'];
            getUserProfile(username);
        }

        function getUserProfile(username) {
            userService
                .findUserByUsername(username)
                .then(function (user) {
                    ctlr.viewingUser = user;
                })
        }

        // Implementation of event handlers

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function showUserProfile(user) {
            $location.url('/user/' + user.username);
        }
        
        function followUser() {
            var whom = ctlr.viewingUser;
            
            userService
                .followUser(whom)
                .then(function (user) {
                    ctlr.msg = currentUser.username + " is now following " + whom.username;
                });
        }
    }

})();