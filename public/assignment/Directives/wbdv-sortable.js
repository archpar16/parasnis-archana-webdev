(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable($routeParams, widgetService, $location) {

        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];
        console.log('in wd sortable controller now' + pageId);

        function linkFunction(scope, element) {
            var userId = $routeParams['uid'];
            var websiteId = $routeParams['wid'];
            var pageId = $routeParams['pid'];
            $(element).sortable({
                start: function (event, ui) {
                    start = $(ui.item).index();
                },
                stop: function (event, ui) {
                    stop = $(ui.item).index();
                    console.log(start + " =>" + stop);
                    widgetService
                        .sortWidgets(pageId, start, stop)
                        .then(function () {
                            console.log("done with sorting");
                            $location.url('/user/website/' + websiteId + '/page/' +  pageId + '/widget');
                        });
                }
            });

        }

        return {
            link: linkFunction
        }
    }
}) ();