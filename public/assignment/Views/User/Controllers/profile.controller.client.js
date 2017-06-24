(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {
        console.log('in profile controller now');
        var ctlr = this;

        var userId = $routeParams['uid'];

        userService
            .findUserById(userId)
            .then(renderUser);

        function renderUser (user) {
            ctlr.user = user;
        }
    //     ctlr.user = userService.findUserById(userId);
    // console.log('user ' + ctlr.user);
    //     // event handlers
        ctlr.update = update;

        // Implementation of event handlers
        function update(username, pwd1, pwd2, first, last, email) {
            if (pwd1 !== pwd2){
                ctlr.error = "Passowrds must match";
                return;
            }
            var user = {
                _id: userId,
                username: username,
                password: pwd1,
                firstName: first,
                lastName: last,
                email: email
            };

            userService.updateUser(userId, user);
        }


    }

})();