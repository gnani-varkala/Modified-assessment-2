(function () {
    'use strict';

    angular
        .module('paymentApp')
        .directive('dropDownDir',function(){
          return {
            restrict: 'E',
            scope: {
              data: '=',
              select:'='
            },
            templateUrl:'VIEW/dropdown.directive.html' ,
            link : function(scope){
              scope.selectOption = function(list){
              scope.select = list;
              }
            }

          };
        })

})();
