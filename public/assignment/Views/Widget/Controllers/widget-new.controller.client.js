(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController(widgetService, $routeParams, $location) {

        var ctlr = this;

        ctlr.websiteId = $routeParams['wid'];
        ctlr.pageId = $routeParams['pid'];

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
        function createWidget(type) {
            var widget = {
                widgetType: type
            };
            console.log('parent page ' + ctlr.pageId + widget.widgetType);
            widgetService
                .createWidget(ctlr.pageId, widget)
                .then(function (widget) {
                    console.log('widget is - ' + widget._id);
                    $location.url('/user/website/' + ctlr.websiteId
                        + '/page/' +  ctlr.pageId + '/widget/'+ widget._id);
                });

        }
    }
})();