app.controller('MainController', ['$scope', '$log', 'listener', 'pouchWrapper', function($scope, $log, listener, pouchWrapper) {

  $scope.$log = $log;

  $scope.submit = function() {
    pouchWrapper.add($scope.newItem).then(function(res) {
      $scope.newItem.action = '';
      $scope.newItem.quantity = '';
    }, function(reason) {
      console.log(reason);
    })
  };

  $scope.remove = function(id) {
    pouchWrapper.remove(id).then(function(res) {
    }, function(reason) {
      console.log(reason);
    })
  };

	$scope.items = [];

  $scope.$on('newItem', function(event, item) {
    $scope.items.push(item);

  });

  $scope.$on('delItem', function(event, id) {
    for (var i = 0; i<$scope.items.length; i++) {
      if ($scope.items[i]._id === id) {
        $scope.items.splice(i,1);
      }
    }
  });

}]);

