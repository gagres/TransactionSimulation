(function () {
  'use strict';

  angular
    .module('testApp')
    .controller('transactionCtrl', transactionCtrl)
    transactionCtrl.$inject = ['Products', '$http'];

    function transactionCtrl(Products, $http){
      var vm = this;
      vm.field_errors = null;
      vm.amount = 0;
      vm.card = {
        "number": null,
        "holder_name": null,
        "expiration_date": null,
        "cvv": null
      };
      vm.products = Products;

      vm.confirmTransaction = confirmTransaction;
      vm.increaseAmount = increaseAmount;

      function confirmTransaction(card){
        if(card.hasOwnProperty('expiration_month'))
          console.log(new Date(card.expiration_month).getMonth(), new Date(card.expiration_month).getFullYear());

        console.log(card);
        var request = $http({
          "url": 'http://localhost/Pagar.me/php/index.php',
          "method": "GET"
        })
        request
          .then(function (data) {
            console.log(data);
          }, function (err) {
            console.log(err);
          })
      }

      function increaseAmount(product, qte){
        if(product.qte == 0 && parseInt(qte) < 0){
          //Do nothing
        }else{
          if(product.qte >= 0){
            vm.amount += product.price * parseFloat(qte);
            vm.amount = parseFloat(vm.amount.toFixed(2));
            product.qte += parseInt(qte);
          }
        }
      }
    }
})();
