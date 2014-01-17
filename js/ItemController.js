app.controller('ItemController', ['$scope', '$log', 'listener', 'pouchWrapper', function($scope, $log, listener, pouchWrapper) {

  $scope.$log = $log;

	$scope.items = [];

  $scope.submit = function() {
    var newItem = {
      type: 'item',
      make: $scope.newItem.make,
      model: $scope.newItem.model,
    };
    
    pouchWrapper.add(newItem).then(function(res) {
      // Clear newitems
      $scope.newItem.make = '';
      $scope.newItem.model = '';
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

