(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce, widgetService, $routeParams) {

        var ctlr = this;

        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];
        ctlr.userId = userId;
        ctlr.websiteId = websiteId;
        ctlr.pageId = pageId;
        console.log('iser ' + userId + 'page' + pageId + ' ' + websiteId);

        init();
        ctlr.trustThisContent = trustThisContent;
        ctlr.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        ctlr.getWidgetUrlForType = getWidgetUrlForType;
        // ctlr.getWidgetEditUrlForType = getWidgetEditUrlForType;

        function init() {
            ctlr.widgets = widgetService.findWidgetsByPageId(pageId);
        }
        function getWidgetUrlForType(type, op) {
            if (op === "list")
                return 'Views/Widget/Template/widget-'+type.toLowerCase()+'.view.client.html';
            else
                return 'Views/Widget/Template/widget-'+type.toLowerCase()+'-edit.view.client.html';

        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            console.log(embedUrl);
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trustThisContent(html) {
            // diligence to scrub any unsafe content
            return $sce.trustAsHtml(html);
        }

        // function getWidgetEditUrlForType(type) {
        //     return 'Views/Widget/Template/widget-'+type.toLowerCase()+'-edit.view.client.html';
        // }
    }
})();