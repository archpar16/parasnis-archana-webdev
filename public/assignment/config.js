(function () {
    angular
        .module('WebAppMaker', ['ngRoute'])
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
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
            .when('/user/:uid', {
                templateUrl: 'Views/User/Templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'vm_profile'
            })
            .when('/user/:uid/website', {
                templateUrl: 'Views/Website/Templates/website-list.view.client.html',
                controller: 'websiteListController',
                controllerAs: 'vm_web_list'
            })
            .when('/user/:uid/website/new', {
                templateUrl: 'Views/Website/Templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'vm_web_new'
            })
            .when('/user/:uid/website/:wid', {
                templateUrl: 'Views/Website/Templates/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'vm_web_edit'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget', {
                templateUrl: 'Views/Widget/Templates/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'vm_widget_list'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new', {
                templateUrl: 'Views/Widget/Templates/widget-chooser.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'vm_widget_new'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid', {
                templateUrl: 'Views/Widget/Templates/widget-edit.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'vm_widget_edit'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new/heading', {
                templateUrl: 'Views/Widget/Templates/widget-heading-new.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'vm_widget_new'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new/image', {
                templateUrl: 'Views/Widget/Templates/widget-image-new.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'vm_widget_new'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new/youtube', {
                templateUrl: 'Views/Widget/Templates/widget-youtube-new.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'vm_widget_new'
            })

    }

})();