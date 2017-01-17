(function () {
    'use strict';

    angular
        .module('paymentApp')
        .service('jsonService', jsonService);

    jsonService.$inject = ['$http','$q'];
    function jsonService($http,$q){
      this.paymentJson = function(url){
        var deferred = $q.defer();
        $http.get(url)
        .success(deferred.resolve)
        .error(deferred.reject);
        return deferred.promise;
      }
    }

})();
