(function () {
  'use strict';

  angular
    .module('testApp')
    .service('Transaction', Transaction);

    Transaction.$inject = ['$http', '$q', 'Recipient', 'Product', 'pagarme']
    function Transaction($http, $q, Recipient, Product, pagarme){

      var Card = function Card(card){
        //Criando cartão
        var creditCard = new PagarMe.creditCard();
        creditCard.cardHolderName = card.holder_name;
        creditCard.cardExpirationMonth = card.expiration_month;
        creditCard.cardExpirationYear = card.expiration_year;
        creditCard.cardNumber = card.number;
        creditCard.cardCVV = card.cvv;

        this.creditCard = creditCard;
      }

      //Normal functions
      this.makeTransaction = makeTransaction;
      this.getAllTransactions = getAllTransactions;
      this.getTransaction = getTransaction;
      this.simulatePay = simulatePay;

      function makeTransaction(payForm, card){
        return $q( function (resolve, reject) {
          if(payForm === "billet")
            resolve(makeBilletTransaction());
          else
            resolve(makeCardTransaction(card));
        })
      }

      function getAllTransactions(){
        return requestGetTransaction();
      }

      function getTransaction(id) {
        return requestGetTransaction(id);
      }

      function simulatePay(id) {
        var request = $http({
          "url": "https://api.pagar.me/1/transactions/"+ id,
          "method": "PUT",
          "data": {
            "api_key": pagarme.myKey,
            "status": "paid"
          }
        })

        return request;
      }

      //Private Functions
      function makeBilletTransaction(){
        return requestPostTransaction("billet");
      }

      function makeCardTransaction(card){
        var dateTransaction = new Date(card.expiration_date);

        var cardTransaction = {
          "holder_name": card.holder_name,
          "expiration_month": dateTransaction.getMonth(),
          "expiration_year": dateTransaction.getFullYear(),
          "number": card.number,
          "cvv": card.cvv
        }
        var card = new Card(cardTransaction);

        var fieldErrors = card.creditCard.fieldErrors();
        var hasErrors = false;
        for(var field in fieldErrors) { hasErrors = true; break; }

        if(hasErrors)
          return {"hasErrors": hasErrors, "fieldErrors": fieldErrors};
        else{
          card.creditCard.generateHash( function (cardHash) {
            return requestPostTransaction(payForm, cardHash);
          })
        }
      }

      function requestPostTransaction(payForm, card) {
        var request = $http({
          "url": "http://localhost/TransactionSimulation/server_transaction/makeTransactions.php",
          "method": "POST",
          "data": {
            "payForm": payForm,
            "amount": parseInt(Product.getFinalAmount().toString().replace(".", "") + "0"),
            "card_hash": card ? card: null,
            "recipients": Recipient.getListRecipients()
          }
        })

        return request;
      }

      function requestGetTransaction(id) {
        var info = {
          "url": "http://localhost/TransactionSimulation/server_transaction/getTransactions.php",
          "method": "GET"
        }
        if(id){
          info.method = "POST";
          info.data = {"id": id};
        }

        var request = $http(info);

        return request;
      }
    }
})();
