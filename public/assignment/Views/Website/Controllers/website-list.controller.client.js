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
            websiteService
                .findWebsitesByUser(userId)
                .then(allWebsites);


            function allWebsites(websites) {
                ctlr.websitesForUser = websites;
            }
        }
    }

})();