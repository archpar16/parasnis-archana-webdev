(function () {
    angular
        .module('WebAppMaker', ['ngRoute'])
        .config(widgetConfiguration);

    function widgetConfiguration($routeProvider) {
        $routeProvider
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
    }
})();