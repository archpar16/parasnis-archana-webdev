(function () {
    angular
        .module('projectPOC')
        .factory('theatreMovieService', theatreMovieService);

    function theatreMovieService($https, $filter) {

        return {
            searchTheatres: searchTheatres,
            searchTheatreDetails: searchTheatreDetails,
            searchMovies: searchMovies
        };

        function searchTheatres(zipcode) {
            var baseURL = "http://data.tmsapi.com/v1.1/";
            var apiKey = "api_key=ffs4rxcjp3wcfveqmfuf8f62";
            var url = baseURL+"theatres?zip="+zipcode+"&"+apiKey;
            console.log('theatres find url = '+ url);
            return $https.get(url);
        }

        function searchTheatreDetails(theatreId) {
            var baseURL = "http://data.tmsapi.com/v1.1/";
            var apiKey = "api_key=ffs4rxcjp3wcfveqmfuf8f62";
            var url = baseURL+"theatres/"+theatreId+"?"+apiKey;
            console.log('theatre details url = '+ url);
            return $https.get(url);
        }

        function searchMovies(theatreId) {
            var baseURL = "http://data.tmsapi.com/v1.1/";
            var apiKey = "api_key=ffs4rxcjp3wcfveqmfuf8f62";
            var today = $filter('date')(new Date(), 'yyyy-MM-dd');
            console.log('now =' + today);
            console.log('theatreId =' + theatreId);
            var url = baseURL + "theatres/"+theatreId+"/showings?startDate="+today+"&"+apiKey;
            return $https.get(url);
        }
    }
})();