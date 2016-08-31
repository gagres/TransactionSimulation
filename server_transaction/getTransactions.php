<?php
  require("pagarme-php/Pagarme.php");

  Pagarme::setApiKey('ak_test_uq3iH2FtBlSokZuBqBp5C4E7LIajGg');

  $request = json_decode(file_get_contents('php://input'), true);

  if($request == null)
    getAllTransactions();
  else
    getTransaction($request['id']);

  function getAllTransactions() {
    $transactions = PagarMe_Transaction::all();
    $response = array();

    for($i = 0; $i < count($transactions); $i++){
      $response[$i] = array(
        'id' => $transactions[$i]['id'],
        'status' => $transactions[$i]['status'],
        'payment_method' => $transactions[$i]['payment_method'],
        'date_created' => $transactions[$i]['date_created'],
        'cost' => $transactions[$i]['cost'],
        'amount' => $transactions[$i]['amount'],
        'installments' => $transactions[$i]['installments'],
        'split_rules' => $transactions[$i]['split_rules']
      );
    }

    echo json_encode($response);
  }

  function getTransaction($id) {
    $transaction = PagarMe_Transaction::findById($id);

    echo $transaction;
  }


?>
