(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($location, $routeParams, websiteService) {
        console.log('in website list controller now');
        var ctlr = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];

        console.log(' website id ' + websiteId);
        ctlr.userId = userId;
        init();

        function init() {
            ctlr.websitesForUser = websiteService.findWebsitesByUser(userId);
        }

        // ctlr.listPages = listPages;
        //
        // function listPages() {
        //     $location.url('/user/' + userId + '/website/' + websiteId + '/page');
        // }



    }

})();