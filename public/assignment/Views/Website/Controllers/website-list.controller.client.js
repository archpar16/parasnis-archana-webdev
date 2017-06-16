(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($location, $routeParams, websiteService) {
        var ctlr = this;
        var userId = $routeParams['uid'];
        ctlr.userId = userId;

        init();

        function init() {
            ctlr.websitesForUser = websiteService.findWebsitesByUser(userId);
        }
    }

})();