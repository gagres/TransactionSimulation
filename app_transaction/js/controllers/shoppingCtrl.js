(function () {
  'use strict';

  angular
    .module('testApp')
    .controller('shoppingCtrl', shoppingCtrl)
    shoppingCtrl.$inject = ['Transaction'];

    function shoppingCtrl(Transaction) {
      var vm = this;
      vm.listTransactions = null;
      vm.transaction = {};

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
        vm.transaction = {};
      }

      function getTransaction(id) {
        getPayables(id);

        var request = Transaction.getTransaction(id);
        request
          .then( function (data) {
            vm.transaction.data = data.data;

            $('#myModal').modal();
          }, function (err) {
            console.log(err);
          })
      }

      function getPayables(id){
        var request = Transaction.getPayables(id);

        request
          .then( function(data) {
            vm.transaction.payables = data.data;

          }, function (err) {
            console.log(err);
          })
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
