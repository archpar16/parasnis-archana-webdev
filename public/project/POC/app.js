(function () {
    angular
        .module('projectPOC', [])
        .controller('pocController', pocController);

    function pocController($http, $filter) {
        var ctlr = this;
        console.log('in poc cont');

        ctlr.searchMovies = searchMovies;
        ctlr.searchTheatres = searchTheatres;
        ctlr.searchTheatreDetails = searchTheatreDetails;

        var baseURL = "http://data.tmsapi.com/v1.1/";
        var apiKey = "api_key=ffs4rxcjp3wcfveqmfuf8f62";

        function searchTheatres(zipcode) {
            var url = baseURL+"theatres?zip="+zipcode+"&"+apiKey;
            $http.get(url)
                .then(function (response) {
                    ctlr.theatres = response.data;
                });
        }

        function searchMovies(theatreId) {
            var today = $filter('date')(new Date(), 'yyyy-MM-dd');
            console.log('now =' + today);
            console.log('theatreId =' + ctlr.theatreDetails.theatreId);
            var url = baseURL + "theatres/"+theatreId+"/showings?startDate="
            +today+"&"+apiKey;
            $http.get(url)
                .then(function (response) {
                    ctlr.movies = response.data;
                });
        }

        function searchTheatreDetails(theatreId) {
            var url = baseURL+"theatres/"+theatreId+"?"+apiKey;
            $http.get(url)
                .then(function (response) {
                    ctlr.theatreDetails = response.data;
                });
        }
    }
})();