(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($sce, widgetService, $routeParams, $location) {

        var ctlr = this;

        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];
        var widgetId = $routeParams['wgid'];

        ctlr.userId = userId;
        ctlr.websiteId = websiteId;
        ctlr.pageId = pageId;
        ctlr.widgetId = widgetId;

        init();
        // event handlers
        ctlr.getWidgetEditUrl = getWidgetEditUrl;
        ctlr.updateWidget = updateWidget;
        ctlr.deleteWidget = deleteWidget;

        ctlr.size = ["1", "2", "3", "4", "5", "6"];

        console.log('user ' + userId + 'page' + pageId + ' ' + websiteId + '  '+ widgetId);

        function init() {
            ctlr.widget = widgetService.findWidgetById(widgetId);
            ctlr.name = ctlr.widget.name;
            ctlr.text = ctlr.widget.text;
            if (ctlr.widget.widgetType === 'HEADING')
                ctlr.size = ctlr.widget.size;

            if (ctlr.widget.widgetType === 'IMAGE' || ctlr.widget.widgetType === 'YOUTUBE') {
                ctlr.url = ctlr.widget.url;
                ctlr.width = ctlr.widget.width;
            }
        }
        // Implementation of event handlers
        function getWidgetEditUrl() {
            var widget = widgetService.findWidgetById(widgetId);
            if (typeof widget !== 'undefined')
                return 'Views/Widget/Editors/widget-'+widget.widgetType.toLowerCase()+'-edit.view.client.html';

            return null;
        }

        function updateWidget(name, text, size, width, url) {
            var oldWidget = widgetService.findWidgetById(widgetId);

            var widget = {
                _id: widgetId,
                widgetType: oldWidget.widgetType,
                pageId: oldWidget.pageId,
                name: name
            };

            if (oldWidget.widgetType === 'HEADING') {
                widget.text = text;
                widget.size = size;
            }

            if (oldWidget.widgetType === 'IMAGE' || oldWidget.widgetType === 'YOUTUBE') {
                widget.url = url;
                widget.width = width;
            }
            widgetService.updateWidget(widgetId, widget);
            $location.url('/user/' + ctlr.userId + '/website/' + ctlr.websiteId + '/page/' +  ctlr.pageId + '/widget');
        }

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId);
            $location.url('/user/' + ctlr.userId + '/website/' + ctlr.websiteId + '/page/' +  ctlr.pageId + '/widget');
        }

    }
})();