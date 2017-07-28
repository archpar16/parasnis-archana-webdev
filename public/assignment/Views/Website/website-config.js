(function () {
    angular
        .module('WebAppMaker', ['ngRoute'])
        .config(websiteConfiguration);

    function websiteConfiguration($routeProvider) {
        $routeProvider
            .when('/user/:uid/website', {
                templateUrl: 'Templates/Movie/Templates/website-list.view.client.html',
                controller: 'websiteListController',
                controllerAs: 'vm_web_list'
            })
            .when('/user/:uid/website/new', {
                templateUrl: 'Templates/Movie/Templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'vm_web_new'
            })
            .when('/user/:uid/website/:wid', {
                templateUrl: 'Templates/Movie/Templates/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'vm_web_edit'
            })
    }
})();