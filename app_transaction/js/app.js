(function () {
  'use strict';

  angular
    .module('testApp', ['ui.router'])
    .config(setPagarmeKey)
    .run(runApp)

    function runApp(Product, Bank, $rootScope, $location) {
      $rootScope.$on('$stateChangeStart', function (event, toState, fromState){
        if((!Product.getFinalAmount() && toState.url === '/transaction') || fromState.url == "/transaction"){
          $location.url('/');
        }
      })

      //Inicializando contas bancarias
      Bank.pushBankAccounts();
    }

    function setPagarmeKey(pagarme) {
      PagarMe.encryption_key = pagarme.myKey;
    }
})();
