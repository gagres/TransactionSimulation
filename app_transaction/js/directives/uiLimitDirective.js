(function () {
  'use strict';

  angular
    .module('testApp')
    .directive('uiLimit', uiLimit);

    function uiLimit(){
      return {
        restrict:"A",
        scope:{
          "limit": "@"
        },
        require: "ngModel",
        link: function (scope, elem, attr, ctrl) {

          function formatValue(value){
            return value.substring(0, scope.limit);
          }

          elem.bind("keyup", function (e) {
              ctrl.$setViewValue( formatValue (ctrl.$viewValue));
              ctrl.$render();
          })
        }
      }
    }
})();
