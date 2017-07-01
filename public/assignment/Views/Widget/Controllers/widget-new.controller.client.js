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

        // ctlr.sizeAll = [
        //     {'name': 'h1', 'value': '1'},
        //     {'name': 'h2', 'value': '2'},
        //     {'name': 'h3', 'value': '3'},
        //     {'name': 'h4', 'value': '4'},
        //     {'name': 'h5', 'value': '5'},
        //     {'name': 'h6', 'value': '6'}
        //     ];

        // availableOptions: [
        //     {id: '1', name: 'Option A'},
        //     {id: '2', name: 'Option B'},
        //     {id: '3', name: 'Option C'}
        // ]
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
                _id: ctlr.widgetId,
                widgetType: type,
                pageId: ctlr.pageId,
                name: name,
                text: text
            };

            if (type === 'HEADING') {
                console.log("creating size to " + size + " " + ctlr.size.value);
                widget.text = text;
                widget.size = size;
            }

            if (type === 'IMAGE' || type === 'YOUTUBE') {
                widget.url = url;
                widget.width = width;
            }


            widgetService
                .createWidget(ctlr.pageId, widget)
                .then(function () {
                    $location.url('/user/' + ctlr.userId + '/website/' + ctlr.websiteId
                        + '/page/' +  ctlr.pageId + '/widget');
                });

        }
    }
})();