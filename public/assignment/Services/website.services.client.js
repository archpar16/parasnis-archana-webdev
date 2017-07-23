(function () {
    angular
        .module('WebAppMaker')
        .factory('websiteService', websiteService);

    function websiteService($http) {

        return {
            createWebsite: createWebsite,
            findWebsiteById: findWebsiteById,
            findWebsitesByUser: findWebsitesByUser,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };

        function createWebsite(website) {
            var url = '/api/createWebsite';
            return $http.post(url, website)
                .then(function (response) {
                        return response.data;
                    }
                );
        }


        function updateWebsite(websiteId, website) {
            var url = '/api/website/' + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function deleteWebsite(websiteId) {
            var url = '/api/website/' + websiteId;
            return $http.delete(url)
                .then(function (response) {
                        return response.data;
                    }
                );
             }
        
        // function findWebsitesByUser(userId) {
        //     var url = '/api/user/' + userId + '/website';
        //     return $http.get(url)
        //         .then(function (response) {
        //                 return response.data;
        //             }
        //         );
        //     }

        function findWebsitesByUser() {
            var url = '/api/website';
            return $http.get(url)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function findWebsiteById(websiteId) {
            var url = '/api/website/' + websiteId;
            return $http.get(url)
                .then(function (response) {
                        return response.data;
                    }
                );
            }



    }
})();



