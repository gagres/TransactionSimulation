(function () {
  'use strict';

  angular
    .module('testApp')
    .filter('coast', coast);

    function coast(){
      return function(input) {
        var newInput = null;
        if(input){
          input = input.toString();
          newInput = input.substring(0, input.length - 2) +"," +input.substring(input.length - 2);
        }else
          newInput = input;
        return newInput;
      }
    }
})();
