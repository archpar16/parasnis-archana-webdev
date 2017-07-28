(function () {
    angular
        .module('ReserveYourSeat', ['ngRoute'])
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'Views/Home/Templates/home.view.client.html',
                controller: 'homeController',
                controllerAs: 'vm_home'
                // resolve: {
                //     currentUser: checkCurrentUser
                // }
            })

            .when('/login', {
                templateUrl: 'Views/User/Templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm_log'

            })
            .when('/register', {
                templateUrl: 'Views/User/Templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'vm_register'
            })
            .when('/profile', {
                templateUrl: 'Views/User/Templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'vm_profile'
                // resolve: {
                //     currentUser: checkLoggedIn
                // }
            })
            .when('/theatres', {
                templateUrl: 'Views/Theatre/Templates/theatre-search.view.client.html',
                controller: 'theatreController',
                controllerAs: 'vm_theatre'
            })
            .when('/theatre/:theatreId', {
                templateUrl: 'Views/theatre-details.view.client.html',
                controller: 'theatreController',
                controllerAs: 'vm_poc'
            })
            .when('/theatre/:theatreId/movies', {
                templateUrl: 'Views/movie-showtimes.view.client.html',
                controller: 'movieController',
                controllerAs: 'vm_poc'
            })

    }


    // function checkCurrentUser($q, userService) {
    //     var deferred = $q.defer();
    //     userService
    //         .checkLoggedIn()
    //         .then(function (currentUser) {
    //             if(currentUser === '0') {
    //                 deferred.resolve({});
    //             } else {
    //                 deferred.resolve(currentUser);
    //             }
    //         });
    //     return deferred.promise;
    // }
    //
    // function checkLoggedIn($q, $location, userService) {
    //     var deferred = $q.defer();
    //     userService
    //         .checkLoggedIn()
    //         .then(function (currentUser) {
    //             if(currentUser === '0') {
    //                 deferred.reject();
    //                 $location.url('/login');
    //             } else {
    //                 deferred.resolve(currentUser);
    //             }
    //         });
    //     return deferred.promise;
    // }
})();