(function () {
  'use strict';

  angular
    .module('testApp')
    .config(routeConfig)

    function routeConfig($stateProvider, $urlRouterProvider){
      $stateProvider
        .state("home", {
          "url": "/",
          "templateUrl": "views/home.html",
          "controller": "homeCtrl",
          "controllerAs": "vm",
          "cache": false
        })
        .state("transaction", {
          "url": "/transaction",
          "templateUrl": "views/transaction.html",
          "controller": "transactionCtrl",
          "controllerAs": "vm",
          "cache": false
        })

      $urlRouterProvider.otherwise('/');
    }
})();
