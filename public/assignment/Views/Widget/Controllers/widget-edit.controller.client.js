(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController(widgetService, $routeParams, $location) {

        var ctlr = this;

        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];
        var widgetId = $routeParams['wgid'];

        ctlr.websiteId = websiteId;
        ctlr.pageId = pageId;
        ctlr.widgetId = widgetId;

        init();

        // event handlers
        ctlr.updateImageYoutubeWidget = updateImageYoutubeWidget;
        ctlr.updateTextInputWidget = updateTextInputWidget;
        ctlr.updateHeadingWidget = updateHeadingWidget;
        ctlr.deleteWidget = deleteWidget;
        ctlr.updateHtmlWidget = updateHtmlWidget;

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
                    console.log('widget = in edit ctlr ' + widget._id + widget.widgetType);
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
        function updateImageYoutubeWidget(name, text, width, url) {
            var widgetId = $routeParams['wgid'];
            widgetService
                .findWidgetById(widgetId)
                .then(foundWidget);

            function foundWidget(widget) {
                var newWidget = {
                    _id: widgetId,
                    widgetType: widget.widgetType,
                    text: text,
                    url: url,
                    width: width,
                    name: name
                };

                widgetService
                    .updateWidget(widgetId, newWidget)
                    .then(function () {
                        $location.url('/user/website/' + ctlr.websiteId + '/page/' +  ctlr.pageId + '/widget');
                    });
            }
        }

        function updateHtmlWidget(text) {
            var widgetId = $routeParams['wgid'];
            console.log('text =' + text);
            widgetService
                .findWidgetById(widgetId)
                .then(foundWidget);

            function foundWidget(widget) {
                var newWidget = {
                    _id: widgetId,
                    widgetType: widget.widgetType,
                    text: text
                };

                widgetService
                    .updateWidget(widgetId, newWidget)
                    .then(function () {
                        $location.url('/user/website/' + ctlr.websiteId + '/page/' +  ctlr.pageId + '/widget');
                    });
            }
        }

        function updateHeadingWidget(name, text, size) {
            var widgetId = $routeParams['wgid'];
            widgetService
                .findWidgetById(widgetId)
                .then(foundWidget);

            function foundWidget(widget) {
                var newWidget = {
                    _id: widgetId,
                    widgetType: widget.widgetType,
                    text: text,
                    size: size,
                    name: name
                };

                console.log("updating size to" + size);

                widgetService
                    .updateWidget(widgetId, newWidget)
                    .then(function () {
                        $location.url('/user/website/' + ctlr.websiteId + '/page/' + ctlr.pageId + '/widget');
                    });
            }
        }

        function updateTextInputWidget(text, rows, placeholder, formatted) {
            var widgetId = $routeParams['wgid'];
            widgetService
                .findWidgetById(widgetId)
                .then(foundWidget);

            function foundWidget(widget) {
                var newWidget = {
                    _id: widgetId,
                    widgetType: widget.widgetType,
                    text: text,
                    rows: rows,
                    placeholder: placeholder,
                    formatted: formatted
                };

                widgetService
                    .updateWidget(widgetId, newWidget)
                    .then(function () {
                        $location.url('/user/website/' + ctlr.websiteId + '/page/' +  ctlr.pageId + '/widget');
                    });

            }
        }

        function deleteWidget() {
            widgetService
                .deleteWidget(widgetId)
                .then(function () {
                    $location.url('/user/website/' + ctlr.websiteId + '/page/' +  ctlr.pageId + '/widget');
                });
        }
    }
})();