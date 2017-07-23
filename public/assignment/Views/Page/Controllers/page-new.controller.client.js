(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);
    
    function pageNewController($routeParams, pageService, $location) {
        console.log('in page new controller now');
        var ctlr = this;
        ctlr.websiteId  = $routeParams['wid'];

        init();

        // event handlers
        ctlr.createPage = createPage;
        // Implementation of event handlers
        function createPage(name, desc) {
            var page = {
                name: name,
                description: desc
            };

            pageService
                .createPage(ctlr.websiteId, page)
                .then(function () {
                    $location.url('/user/website/' + ctlr.websiteId + '/page');
                });

        }

        function init() {
            pageService
                .findPageByWebsiteId(ctlr.websiteId)
                .then(function (pages) {
                    ctlr.pagesForWebsite = pages;
                });
        }


    }

})();