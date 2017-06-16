(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams, websiteService, $location) {
        console.log('in website new controller now');
        var ctlr = this;
        var userId = $routeParams['uid'];
        ctlr.userId = userId;
        init();
        
        ctlr.createWebsite = createWebsite;

        function createWebsite(name, desc) {
            var website = {
                name: name,
                description: desc
            };

            websiteService.createWebsite(website, userId);
            $location.url('/user/' + ctlr.userId + '/website')
        }

        function init() {
            ctlr.websitesForUser = websiteService.findWebsitesByUser(userId);
        }


    }

})();