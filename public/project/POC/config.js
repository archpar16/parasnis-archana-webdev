(function () {
    angular
        .module('projectPOC', ['ngRoute'])
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'Views/home.html',
                controller: 'theatreController',
                controllerAs: 'vm_poc'
            })
            .when('/theatres/:zipcode', {
                templateUrl: 'Views/theatre-search-result.view.client.html',
                controller: 'theatreController',
                controllerAs: 'vm_poc'
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
})();