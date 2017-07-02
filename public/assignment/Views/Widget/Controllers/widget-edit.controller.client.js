(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController(widgetService, $routeParams, $location) {

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
        ctlr.updateWidget = updateWidget;
        ctlr.deleteWidget = deleteWidget;



        console.log('user ' + userId + 'page' + pageId + ' ' + websiteId + '  '+ widgetId);

        function init() {
            ctlr.sizeAll = [
                {name: "1", value: "1" },
                {name: "2", value: "2" },
                {name: "3", value: "3" },
                {name: "4", value: "4" },
                {name: "5", value: "5" },
                {name: "6", value: "6" }
            ];

            widgetService
                .findWidgetById(widgetId)
                .then(function (widget) {
                    ctlr.widget = widget;
                    ctlr.name = ctlr.widget.name;
                    ctlr.text = ctlr.widget.text;
                    if (ctlr.widget.widgetType === 'HEADING')
                        ctlr.size = ctlr.widget.size;

                    console.log('edit contl size - heading' +ctlr.size );
                    if (ctlr.widget.widgetType === 'IMAGE' || ctlr.widget.widgetType === 'YOUTUBE') {
                        ctlr.url = ctlr.widget.url;
                        ctlr.width = ctlr.widget.width;
                    }
                    ctlr.UrlEdit = 'Views/Widget/Editors/widget-' + ctlr.widget.widgetType.toLowerCase()+ '-edit.view.client.html';
                });

        }
        // Implementation of event handlers

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
                    console.log("updating size to" + size);
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

        function deleteWidget() {
            widgetService
                .deleteWidget(widgetId)
                .then(function () {
                    $location.url('/user/' + ctlr.userId + '/website/' + ctlr.websiteId + '/page/' +  ctlr.pageId + '/widget');
                });

        }

    }
})();