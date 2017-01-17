(function() {
    'use strict';

    angular
        .module('paymentApp')
        .controller('editCtrl', editCtrl);

    editCtrl.$inject = ['$uibModalInstance','pushService','saveShow','$uibModalStack'];

    function editCtrl($uibModalInstance,pushService,saveShow,$uibModalStack) {
      var ec={};
      ec.cancel=function(){
        $uibModalInstance.dismiss('cancel');
      }
      ec.conform=function(){
        //$uibModalStack.dismissAll('closing');
        pushService.modalVClose();
        $uibModalInstance.dismiss('cancel');
        saveShow=undefined;
      }
      return ec
      
    }
})();
