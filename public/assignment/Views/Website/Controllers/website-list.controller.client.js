(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams, websiteService) {
        var ctlr = this;

        init();

        function init() {
            //
            websiteService
                .findWebsitesByUser()
                .then(allWebsites);


            function allWebsites(websites) {
                ctlr.websitesForUser = websites;
            }
        }
    }

})();