(function () {
    angular
        .module('WebAppMaker', ['ngRoute'])
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/login', {
                templateUrl: 'Views/User/Template/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm_log'

            })
            .when('/register', {
                templateUrl: 'Views/User/Template/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'vm_register'
            })
            .when('/user/:uid', {
                templateUrl: 'Views/User/Template/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'vm_profile'
            })
            .when('/user/:uid/website', {
                templateUrl: 'Views/Website/Template/website-list.view.client.html',
                controller: 'websiteListController',
                controllerAs: 'vm_web_list'
            })
            .when('/user/:uid/website/new', {
                templateUrl: 'Views/Website/Template/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'vm_web_new'
            })
            .when('/user/:uid/website/:wid', {
                templateUrl: 'Views/Website/Template/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'vm_web_edit'
            })
            .when('/user/:uid/website/:wid/page', {
                templateUrl: 'Views/Page/Template/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'vm_page_list'
            })
            .when('/user/:uid/website/:wid/page/new', {
                templateUrl: 'Views/Page/Template/page-new.view.client.html',
                controller: 'pageNewController',
                controllerAs: 'vm_page_new'
            })
            .when('/user/:uid/website/:wid/page/:pid', {
                templateUrl: 'Views/Page/Template/page-edit.view.client.html',
                controller: 'pageEditController',
                controllerAs: 'vm_page_edit'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget', {
                templateUrl: 'Views/Widget/Template/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'vm_widget_list'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new', {
                templateUrl: 'Views/Widget/Template/widget-chooser.view.client.html'
                // , controller: 'widgetChooserController',
                // controllerAs: 'vm_widget_choose'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid', {
                templateUrl: 'Views/Widget/Template/widget-edit.view.client.html'
                // ,controller: 'widgetChooserController',
                // controllerAs: 'vm_widget_choose'
            })
    }
})();