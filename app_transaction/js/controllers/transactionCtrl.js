(function () {
  'use strict';

  angular
    .module('testApp')
    .controller('transactionCtrl', transactionCtrl)
    transactionCtrl.$inject = ['Product', '$http'];

    function transactionCtrl(Product, $http){
      var vm = this;
      vm.field_errors = null;
      vm.card = {
        "number": null,
        "holder_name": null,
        "expiration_date": null,
        "cvv": null
      };
      vm.payForm = null;
      vm.listProducts = Product.getListProducts();
      vm.amount = Product.getFinalAmount();

      // Essential functions
      initProducts();
      function initProducts(){
          for(var i = 0; i < vm.listProducts.length; i++){
            vm.listProducts[i].total = parseFloat((vm.listProducts[i].price * vm.listProducts[i].qte).toFixed(2));
          }
      }

      //Normal functions
      vm.increaseAmount = increaseAmount;
      vm.confirmTransaction = confirmTransaction;
      vm.changePayForm = changePayForm;

      function increaseAmount(product, qte){
        product.qte += qte;
        product.total += product.price * qte;
        product.total = parseFloat(product.total.toFixed(2));

        if(qte > 0)
          Product.addInList(product);
        else
          Product.removeFromList(product);

        vm.amount += product.price * qte;
        vm.amount = parseFloat(vm.amount.toFixed(2));
        Product.setFinalAmount(vm.amount);
      }

      function confirmTransaction(card){
        if(card.hasOwnProperty('expiration_month'))
          console.log(new Date(card.expiration_month).getMonth(), new Date(card.expiration_month).getFullYear());

        var request = $http({
          "url": 'http://localhost/Pagar.me/server_transaction/index.php',
          "method": "POST"
        })
        request
          .then(function (data) {
            console.log(data.data);
          }, function (err) {
            console.log(err);
          })
      }

      function changePayForm(form){
        vm.payForm = form;
      }
    }
})();
