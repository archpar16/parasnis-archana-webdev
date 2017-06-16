(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams, websiteService, $location) {
        var ctlr = this;
        var userId = $routeParams['uid'];
        ctlr.userId = userId;
        init();

        // event handlers
        ctlr.createWebsite = createWebsite;

        function init() {
            ctlr.websitesForUser = websiteService.findWebsitesByUser(userId);
        }

        // Implmenting event handlers
        function createWebsite(name, desc) {
            var website = {
                name: name,
                description: desc
            };

            websiteService.createWebsite(website, userId);
            $location.url('/user/' + ctlr.userId + '/website')
        }
    }

})();