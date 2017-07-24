(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {
        console.log('in website edit controller now');
        var ctlr = this;
        var websiteId = $routeParams['wid'];


        init();
        // event handlers
        ctlr.updateWebsite = updateWebsite;
        ctlr.deleteWebsite = deleteWebsite;

        // Implementation of event handlers
        function updateWebsite(name, desc) {
            if (typeof name === 'undefined' || name === '') {
                ctlr.error = "Name is a required field";
                return;
            }

            var website = {
                _id: websiteId,
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