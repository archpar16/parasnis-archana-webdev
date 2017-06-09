(function () {
    angular
        .module('WebAppMaker', ['ngRoute'])
        .config(configuration)

    function configuration($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'Views/User/login.view.client.html'
            })
            .when('/', {
                templateUrl: 'home.html'
            })
    }
})();