(function() {
    'use strict';

    angular
        .module('paymentApp')
        .controller('paymentParameterCtrl', paymentParameterCtrl);

    paymentParameterCtrl.$inject = ['pushService'];

    function paymentParameterCtrl(pushService) {
      var ppc = {};
      ppc.pDetails = {"chargeAmountBasis":''};
      // calculating the number of keys in pushDetails
      var keys = Object.keys(pushService.pushDetails);
      ppc.pDetails=(keys.length == 0)?pDetails:pushService.pushDetails;
      //service to get details of the data to be editted
      ppc.editPDetails=pushService.editInModal();
      //if the model is a edit model then assign all the input fields with the respective data to be editted
      if(ppc.editPDetails.saveShow == false){
        ppc.pDetails=ppc.editPDetails.details;
      }
      //service to store all the data from input field which is used for communication between two models
      pushService.getData(ppc.pDetails);

      return ppc;

    }
})();
