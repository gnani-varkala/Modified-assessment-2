(function () {
    'use strict';

    angular
        .module('angular_app')
        .directive('dropDownDir',function(){
          return {
            restrict: 'E',
            scope: {
              data: '=',
              delete: '&delete'
            },
            template:'<button class="btn btn-link" style="margin-left:90%" ng-click = "delete(data)">X</button>' ,

          };
        })

})();
