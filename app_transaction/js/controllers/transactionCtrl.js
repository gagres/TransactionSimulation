(function () {
  'use strict';

  angular
    .module('testApp')
    .controller('transactionCtrl', transactionCtrl)
    transactionCtrl.$inject = ['$state', '$timeout', 'Product', 'Transaction'];

    function transactionCtrl($state, $timeout, Product, Transaction){
      var vm = this;
      var today = new Date();

      vm.card = {
        "number": null,
        "holder_name": null,
        "expiration_date": null,
        "cvv": null
      };
      //Minimum date
      vm.date = today.getFullYear() +"-"+ (today.getMonth() < 10 ? '0':'') + (today.getMonth() + 1) +"-0"+ (today.getDay() + 1);

      vm.field_errors = null;
      vm.informations_transaction = null;
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
      vm.changePayForm = changePayForm;
      vm.closeTransaction = closeTransaction;
      vm.confirmTransaction = confirmTransaction;

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

      function changePayForm(form){
        vm.payForm = form;
      }

      function closeTransaction(){
        $('#myModal').modal('hide');
        $timeout( function() {
          $state.go('home');
        }, 1000);
      }

      function confirmTransaction(card){
        var request = Transaction.makeTransaction(vm.payForm, card);
        request
          .then( function (data) {
            if(data.hasErrors){
                vm.field_errors = data.fieldErrors;
            }else
              successTransaction(data.data);

          }, function (err){
            console.log(err);
          })
      }

      function successTransaction(data){
        vm.informations_transaction = data;
        Product.clearList();
        $('#myModal').modal('show');
      }
    }
})();
