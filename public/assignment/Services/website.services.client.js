(function () {
    angular
        .module('WebAppMaker')
        .factory('websiteService', websiteService);

    function websiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        return {
            createWebsite: createWebsite,
            findWebsiteByID: findWebsiteByID,
            findWebsitesByUser: findWebsitesByUser,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };

        function createWebsite(website, userID) {
            website._id = (new Date()).getTime() + "";
            website.developerId = userID;
            websites.push(website);
        }


        function updateWebsite(websiteId, website) {
            deleteWebsite(websiteId);
            websites.push(website);
        }

        function deleteWebsite(websiteId) {
            var website = findWebsiteByID(websiteId);
            var index = websites.indexOf(website);
            websites.splice(index, 1);
        }
        
        function findWebsitesByUser(userID) {
            var result = [];

            for (var w in websites){
                if(websites[w].developerId === userID) {
                    result.push(websites[w]);
                }
            }
            return result;
        }


        function findWebsiteByID(websiteID) {
            return websites.find(function (website) {
                return website._id === websiteID;
            });
        }
    }
})();