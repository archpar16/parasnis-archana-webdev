(function () {
    angular
        .module('ReserveYourSeat')
        .controller('userController', userController);

    function userController(currentUser, $location, userService) {
        console.log('in profile controller now');
        var ctlr = this;

        ctlr.user = currentUser;

        init();
        // event handlers
        ctlr.logout = logout;
        ctlr.searchOtherUsers = searchOtherUsers;
        ctlr.showUserProfile = showUserProfile;

        function init() {
            searchOtherUsers();
        }

        function searchOtherUsers() {
            userService
                .findAllUsers()
                .then(function (userList) {
                    ctlr.users = userList;
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
    }

})();