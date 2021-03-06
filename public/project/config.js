(function () {
    angular
        .module('ReserveYourSeat', ['ngRoute'])
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'Views/Home/Templates/home.view.client.html',
                controller: 'homeController',
                controllerAs: 'vm_home',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/admin', {
                templateUrl: 'Views/Admin/Templates/admin.view.client.html',
                controller: 'adminController',
                controllerAs: 'vm_admin',
                resolve: {
                    currentUser: checkAdmin
                }
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
                controllerAs: 'vm_profile',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/theatres', {
                templateUrl: 'Views/Theatre/Templates/theatre-search.view.client.html',
                controller: 'theatreController',
                controllerAs: 'vm_theatre',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/zip/:zip', {
                templateUrl: 'Views/Theatre/Templates/theatre-search-results.view.client.html',
                controller: 'theatreListController',
                controllerAs: 'vm_theatre',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/order/:orderId', {
                templateUrl: 'Views/User/Templates/order-details.view.client.html',
                controller: 'orderController',
                controllerAs: 'vm_order',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/zip/:zip/theatre/:theatreId', {
                templateUrl: 'Views/Theatre/Templates/theatre-details.view.client.html',
                controller: 'theatreDetailsController',
                controllerAs: 'vm_theatre',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/zip/:zip/theatre/:theatreId/movies', {
                templateUrl: 'Views/Movie/Templates/movie-list.view.client.html',
                controller: 'movieListController',
                controllerAs: 'vm_movie',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/zip/:zip/theatre/:theatreId/movie/:movieId', {
                templateUrl: 'Views/Movie/Templates/movie-long-details.view.client.html',
                controller: 'movieLongDetailController',
                controllerAs: 'vm_movie',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/users', {
                templateUrl: 'Views/User/Templates/user-list.view.client.html',
                controller: 'userController',
                controllerAs: 'vm_user',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/zip/:zip/movie/:movieId/bookseats/theatre/:theatreId/:showtime', {
                templateUrl: 'Views/User/Templates/book-seats.view.client.html',
                controller: 'userBookSeatController',
                controllerAs: 'vm_user',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/:username', {
                templateUrl: 'Views/User/Templates/user-profile.view.client.html',
                controller: 'userProfileController',
                controllerAs: 'vm_user',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })

            .when('/userUpdate/:username', {
                templateUrl: 'Views/Admin/Templates/admin-user-update.view.client.html',
                controller: 'adminUpdateController',
                controllerAs: 'vm_admin',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/createuser', {
                templateUrl: 'Views/Admin/Templates/admin-user-create.view.client.html',
                controller: 'adminCreateController',
                controllerAs: 'vm_admin',
                resolve: {
                    currentUser: checkAdmin
                }
            })
    }


    function checkCurrentUser($q, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkLoggedIn($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkAdmin($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkAdmin()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                    $location.url('/');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
})();