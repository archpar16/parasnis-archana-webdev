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
            widgetService
                .findWidgetById(widgetId)
                .then(function (widget) {
                    ctlr.widget = widget;
                    ctlr.name = ctlr.widget.name;
                    ctlr.text = ctlr.widget.text;
                    if (ctlr.widget.widgetType === 'HEADING')
                        ctlr.size = ctlr.widget.size;

                    if (ctlr.widget.widgetType === 'IMAGE' || ctlr.widget.widgetType === 'YOUTUBE') {
                        ctlr.url = ctlr.widget.url;
                        ctlr.width = ctlr.widget.width;
                    }
                });

        }
        // Implementation of event handlers
        //todo: infinite loop  here
        function getWidgetEditUrl() {
            widgetService
                .findWidgetById(widgetId)
                .then(success, handleError);

            function success(widget) {
                console.log(widget);
                return 'Views/Widget/Editors/widget-'+widget.widgetType.toLowerCase()+'-edit.view.client.html';
            }

            function handleError() {
                return null;
            }
        }

        function updateWidget(name, text, size, width, url) {

            widgetService
                .findWidgetById(widgetId)
                .then(foundWidget);

            function foundWidget(widget) {
                var oldWidget = widget;

                var newWidget = {
                    _id: widgetId,
                    widgetType: oldWidget.widgetType,
                    pageId: oldWidget.pageId,
                    name: name
                };

                if (oldWidget.widgetType === 'HEADING') {
                    newWidget.text = text;
                    newWidget.size = size;
                }

                if (oldWidget.widgetType === 'IMAGE' || oldWidget.widgetType === 'YOUTUBE') {
                    newWidget.url = url;
                    newWidget.width = width;
                }
                widgetService
                    .updateWidget(widgetId, newWidget)
                    .then(function () {
                        $location.url('/user/' + ctlr.userId + '/website/' + ctlr.websiteId + '/page/' +  ctlr.pageId + '/widget');
                    });

            }

        }

        function deleteWidget(widgetId) {
            widgetService
                .deleteWidget(widgetId)
                .then(function () {
                    $location.url('/user/' + ctlr.userId + '/website/' + ctlr.websiteId + '/page/' +  ctlr.pageId + '/widget');
                });

        }

    }
})();