(function() {
    'use strict';

    angular
        .module('paymentApp')
        .controller('paymentParameterCtrl', paymentParameterCtrl);

    paymentParameterCtrl.$inject = ['pushService'];

    function paymentParameterCtrl(pushService) {
      var ppc = {};
      ppc.pDetails = {"chargeAmountBasis":''};
      var keys = Object.keys(pushService.pushDetails)
      console.log(keys);
      ppc.pDetails=(keys.length == 0)?pDetails:pushService.pushDetails;

       ppc.editPDetails=pushService.editInModal();

      if(ppc.editPDetails.saveShow == false){
        
        ppc.pDetails=ppc.editPDetails.details;
      }

      ppc.selectOption=function(key,value){
        ppc.pDetails[key] = value;
      }
      pushService.getData(ppc.pDetails);

      return ppc;

    }
})();
