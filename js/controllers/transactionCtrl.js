(function () {
  'use strict';

  angular
    .module('testApp')
    .controller('transactionCtrl', transactionCtrl)
    transactionCtrl.$inject = [];

    function transactionCtrl(){
      var vm = this;

      vm.field_errors = "Não foi possível fazer isso";
      vm.card = {
        "number": null,
        "holder_name": null,
        "expiration_date": null,
        "cvv": null
      };
      vm.products = [
        {'url':'img/feijao.jpg', 'name': 'Feijao', 'price': 14},
        {'url':'img/arroz.jpg', 'name': 'Arroz', 'price': 6},
        {'url':'img/cheetos.jpg', 'name': 'Salgadinho Cheetos', 'price': 3},
        {'url':'img/friboi.jpg', 'name': 'Carne Friboi', 'price': 8.75}
      ]

      vm.confirmTransaction = confirmTransaction;

      function confirmTransaction(card){
        if(card.hasOwnProperty('expiration_month'))
          console.log(new Date(card.expiration_month).getMonth(), new Date(card.expiration_month).getFullYear());

        console.log(card);
      }
    }
})();
