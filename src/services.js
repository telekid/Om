var app = angular.module('Om.services', [])
  .factory('pouchConnection', ['POUCHDB_CONFIG', function(POUCHDB_CONFIG) {
    
    var db = new PouchDB('om'),
        remote = POUCHDB_CONFIG.remote,
        opts = {
          continuous: true
        };

    db.replicate.to(remote, opts);
    db.replicate.from(remote, opts);
    
    return db;

  }])
  
  .factory('database', ['$q', '$rootScope', 'pouchConnection', function($q, $rootScope, pouchConnection) {

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
        pouchConnection.post(doc, callback);
        return deferred.promise;
      },
      remove: function(id) {
        var deferred = $q.defer();
        pouchConnection.get(id, function(err, doc) {
          $rootScope.$apply(function() {
            if (err) {
              deferred.reject(err);
            } else {
              pouchConnection.remove(doc, function(err, res) {
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
  }])

  .factory('pouchListener', ['$rootScope', 'pouchConnection', function($rootScope, pouchConnection) {
    pouchConnection.changes({
      continuous: true,
      onChange: function(change) {
        if (!change.deleted) {
          $rootScope.$apply(function() {
            pouchConnection.get(change.id, function(err, doc) {
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