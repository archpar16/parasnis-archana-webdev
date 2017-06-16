(function () {
    angular
        .module('WebAppMaker', ['ngRoute'])
        .config(pageConfiguration);

    function pageConfiguration($routeProvider) {
        $routeProvider
            .when('/user/:uid/website/:wid/page', {
                templateUrl: 'Views/Page/Templates/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'vm_page_list'
            })
            .when('/user/:uid/website/:wid/page/new', {
                templateUrl: 'Views/Page/Templates/page-new.view.client.html',
                controller: 'pageNewController',
                controllerAs: 'vm_page_new'
            })
            .when('/user/:uid/website/:wid/page/:pid', {
                templateUrl: 'Views/Page/Templates/page-edit.view.client.html',
                controller: 'pageEditController',
                controllerAs: 'vm_page_edit'
            })
    }
})();