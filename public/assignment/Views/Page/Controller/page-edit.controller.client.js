(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);
    
    function pageEditController($routeParams, pageService, $location) {
        console.log('in page edit controller now');
        var ctlr = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];
        ctlr.userId = userId;
        ctlr.websiteId = websiteId;
        ctlr.pageId = pageId;

        init();
        // event handlers
        ctlr.updatePage = updatePage;
        ctlr.deletePage = deletePage;

        // Implementation of event handlers
        function updatePage(name, desc) {
            var page = {
                _id: pageId,
                websiteId: websiteId,
                name: name,
                description: desc
            };

            pageService.updatePage(pageId, page);
            $location.url('/user/' + ctlr.userId + '/website/' + websiteId + '/page');
        }


        function deletePage() {
            pageService.deletePage(pageId);
            $location.url('/user/' + ctlr.userId + '/website/' + websiteId + '/page');
        }

        function init() {
            ctlr.pagesForWebsite = pageService.findPageByWebsiteId(websiteId);
            ctlr.currentPage = pageService.findPageById(pageId);
        }


    }

})();