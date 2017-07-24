(function () {
    angular
        .module('WebAppMaker', ['ngRoute'])
        .config(userConfiguration);

    function userConfiguration($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'Templates/User/Templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm_log'

            })
            .when('/register', {
                templateUrl: 'Templates/User/Templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'vm_register'
            })
            .when('/user/:uid', {
                templateUrl: 'Templates/User/Templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'vm_profile'
            })
    }
})();