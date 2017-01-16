(function() {
    'use strict';

    angular
        .module('paymentApp')
        .controller('editCtrl', editCtrl);

    editCtrl.$inject = ['$uibModalInstance','pushService','saveShow'];

    function editCtrl($uibModalInstance,pushService,saveShow) {
      var ec={};
      ec.cancel=function(){
        $uibModalInstance.dismiss('cancel');
      }
      ec.conform=function(){
        pushService.modalVClose();
        $uibModalInstance.dismiss('cancel');
        saveShow=undefined;
      }
      return ec
      
    }
})();
