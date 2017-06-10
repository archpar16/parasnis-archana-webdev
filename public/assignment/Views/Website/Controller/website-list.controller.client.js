(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams, websiteService) {
        console.log('in website list controller now');
        var ctlr = this;
        var userID = $routeParams['uid'];
        ctlr.userID = userID;
        init();

        function init() {
            ctlr.websitesForUser = websiteService.findWebsitesByUser(userID);
        }
    }

})();