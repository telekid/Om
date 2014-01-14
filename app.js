var app = angular.module('MyTutorialApp',[]);

app.factory('myPouch', [function() {

  var mydb = new PouchDB('ng-pouch');
  PouchDB.replicate('ng-pouch', 'http://jakezerrer.iriscouch.com/cables', {continuous: true});
  PouchDB.replicate('http://jakezerrer.iriscouch.com/cables', 'ng-pouch', {continuous: true});
  return mydb;

}]);

app.factory('pouchWrapper', ['$q', '$rootScope', 'myPouch', function($q, $rootScope, myPouch) {

  return {
    add: function(text) {
      var deferred = $q.defer();
      var doc = {
        type: 'item',
        text: text
      };
      myPouch.post(doc, function(err, res) {
        $rootScope.$apply(function() {
          if (err) {
            deferred.reject(err)
          } else {
            deferred.resolve(res)
          }
        });
      });
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

app.factory('listener', ['$rootScope', 'myPouch', function($rootScope, myPouch) {

  myPouch.changes({
    continuous: true,
    onChange: function(change) {
      if (!change.deleted) {
        $rootScope.$apply(function() {
          myPouch.get(change.id, function(err, doc) {
            $rootScope.$apply(function() {
              if (err) console.log(err);
              $rootScope.$broadcast('newItem', doc);
            })
          });
        })
      } else {
        $rootScope.$apply(function() {
          $rootScope.$broadcast('delItem', change.id);
        });
      }
    }
  })
}]);