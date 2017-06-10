(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);
    
    function profileController($location, $routeParams, userService) {
        console.log('in profile controller now');
        var ctlr = this;

        var userID = $routeParams['uid'];

        console.log('finding the user now' + userID);

        ctlr.user = userService.findUserByID(userID);

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
                    _id: userID,
                    username: username,
                    password: pwd1,
                    firstName: first,
                    lastName: last,
                    email: email
                };

                userService.updateUser(userID, user);
            // }
        }

        // ctlr.delete = dele;
        // function dele() {
        //     console.log('deleteing the user' + userID);
        //     userService.deleteUser(userID);
        //     $location.url('/login');
        // }
    }

})();