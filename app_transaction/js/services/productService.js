(function () {
  'use strict';

  angular
    .module('testApp')
    .factory('Product', Product);

    function Product(products){
      var product = {}
      var amount = 0;
      var listProducts = [];

      // Normal functions
      product.clearList = clearList;
      product.getProducts = getProducts;
      product.addInList = addInList;
      product.removeFromList = removeFromList;
      product.getListProducts = getListProducts;
      product.setFinalAmount = setFinalAmount;
      product.getFinalAmount = getFinalAmount;


      function searchProduct(product){
        return listProducts.find( function (value){
          if(value){
            if(value.name === product.name){
                return value;
            }
          }
        })

      }

      function addInList(product){
        var finded = searchProduct(product);

        if(!finded)
          listProducts.push(product);

      }

      function removeFromList(product){
        var index, finded;
        finded = searchProduct(product);
        index = listProducts.indexOf(finded);

        if(!finded.qte){
          listProducts.splice(index, 1);
        }
      }

      function getListProducts(){
        return listProducts;
      }

      function setFinalAmount(a){
        amount = parseFloat(a.toFixed(2));
      }

      function getFinalAmount(a){
        return amount;
      }

      function getProducts(){
        return products;
      }

      function clearList(){
        product = {};
        amount = 0;
        listProducts = [];
      }

      return product;
    }
})();
