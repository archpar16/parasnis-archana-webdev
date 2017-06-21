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

       // console.log(type);

        // event handlers
        ctlr.createWidget = createWidget;

        ctlr.size = ["1", "2", "3", "4", "5", "6"];

        // implement event handlers
        function createWidget(name, text, size, width, url, type) {
            var widget = {
                _id: ctlr.widgetId,
                widgetType: type,
                pageId: ctlr.pageId,
                name: name,
                text: text
            };

            if (type === 'HEADING') {
                widget.text = text;
                widget.size = size;
            }

            if (type === 'IMAGE' || type === 'YOUTUBE') {
                widget.url = url;
                widget.width = width;
            }


            widgetService.createWidget(ctlr.pageId, widget);
            $location.url('/user/' + ctlr.userId + '/website/' + ctlr.websiteId + '/page/' +  ctlr.pageId + '/widget');
        }
    }
})();