var app = angular.module('Om',['ui.bootstrap']);

app.factory('myPouch', ['POUCHDB_CONFIG', function(POUCHDB_CONFIG) {
  
  var db = new PouchDB('om'),
      remote = POUCHDB_CONFIG.remote,
      opts = {
        continuous: true
      };

  db.replicate.to(remote, opts);
  db.replicate.from(remote, opts);
  
  return db;

}]);

app.factory('pouchWrapper', ['$q', '$rootScope', 'myPouch', function($q, $rootScope, myPouch) {

  return {
    add: function(doc, type) {
      var deferred = $q.defer();

      var callback = function(err, res) {
        $rootScope.$apply(function() {
          if (err) {
            deferred.reject(err)
          } else {
            deferred.resolve(res)
          }
        });
      }
      
      doc.type = type;
      myPouch.post(doc, callback);
      return deferred.promise;
    },
    remove: function(id) {
      var deferred = $q.defer();
      myPouch.get(id, function(err, doc) {
        $rootScope.$apply(function() {
          if (err) {
            deferred.reject(err);
          } else {
            myPouch.remove(doc, function(err, res) {
              $rootScope.$apply(function() {
                if (err) {
                  deferred.reject(err)
                } else {
                  deferred.resolve(res)
                }
              });
            });
          }
        });
      });
      return deferred.promise;
    }
  }

}]);

app.factory('itemsShare', ['$rootScope', '$q', function($rootScope, $q) {
  var itemsShare = [];
  
  var getItems = function() {
    return itemsShare;
  }
  var addItem = function(item) {
    itemsShare.push(item);
    $rootScope.$broadcast('newItem');
  }
  var delItem = function(id) {
    for (var i = 0; i < itemsShare.length; i++) {
      if (itemsShare[i].id === id) {
        itemsShare.splice(i,1);
      }
    }
  }
  
  return {
    getItems: getItems,
    addItem: addItem,
    delItem: delItem
  };
}]);

app.factory('listener', ['$rootScope', 'myPouch', function($rootScope, myPouch) {

  myPouch.changes({
    continuous: true,
    onChange: function(change) {
      if (!change.deleted) {
        $rootScope.$apply(function() {
          myPouch.get(change.id, function(err, doc) {
            $rootScope.$apply(function() {
              if (err) console.log(err);
              $rootScope.$broadcast('newDoc', doc);
              
            })
          });
        })
      } else {
        $rootScope.$apply(function() {
          $rootScope.$broadcast('delDoc', change.id);
        });
      }
    }
  })
}]);

app.filter('ctrlCode', function () {
    return function(input) {
        if ((input + 1) <= 9) {
            return String.fromCharCode(8963) + " " + (input + 1);
        }
    }
});

app.directive('dateDisplay', function () {
    return {
        restrict: 'A',
        template: '{{formattedTimestamp}}',
        scope: {
            timestamp: '='
        },
        link: function (scope, elem, attrs) {
            var date = new Date(scope.timestamp);
            scope.formattedTimestamp = date.getHours() + ":" + date.getMinutes();
            scope.for
            console.log(hours);
        }
        
    }
});