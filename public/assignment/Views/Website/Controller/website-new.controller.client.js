(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams, websiteService, $location) {
        console.log('in website new controller now');
        var ctlr = this;
        var userID = $routeParams['uid'];
        ctlr.userID = userID;
        init();
        
        ctlr.createWebsite = createWebsite;

        function createWebsite(name, desc) {
            var website = {
                name: name,
                description: desc
            };

            websiteService.createWebsite(website, userID);
            $location.url('/user/' + ctlr.userID + '/website')
        }

        function init() {
            ctlr.websitesForUser = websiteService.findWebsitesByUser(userID);
        }


    }

})();