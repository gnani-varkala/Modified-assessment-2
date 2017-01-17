(function() {
    'use strict';

    angular
        .module('paymentApp')
        .controller('paymentInformationCtrl', paymentInformationCtrl);

    paymentInformationCtrl.$inject = ['pushService'];

    function paymentInformationCtrl(pushService) {
      var pic = {};
      pic.details = {'frequecyType':'','paymentType':'',"periodStartDate":'',"accountingType":'',"paymentDueDay":'',"paymentDueOn":'',"paymentTiming":''};
      // calculating the number of keys in pushDetails
      var keys = Object.keys(pushService.pushDetails)
      //conditional operator to retrive the data when clicked on previous button in model
      pic.details=(keys.length == 0)?pic.details:pushService.pushDetails;
      //service to get details of the data to be editted
      pic.editDetails=pushService.editInModal();
      //if the model is a edit model then assign all the input fields with the respective data to be editted
      if(pic.editDetails.saveShow == false){
        pic.details=pic.editDetails.details;
      }
      //service to store all the data from input field which is used for communication between two models
      pushService.getInfoData(pic.details);

      
      return pic;

    }
})();
