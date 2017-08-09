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
        ctlr.searchOtherUsers = searchOtherUsers;
        ctlr.showUserProfile = showUserProfile;
        ctlr.removeUser = removeUser;

        function init() {
            checkAdmin();
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

        function showUserProfile(user) {
            if(ctlr.admin === null)
                $location.url('/user/' + user.username);
            else
                $location.url('/userUpdate/' + user.username);
        }

        function checkAdmin() {
            userService
                .checkAdmin()
                .then(function (currentUser) {
                    if (currentUser === '0') {
                        ctlr.admin = null;
                    } else {
                        ctlr.admin = currentUser;
                    }
                });
        }

        function removeUser(user) {
            userService
                .deleteUser(user)
                .then(searchOtherUsers);
        }
    }

})();