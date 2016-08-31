( function() {
  'use strict';

  angular
    .module('testApp')
    .factory('Bank', Bank)

    function Bank($http, pagarme, Recipient){
      var bank = {};
      var accounts = [];

      //Normal functions
      bank.pushBankAccounts = pushBankAccounts;

      function pushBankAccounts() {
        var request = $http({
          'url': 'https://api.pagar.me/1/bank_accounts?api_key='+pagarme.myKey,
          'method': 'GET'
        });
        request
          .then(function (data) {
            //Verificando se ja existem contas bancárias
            if(data.data){
                data.data.forEach( function (bankAccount) {
                  accounts.push(bankAccount.id);
                })
                Recipient.pushRecipientsAccounts(accounts, $http);
            }
          }, function (err) {
            console.log(err);
          })
      }

      return bank;
    }
})();
