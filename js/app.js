(function () {
  'use strict';

  angular
    .module('testApp', [])
    .config(setPagarmeKey)

    function setPagarmeKey(){
      PagarMe.encryption_key = "ak_test_uq3iH2FtBlSokZuBqBp5C4E7LIajGg";
    }
})();
