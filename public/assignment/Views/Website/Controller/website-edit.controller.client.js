(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {
        console.log('in website new controller now');
        var ctlr = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        ctlr.userId = userId;

        init();
        // event handlers
        ctlr.updateWebsite = updateWebsite;
        ctlr.deleteWebsite = deleteWebsite;

        // Implementation of event handlers
        function updateWebsite(name, desc) {
            var website = {
                _id: websiteId,
                developerId: userId,
                name: name,
                description: desc
            };

            websiteService.updateWebsite(websiteId, website);
            $location.url('/user/' + ctlr.userId + '/website');
        }


        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/' + ctlr.userId + '/website');
        }

        function init() {
            ctlr.websitesForUser = websiteService.findWebsitesByUser(userId);
            ctlr.currentWebsite = websiteService.findWebsiteById(websiteId);
        }


    }

})();