(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce, widgetService, $routeParams) {

        var ctlr = this;

        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];

        ctlr.websiteId = websiteId;
        ctlr.pageId = pageId;

        init();

        // event handlers
        ctlr.trustThisContent = trustThisContent;
        ctlr.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        ctlr.getWidgetUrlForType = getWidgetUrlForType;

        function init() {
            widgetService
                .findWidgetsByPageId(pageId)
                .then(function (widgets) {
                    ctlr.widgets = widgets;
                });
        }

        // implement event handlers
        function getWidgetUrlForType(type) {
                return 'Views/Widget/Templates/widget-'+type.toLowerCase()+'.view.client.html';
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            //console.log(embedUrl);
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trustThisContent(html) {
            // diligence to scrub any unsafe content
            return $sce.trustAsHtml(html);
        }

    }
})();