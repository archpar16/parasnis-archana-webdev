(function () {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);
    
    function pageListController($routeParams, pageService) {
        console.log('in page list controller now');
        var ctlr = this;
        // var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        // ctlr.userId = userId;
        ctlr.websiteId = websiteId;

        init();

        function init() {
            pageService
                .findPageByWebsiteId(websiteId)
                .then(function (pages) {
                    ctlr.pagesForWebsite = pages;
                });
        }
    }

})();