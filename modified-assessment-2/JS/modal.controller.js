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
        console.log(mc.editDetail.saveShow);
        //file names for making ajax calls
        var fileName=['c_frequecyType','c_paymentType','l_AccountingType','l_ChargeAmountBasis','l_GrowthType','l_PaymentDueDay','l_PaymentDueOn','l_PaymentTiming'];
        //key names
        var validateNames = [];
        mc.jsonData={}
        //ajax call is made here by using immediate invoking function
        for(var j=0;j<fileName.length;j++){
          (function(i){
            jsonService.paymentJson("JSON/jsons/"+fileName[i]+".json").then(function(data) {
                      mc.jsonData[fileName[i]] = [];
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
        //function to check for validations
        var validateFunction = function(){
          if(pushService.pushDetails.frequecyType == 'Other'){
              validateNames = ["frequecyType","paymentType","accountingType","periodStartDate","paymentTiming"];
          }
          else if(pushService.pushDetails.frequecyType == 'Monthly'){
              validateNames = ["frequecyType","paymentType","accountingType","periodStartDate","paymentDueDay","paymentTiming"];
          }
          else if(pushService.pushDetails.paymentDueOn != 'Specific Day of Period'){
              validateNames = ["frequecyType","paymentType","accountingType","periodStartDate","paymentDueOn","paymentTiming"];
          }
          var flagCheck = true;
              for(var i=0;i<validateNames.length;i++){
                if(pushService.pushDetails[validateNames[i]] == ""){
                  console.log(validateNames);
                  mc.message[validateNames[i]] = "Please fill out this field";
                   flagCheck=false;
                  }
                  else{
                    mc.message[validateNames[i]] = "";
                  }
                }
                return flagCheck;
            }
            var flag=true;

        //function call made when next button is triggered
        mc.next=function(){
            pushService.setData();
            flag = validateFunction();
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
          $uibModalInstance.dismiss('cancel');
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
            mc.modalClose = function(){
              $uibModalInstance.dismiss('cancel');
              pushService.pushDetails={};
              mc.editDetail.saveShow = undefined;
            }

        pushService.mainModalClose(mc.modalClose);
        return mc;
    }
})();
