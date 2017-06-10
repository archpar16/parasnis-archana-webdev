(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams, websiteService, $location) {
        console.log('in website new controller now');
        var ctlr = this;
        var userID = $routeParams['uid'];
        var websiteID = $routeParams['wid'];
        ctlr.userID = userID;

        init();
        // event handlers
        ctlr.updateWebsite = updateWebsite;
        ctlr.deleteWebsite = deleteWebsite;

        // Implementation of event handlers
        function updateWebsite(name, desc) {
            var website = {
                name: name,
                description: desc
            };

            websiteService.updateWebsite(website, userID);
            $location.url('/user/' + ctlr.userID + '/website')
        }


        function deleteWebsite(websiteID) {
            websiteService.deleteWebsite(websiteID);
            $location.url('/user/' + ctlr.userID + '/website')
        }

        function init() {
            ctlr.websitesForUser = websiteService.findWebsitesByUser(userID);
            ctlr.currentWebsite = websiteService.findWebsiteByID(websiteID);
        }


    }

})();