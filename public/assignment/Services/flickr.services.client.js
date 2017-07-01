(function () {
    angular
        .module('WebAppMaker')
        .factory('flickrService', flickrService);

    function flickrService($http) {

        return {
            searchPhotos: searchPhotos
        };


        function searchPhotos(searchTerm) {
            var key = "7fce12986cf40d9aca551e163606ddb1";
            var secret = "b1c85558886b219d";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

            console.log("in service " + searchTerm);
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();