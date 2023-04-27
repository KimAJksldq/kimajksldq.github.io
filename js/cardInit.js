angular
  .module('starter', ['ionic', 'ionic.contrib.ui.tinderCards'])

  .directive('noScroll', function ($document) {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attr) {
        $document.on('touchmove', function (e) {
          e.preventDefault();
        });
      },
    };
  })

  .controller('CardsCtrl', function ($scope, TDCardDelegate) {
    console.log('CARDS CTRL');
    var cardTypes = [
      {
        image: './img/gallery/not_rabbit.png',
      },
      {
        image: './img/gallery/instar_toon.png',
      },
    ];

    $scope.cards = Array.prototype.slice.call(cardTypes, 0);

    $scope.cardDestroyed = function (index) {
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function () {
      var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      newCard.id = Math.random();
      $scope.cards.push(angular.extend({}, newCard));
    };
  })

  .controller('CardCtrl', function ($scope, TDCardDelegate) {
    $scope.cardSwipedLeft = function (index) {
      console.log('LEFT SWIPE');
      $scope.addCard();
    };
    $scope.cardSwipedRight = function (index) {
      console.log('RIGHT SWIPE');
      $scope.addCard();
    };
  });
