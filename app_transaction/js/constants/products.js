(function () {
  'use strict';

  angular
    .module('testApp')
    .constant('Products', [
      {'url':'img/jogo_battle_front.jpg', 'name': 'Jogo Xbox One Star Wars Battlefront Dice', 'price': 89.90, 'qte': 0},
      {'url':'img/jogo_farcry-4.jpg', 'name': 'Jogo Far Cry 4 - Xbox One', 'price': 34.90, 'qte': 0},
      {'url':'img/jogo_fifa.jpg', 'name': 'Jogo para PS4 FIFA 16 Electronic Arts', 'price': 129.90, 'qte': 0},
      {'url':'img/jogo_god-of-war.jpg', 'name': 'Jogo PS3 God of War Ascension', 'price': 39.90, 'qte': 0}
    ])
})();
