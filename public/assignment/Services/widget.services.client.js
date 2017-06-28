(function () {
    angular
        .module('WebAppMaker')
        .factory('widgetService', widgetService);

    function widgetService($http) {

        return {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sortWidgets: sortWidgets
        };


        function createWidget(pageId, widget) {
            var url = '/api/page/' + pageId + '/widget';
            return $http.post(url, widget)
                .then(function (response) {
                        return response.data;
                    }
                );
        }


        function updateWidget(widgetId, widget) {
            var url = '/api/widget/' + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                        return response.data;
                    }
                );
           }

        function deleteWidget(widgetId) {
            var url = '/api/widget/' + widgetId;
            return $http.delete(url)
                .then(function (response) {
                        return response.data;
                    }
                );
        }


        function findWidgetsByPageId(pageId) {
            var url = '/api/page/' + pageId + '/widget';
            return $http.get(url)
                .then(function (response) {
                        return response.data;
                    }
                );
            }


        function findWidgetById(widgetId) {
            var url = '/api/widget/' + widgetId;
            return $http.get(url)
                .then(function (response) {
                        return response.data;
                    }
                );
        }
        function sortWidgets(pageId, start, stop) {
            var url = '/page/' + pageId + '/widget?initial=' + start + '&final=' + stop;
            return $http.post(url)
                .then(function (response) {
                        return response.data;
                    }
                );
        }
    }
})();