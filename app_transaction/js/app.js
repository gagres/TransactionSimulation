(function () {
  'use strict';

  angular
    .module('testApp', ['ui.router'])
    .config(setPagarmeKey)
    .run(runApp)

    function runApp(Product, $rootScope, $location) {
      $rootScope.$on('$stateChangeStart', function (event, toState, fromState){
        if((!Product.getFinalAmount() && toState.url === '/transaction') || fromState.url == "/transaction"){
          $location.url('/');
        }
      })
    }

    function setPagarmeKey(pagarme) {
      PagarMe.encryption_key = pagarme.myKey;
    }
})();
