(function () {
    angular
        .module('WebAppMaker')
        .factory('pageService', pageService);

    function pageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        return {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);
        }


        function updatePage(pageId, page) {
            var oldPage = findPageById(pageId);
            var index = pages.indexOf(oldPage);
            deletePage(pageId);
            pages.splice(index, 0, page);
        }

        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }
        
        function findPageByWebsiteId(websiteId) {
            var result = [];

            for (var p in pages){
                if(pages[p].websiteId === websiteId) {
                    result.push(pages[p]);
                }
            }
            return result;
        }


        function findPageById(pageID) {
            return pages.find(function (page) {
                return page._id === pageID;
            });
        }
    }
})();