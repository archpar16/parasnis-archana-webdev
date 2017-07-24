(function () {
    angular
        .module('WebAppMaker', ['ngRoute', 'textAngular'])
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
            .when('/user/website/:wid/page', {
                templateUrl: 'Views/Page/Templates/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'vm_page_list',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/website/:wid/page/new', {
                templateUrl: 'Views/Page/Templates/page-new.view.client.html',
                controller: 'pageNewController',
                controllerAs: 'vm_page_new',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/website/:wid/page/:pid', {
                templateUrl: 'Views/Page/Templates/page-edit.view.client.html',
                controller: 'pageEditController',
                controllerAs: 'vm_page_edit',
                resolve: {
                    currentUser: checkLoggedIn
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
            .when('/user/website', {
                templateUrl: 'Views/Website/Templates/website-list.view.client.html',
                controller: 'websiteListController',
                controllerAs: 'vm_web_list',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/website/new', {
                templateUrl: 'Views/Website/Templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'vm_web_new',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/website/:wid', {
                templateUrl: 'Views/Website/Templates/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'vm_web_edit',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/website/:wid/page/:pid/widget', {
                templateUrl: 'Views/Widget/Templates/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'vm_widget_list',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/website/:wid/page/:pid/widget/new', {
                templateUrl: 'Views/Widget/Templates/widget-chooser.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'vm_widget_new',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/website/:wid/page/:pid/widget/:wgid', {
                templateUrl: 'Views/Widget/Templates/widget-edit.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'vm_widget_edit',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/website/:wid/page/:pid/widget/:wgid/search', {
                templateUrl: 'Views/Widget/Templates/widget-flickr-search.view.client.html',
                controller: 'flickrImageSearchController',
                controllerAs: 'vm_flickr_search',
                resolve: {
                    currentUser: checkLoggedIn
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
})();