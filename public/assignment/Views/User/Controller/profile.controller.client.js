(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);
    
    function profileController($location, $routeParams, userService) {
        console.log('in profile controller now');
        var ctlr = this;

        var userId = $routeParams['uid'];

        console.log('finding the user now' + userId);

        ctlr.user = userService.findUserById(userId);

        ctlr.update = update;

        function update(username, pwd1, pwd2, first, last, email) {
            // var found = userService.findUserByUsername(username);
console.log("in update ");
            // if (found !== null) {
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