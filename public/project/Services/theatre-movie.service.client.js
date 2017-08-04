(function () {
    angular
        .module('ReserveYourSeat')
        .factory('theatreMovieService', theatreMovieService);

    function theatreMovieService($http, $filter) {

        return {
            searchTheatres: searchTheatres,
            searchTheatreDetails: searchTheatreDetails,
            // searchMoviesInLocalTheatre: searchMoviesInLocalTheatre,
            getMovieLongDetails: getMovieLongDetails,
            searchMovies: searchMovies
        };

        function searchTheatres(zipcode) {
            var baseURL = "https://data.tmsapi.com/v1.1/";
            var apiKey = "api_key=ffs4rxcjp3wcfveqmfuf8f62";
            var url = baseURL+"theatres?zip="+zipcode+"&"+apiKey;
            console.log('theatres find url = '+ url);
            return $http.get(url);
        }

        function searchTheatreDetails(theatreId) {
            var baseURL = "https://data.tmsapi.com/v1.1/";
            var apiKey = "api_key=ffs4rxcjp3wcfveqmfuf8f62";
            var url = baseURL+"theatres/"+theatreId+"?"+apiKey;
            console.log('theatre details url = '+ url);
            return $http.get(url);
        }

        function searchMovies(theatreId) {
            var baseURL = "https://data.tmsapi.com/v1.1/";
            var apiKey = "api_key=ffs4rxcjp3wcfveqmfuf8f62";
            var today = $filter('date')(new Date(), 'yyyy-MM-dd');
            console.log('now =' + today);
            console.log('theatreId =' + theatreId);
            var url = baseURL + "theatres/"+theatreId+"/showings?startDate="+today+"&"+apiKey;
            return $http.get(url);
        }

        // function searchMoviesInLocalTheatre() {
        //     var baseurl = 'https://data.tmsapi.com/v1.1/movies/showings?startDate=';
        //     var apiKey = "api_key=ffs4rxcjp3wcfveqmfuf8f62";
        //     var today = $filter('date')(new Date(), 'yyyy-MM-dd');
        //     var url = baseurl + today+ "&zip=01720&" + apiKey;
        //     return $http.get(url);
        // }

        function getMovieLongDetails(movieId, zip) {
            var baseurl = 'https://data.tmsapi.com/v1.1/movies/';
            var apiKey = 'api_key=ffs4rxcjp3wcfveqmfuf8f62';
            var today = $filter('date')(new Date(), 'yyyy-MM-dd');
            var url = baseurl + movieId + '/showings?startDate=' + today+ '&zip=' + zip
                + '&' + apiKey;
            return $http.get(url);
        }
    }
})();