(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController(websiteService, $location) {
        var ctlr = this;
        init();

        // event handlers
        ctlr.createWebsite = createWebsite;

        function init() {
            websiteService
                .findWebsitesByUser()
                .then(function (res) {
                    ctlr.websitesForUser = res;
                });
        }

        // Implmenting event handlers
        function createWebsite(name, desc) {
            if (typeof name === 'undefined') {
                ctlr.error = "Name is a required field";
                return;
            }
            var website = {
                name: name,
                description: desc
            };

            websiteService
                .createWebsite(website)
                .then(function () {
                    $location.url('/user/website');
                });
        }
    }

})();