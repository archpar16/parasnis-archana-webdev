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
            findWebsiteById: findWebsiteById,
            findWebsitesByUser: findWebsitesByUser,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };

        function createWebsite(website, userId) {
            var url = '/api/user/' + userId + '/website';
            return $http.post(url, website)
                .then(function (response) {
                        return response.data;
                    }
                );
            // website._id = (new Date()).getTime() + "";
            // website.developerId = userId;
            // websites.push(website);
        }


        function updateWebsite(websiteId, website) {
            var url = '/api/website/' + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                        return response.data;
                    }
                );
            // var oldWebsite = findWebsiteById(websiteId);
            // var index = websites.indexOf(oldWebsite);
            // deleteWebsite(websiteId);
            // websites.splice(index, 0, website);
        }

        function deleteWebsite(websiteId) {
            var url = '/api/website/' + websiteId;
            return $http.delete(url, website)
                .then(function (response) {
                        return response.data;
                    }
                );
            // var website = findWebsiteById(websiteId);
            // var index = websites.indexOf(website);
            // websites.splice(index, 1);
        }
        
        function findWebsitesByUser(userId) {
            var url = '/api/user/' + userId + '/website';
            return $http.get(url)
                .then(function (response) {
                        return response.data;
                    }
                );
            // var result = [];
            //
            // for (var w in websites){
            //     if(websites[w].developerId === userId) {
            //         result.push(websites[w]);
            //     }
            // }
            // return result;
        }


        function findWebsiteById(websiteId) {
            var url = '/api/website/' + websiteId;
            return $http.get(url)
                .then(function (response) {
                        return response.data;
                    }
                );
            // return websites.find(function (website) {
            //     return website._id === websiteId;
            // });
        }



    }
})();



