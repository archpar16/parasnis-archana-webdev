(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {
        console.log('in website edit controller now');
        var ctlr = this;
        // var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        // ctlr.userId = userId;

        init();
        // event handlers
        ctlr.updateWebsite = updateWebsite;
        ctlr.deleteWebsite = deleteWebsite;

        // Implementation of event handlers
        function updateWebsite(name, desc) {
            var website = {
                _id: websiteId,
                // developerId: userId,
                name: name,
                description: desc
            };

            websiteService
                .updateWebsite(websiteId, website)
                .then(function () {
                    $location.url('/user/website');
                });

        }


        function deleteWebsite() {
            websiteService
                .deleteWebsite(websiteId)
                .then(function () {
                    $location.url('/user/website');
                });

        }

        function init() {
            websiteService
                .findWebsitesByUser()
                .then(function (websites) {
                    ctlr.websitesForUser = websites;
                });

            websiteService
                .findWebsiteById(websiteId)
                .then(function (website) {
                    ctlr.currentWebsite = website;
                });
        }


    }

})();