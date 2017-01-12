(function() {
    'use strict';

    angular
        .module('paymentApp')
        .controller('deleteCtrl', deleteCtrl);

    deleteCtrl.$inject = ['$uibModalInstance','pushService','parent','index'];

    function deleteCtrl($uibModalInstance,pushService,parent,index) {
      var dc=this;
      dc.parent = parent;
      dc.index =index;

      dc.deleteConform = function(){
        pushService.delete(dc.parent,dc.index);
        $uibModalInstance.dismiss('cancel');
      }
      dc.cancel = function(){
        $uibModalInstance.dismiss('cancel');
      }
    }
})();
