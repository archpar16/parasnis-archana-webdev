(function () {
    angular
        .module('WebAppMaker')
        .controller('flickrImageSearchController', flickrImageSearchController);

    function flickrImageSearchController(flickrService , widgetService, $routeParams, $location) {

        var ctlr = this;
        console.log("in flick ctlr");

        ctlr.userId = $routeParams['uid'];
        ctlr.websiteId = $routeParams['wid'];
        ctlr.pageId = $routeParams['pid'];
        ctlr.widgetId = $routeParams['wgid'];

        ctlr.searchPhotos = searchPhotos;
        ctlr.selectPhoto = selectPhoto;


        function searchPhotos(searchTerm) {
            console.log("ser" + searchTerm);
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                  //  console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    ctlr.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            ctlr.userId = $routeParams['uid'];
            ctlr.websiteId = $routeParams['wid'];
            ctlr.pageId = $routeParams['pid'];
            ctlr.widgetId = $routeParams['wgid'];

            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            console.log('widget' + ctlr.widgetId);
            var newWidget = {
                _id: ctlr.widgetId,
                widgetType: 'IMAGE',
                pageId: ctlr.pageId,
                url: url,
                name: name
            };

            widgetService
                .updateWidget(ctlr.widgetId, newWidget)
                .then(function () {
                    $location.url('/user/' + ctlr.userId + '/website/' + ctlr.websiteId + '/page/' +  ctlr.pageId + '/widget');
                });


        }
    }
})();