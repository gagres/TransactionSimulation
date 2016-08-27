(function () {
  'use strict';

  angular
    .module('testApp')
    .config(routeConfig)

    function routeConfig($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('home', {
          "url": "/",
          "templateUrl": "views/home.html",
          "controller": "transactionCtrl",
          "controllerAs": "vm"
        })

      $urlRouterProvider.otherwise('/');
    }
})();
