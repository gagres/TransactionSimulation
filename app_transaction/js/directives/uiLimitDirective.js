(function () {
  'use strict';

  angular
    .module('testApp')
    .directive('uiLimit', uiLimit);

    function uiLimit(){
      return {
        restrict:"EA",
        templateUrl:"templates/uiLimit.html",
        transclude: true,
        scope:{
          "value": "=",
          "limit": "@",
          "type": "@"
        },
        link: function (scope, elem, attr) {
          elem.bind('keypress', function (e) {
            if(scope.value){
              if(scope.value.toString().length === scope.limit){
                e.preventDefault();
                return false;
              }
            }
          })
        }
      }
    }
})();
