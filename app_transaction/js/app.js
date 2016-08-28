(function () {
  'use strict';

  angular
    .module('testApp', ['ui.router'])
    .config(setPagarmeKey)
    .run(runApp)

    function runApp(Product, $rootScope, $location) {
      $rootScope.$on('$stateChangeStart', function (event, toState, fromState){
        if(!Product.getFinalAmount() && toState.url === '/transaction' || fromState.url == "/transaction"){
          //$location.url('/');
        }
      })
    }

    function setPagarmeKey() {
      PagarMe.encryption_key = "ak_test_uq3iH2FtBlSokZuBqBp5C4E7LIajGg";
    }
})();
