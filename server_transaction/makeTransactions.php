<?php

  include_once ('pagarme-php/Pagarme.php');

  Pagarme::setApiKey('ak_test_uq3iH2FtBlSokZuBqBp5C4E7LIajGg');

  $request = json_decode(file_get_contents('php://input'), true);
  echo makeTransaction($request);

  function makeTransaction($request){
    $transactionValues = array(
      'amount' => $request['amount'],
      'payment_method' => $request['payForm'] == 'billet' ? 'boleto' : 'credit_card',
      'split_rules' => array(
        array(
            'recipient_id' => $request['recipients'][0],
            'charge_processing_fee' => true,
            'liable' => true,
            'percentage' => '20',
        ),
        array(
            'recipient_id' => $request['recipients'][1],
            'charge_processing_fee' => true,
            'liable' => true,
            'percentage' => '80',
        )
      )
    );

    if($request['card_hash'] != null)
      $transactionValues['card_hash'] = $request['card_hash'];

    $transaction = new PagarMe_Transaction($transactionValues);
    $transaction -> charge();

    return $transaction;
  }

?>
