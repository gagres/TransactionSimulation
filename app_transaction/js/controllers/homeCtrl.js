(function () {
  'use strict';

  angular
    .module('testApp')
    .controller('homeCtrl', homeCtrl)
    homeCtrl.$inject = ['$state', 'Product'];

    function homeCtrl($state, Product){
      var vm = this;
      vm.amount = Product.getFinalAmount();
      vm.products = Product.getProducts();

      //Normal functions
      vm.increaseAmount = increaseAmount;
      vm.nextStep = nextStep;

      function modifyProduct(product, qte){
        Product.setFinalAmount(vm.amount);

        if(qte === 1)
          Product.addInList(product);
        else
          Product.removeFromList(product);
      }

      function increaseAmount(product, qte){
        if(product.qte == 0 && parseInt(qte) < 0){
          //Do nothing
        }else{
          if(product.qte >= 0){
            vm.amount += product.price * qte;
            vm.amount = parseFloat(vm.amount.toFixed(2));
            product.qte += parseInt(qte);

            modifyProduct(product, qte)
          }
        }
      }

      function nextStep(amount){
        if(amount)
          $state.go('transaction', {data: amount});
      }
    }
})();
