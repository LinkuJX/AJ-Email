angular
    .module('EmailApp', ['ui.toggle'])
    // directive to run after other controller directives so jquery code can act on the rendered html elements
    .directive('initMasks', function () {
        return function (scope, element, attrs) {
            setTimeout(function doWork() {
                // jquery code here for masks and other html elements stuff
                $('.money-input').each(function (index) {
                    $(this).inputmask("9999");
                });
            }, 0);
        };
    });
