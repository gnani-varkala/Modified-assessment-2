(function() {
    'use strict';

    angular
        .module('paymentApp')
        .controller('modalCtrl', modalCtrl);

    modalCtrl.$inject = ['$uibModal','$uibModalInstance','items','jsonService','pushService'];

    function modalCtrl($uibModal,$uibModalInstance, items,jsonService,pushService) {

      var mc = {};
      mc.items = items;
        mc.selected = {
          item: mc.items[0]
        };
        mc.display = true;
        //storing all the error message in an object
        mc.message={};
        // getting the details to object to be edited using service
        mc.editDetail=pushService.editInModal();
        mc.saveShow = (mc.editDetail.saveShow == undefined)?true:false;
        //file names for making ajax calls
        var fileName=['c_frequecyType','c_paymentType','l_AccountingType','l_ChargeAmountBasis','l_GrowthType','l_PaymentDueDay','l_PaymentDueOn','l_PaymentTiming'];
        //key names
        var infoValidateNames = ["frequecyType","paymentType","accountingType","periodStartDate",'paymentDueDay',"paymentDueOn","paymentTiming"];
        mc.jsonData={}
        //ajax call is made here by using immediate invoking function
        for(var j=0;j<fileName.length;j++){
          (function(i){
            jsonService.paymentJson("JSON/jsons/"+fileName[i]+".json").then(function(data) {
                      mc.jsonData[fileName[i]] = [];
                      // split functionality is done here for the data from the ajax call
                      if(fileName[i].charAt(0) === "c" ){
                        for(var k=0;k<data.length;k++){
                          var array = [];
                          array = (data[k].path).split("\\");
                          mc.jsonData[fileName[i]].push(array[array.length - 1]);
                        }
                      }
                      else if(fileName[i].charAt(0) === "l"){
                        for(var k=0;k<data.result.length;k++){
                          mc.jsonData[fileName[i]].push(data.result[k].value);
                        }
                      }
                  });})(j)
        }

        //function call made when next button is triggered
        mc.next=function(){
            //function to check for validations
            if(pushService.pushDetails.frequecyType == 'Other'){
                infoValidateNames = ["frequecyType","paymentType","accountingType","periodStartDate","paymentTiming"];
            }
            else if(pushService.pushDetails.frequecyType == 'Monthly'){
                infoValidateNames = ["frequecyType","paymentType","accountingType","periodStartDate","paymentDueDay","paymentTiming"];
            }
            else if(pushService.pushDetails.paymentDueOn !== 'Specific Day of Period' && pushService.pushDetails.paymentDueOn !== undefined){
                infoValidateNames = ["frequecyType","paymentType","accountingType","periodStartDate","paymentDueOn","paymentTiming"];
            }

            var flag=true;
            pushService.setData();
            var validate= pushService.validateFunction(infoValidateNames)
            flag=validate.flagCheck;
            mc.message =validate.message
            if(flag == true){
              mc.selected = {
                item: mc.items[1]
              };
            }
            if(pushService.pushDetails.frequecyType == 'Other'){
              mc.display = false;
            }
            else{
              mc.display = true;
            }
        }

        //function call is made when previous button is triggered
        mc.previous=function(){
           mc.selected = {
            item: mc.items[0]
          };
        }

        //function to generated the values in table
        mc.generate = function(){
             pushService.generateData();
              mc.message =pushService.validate.message;
             if(pushService.validate.flagCheck){
                $uibModalInstance.dismiss('cancel');
             }
             
          //  }
        }

        //save function for edit in first model
        mc.save=function(){
          pushService.saveEdit();
          $uibModalInstance.dismiss('cancel');

        }
        //save function for edit in second model
        mc.saveConform = function(){
          pushService.saveConform();
          $uibModalInstance.dismiss('cancel');

        }
        //function for model close
           mc.modalEditOpen = function (size) {
          var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'VIEW/editWarning.template.html',
            controller: 'editCtrl',
            controllerAs: 'ec',
            size: size,
            backdrop: 'static',
            keyboard: false,
            resolve:{
              saveShow:function(){
                return mc.editDetail.saveShow;
              }
            }
          });
        }   
            // function to close modal
            mc.modalClose = function(){
              $uibModalInstance.dismiss('cancel');
              pushService.pushDetails={};
              mc.editDetail.saveShow = undefined;
            }

        pushService.mainModalClose(mc.modalClose);
        return mc;
    }
})();
