( function () {
  'use strict';

  angular
    .module('testApp')
    .factory('Recipient', Recipient);

    function Recipient(pagarme){
      var recipient = {};
      var listRecipients = [];

      //Normal functions
      recipient.getListRecipients = getListRecipients;
      recipient.pushRecipientsAccounts = pushRecipientsAccounts;

      function getListRecipients(){
        return listRecipients;
      }

      function pushRecipientsAccounts(accounts, http){
        var request = http({
          'url': 'https://api.pagar.me/1/recipients?api_key='+pagarme.myKey,
          'method': 'GET'
        });
        request
          .then(function (data) {
            //Verificando se ja existem contas recipients
            if(data.data){
              data.data.forEach( function (recipientAccount) {
                listRecipients.push(recipientAccount.id);
              })
            }
          }, function (err) {
            console.log(err);
          })
      }

      return recipient;
    }
})();
