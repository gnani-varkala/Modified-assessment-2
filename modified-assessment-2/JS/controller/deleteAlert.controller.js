(function() {
    'use strict';

    angular
        .module('paymentApp')
        .controller('deleteCtrl', deleteCtrl);

    deleteCtrl.$inject = ['$uibModalInstance','pushService','parent','index'];

    function deleteCtrl($uibModalInstance,pushService,parent,index) {
      var dc={};
      dc.parent = parent;
      dc.index =index;
      // deletes the data and closes the modal
      dc.deleteConform = function(){
        pushService.delete(dc.parent,dc.index);
        $uibModalInstance.dismiss('cancel');
      }
      //closes the model without deleting data
      dc.cancel = function(){
        $uibModalInstance.dismiss('cancel');
      }
      return dc;
    }
})();
