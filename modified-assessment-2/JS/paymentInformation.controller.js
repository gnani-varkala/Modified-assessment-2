(function() {
    'use strict';

    angular
        .module('paymentApp')
        .controller('paymentInformationCtrl', paymentInformationCtrl);

    paymentInformationCtrl.$inject = ['pushService'];

    function paymentInformationCtrl(pushService) {
      var pic = {};
      pic.details = {'frequecyType':'','paymentType':'',"periodStartDate":'',"accountingType":'',"paymentDueDay":'',"paymentDueOn":'',"paymentTiming":''};
      
      var keys = Object.keys(pushService.pushDetails)
      console.log(keys);
      pic.details=(keys.length == 0)?pic.details:pushService.pushDetails;
      
      pic.editDetails=pushService.editInModal();

      if(pic.editDetails.saveShow == false){
        pic.details=pic.editDetails.details;
      }
      
      pic.selectOption=function(key,value){
        pic.details[key] = value;
      }
      
      pushService.getInfoData(pic.details);
      return pic;
      
    }
})();
