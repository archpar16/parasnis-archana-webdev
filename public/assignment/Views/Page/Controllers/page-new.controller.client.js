(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);
    
    function pageNewController($routeParams, pageService, $location) {
        console.log('in page new controller now');
        var ctlr = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];

        ctlr.userId = userId;
        ctlr.websiteId  = websiteId;

        init();

        // event handlers
        ctlr.createPage = createPage;
        // Implementation of event handlers
        function createPage(name, desc) {
            var page = {
                name: name,
                description: desc
            };

            pageService.createPage(websiteId, page);
            $location.url('/user/' + userId + '/website/' + websiteId + '/page');
        }

        function init() {
            ctlr.pagesForWebsite = pageService.findPageByWebsiteId(websiteId);
        }


    }

})();