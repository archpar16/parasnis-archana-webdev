(function () {
    angular
        .module('DirectiveLecture', [])
        .directive('hello', helloTag)
        .directive('wdDraggable', wdDraggable);
    
    function wdDraggable() {

        function linkFunction(scope, element) {
            $(element).sortable({
                start: function (event, ui) {
                    start = $(ui.item).index();
                },
                update: function (event, ui) {
                    stop = $(ui.item).index();
                    console.log(start + " =>" + stop);
                    //scope.wamSortableController.sort(start,stop);
                }
            });
        }

        return {
            link: linkFunction
        }
    }
    
    function helloTag() {
        
        function linkFunction(scope, element, attrs) {
            console.log(element);
            element.html('goodbye');
        }
        
        return {
            templateUrl: 'hello.html',
            link: linkFunction
        }
    }
})();