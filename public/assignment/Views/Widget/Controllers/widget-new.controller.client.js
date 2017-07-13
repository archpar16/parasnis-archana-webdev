(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController(widgetService, $routeParams, $location) {

        var ctlr = this;

        ctlr.userId = $routeParams['uid'];
        ctlr.websiteId = $routeParams['wid'];
        ctlr.pageId = $routeParams['pid'];
        var type = $routeParams['heading'];

        console.log(ctlr.userId + "  " +ctlr.websiteId +"  "+ ctlr.pageId);

        // event handlers
        ctlr.createWidget = createWidget;

        ctlr.size = null;

        ctlr.sizeAll = [
            {name: "1", value: "1" },
            {name: "2", value: "2" },
            {name: "3", value: "3" },
            {name: "4", value: "4" },
            {name: "5", value: "5" },
            {name: "6", value: "6" }
        ];


        // implement event handlers
        function createWidget(name, text, size, width, url, type) {
            var widget = {
                widgetType: type
            };

            widgetService
                .createWidget(ctlr.pageId, widget)
                .then(function (widget) {
                    console.log('widget is - ' + widget._id);
                    $location.url('/user/' + ctlr.userId + '/website/' + ctlr.websiteId
                        + '/page/' +  ctlr.pageId + '/widget/'+ widget._id);
                });

        }
    }
})();