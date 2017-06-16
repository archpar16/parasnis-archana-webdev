(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController(widgetService, $routeParams, $location) {

        var ctlr = this;

        ctlr.userId = $routeParams['uid'];
        ctlr.websiteId = $routeParams['wid'];
        ctlr.pageId = $routeParams['pid'];
        ctlr.widgetId = $routeParams['wgid'];

        // event handlers
        ctlr.createWidget = createWidget;
        ctlr.getNewWidgetUrlForType = getNewWidgetUrlForType;


        function getNewWidgetUrlForType(type) {
            return 'Views/Widget/Editors/widget-'+type.toLowerCase()+'-new.view.client.html';
        }

        ctlr.size = ["1", "2", "3", "4", "5", "6"];

        // implement event handlers
        function createWidget(name, text, size, width, url, type) {
            var widget = {
                _id: ctlr.widgetId,
                widgetType: type,
                pageId: oldWidget.pageId,
                name: name
            };

            if (type === 'HEADING') {
                widget.text = text;
                widget.size = size;
            }

            if (type === 'IMAGE' || type === 'YOUTUBE') {
                widget.url = url;
                widget.width = width;
            }


            widgetService.createWidget(pageId, widget);
            $location.url('/user/' + ctlr.userId + '/website/' + ctlr.websiteId + '/page/' +  ctlr.pageId + '/widget');
        }
    }
})();