(function () {
  'use strict';

  angular
    .module('testApp')
    .controller('shoppingCtrl', shoppingCtrl)
    shoppingCtrl.$inject = ['Transaction'];

    function shoppingCtrl(Transaction) {
      var vm = this;
      vm.listTransactions = null;
      vm.transaction = null;

      initListTransactions();
      function initListTransactions(){
        var request = Transaction.getAllTransactions();
        request
          .then( function (data) {
            vm.listTransactions = data.data;
          }, function (err) {
            console.log(err);
          })
      }

      //Normal functions
      vm.clearTransaction = clearTransaction;
      vm.getTransaction = getTransaction;
      vm.simulatePay = simulatePay;

      function clearTransaction(){
        vm.transaction = null;
      }

      function getTransaction(id) {
        var request = Transaction.getTransaction(id);
        request
          .then( function (data) {
            vm.transaction = data.data;
            vm.transaction.payValues = createPayValue(vm.transaction.amount, vm.transaction.split_rules);

            $('#myModal').modal();
          }, function (err) {
            console.log(err);
          })
      }

      function createPayValue(amount, split_rules) {
        var aux, payValue = [];
        if(split_rules) {
          for(var i = 0; i < split_rules.length; i++){
            aux = ((amount / 100) / 100) * split_rules[i].percentage;
            aux = parseFloat(aux.toFixed(2));
            payValue.push(aux);
          }
        }else
          payValue.push(amount / 100);

        return payValue;
      }

      function simulatePay(transaction){
        var request = Transaction.simulatePay(transaction.id);
        request
          .then( function (data) {
            transaction.status = "paid";
          }, function (err) {
            console.log(err);
          })
      }
    }
})();
