(function() {
    'use strict';

    angular
        .module('paymentApp')
        .controller('modalCtrl', modalCtrl);

    modalCtrl.$inject = ['$uibModalInstance','items','jsonService','pushService'];

    function modalCtrl($uibModalInstance, items,jsonService,pushService) {

      var mc = {};
      mc.items = items;
        mc.selected = {
          item: mc.items[0]
        };
        mc.myDisplay = true;
        //storing all the error message in an object
        mc.message={};
        // getting the details to object to be edited using service
        mc.editDetail=pushService.editInModal();
        mc.saveShow = (mc.editDetail.saveShow == undefined)?true:false;
        console.log(mc.editDetail.saveShow);
        //file names for making ajax calls
        var fileName=['c_frequecyType','c_paymentType','l_AccountingType','l_ChargeAmountBasis','l_GrowthType','l_PaymentDueDay','l_PaymentDueOn','l_PaymentTiming'];
        //key names
        var validateNames = ["frequecyType","paymentType","accountingType","periodStartDate","paymentDueDay","paymentDueOn","paymentTiming"];
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
          var flagCheck = true;
              for(var i=0;i<validateNames.length;i++){
                if(pushService.pushDetails[validateNames[i]] == ""){
                  mc.message[validateNames[i]] = "Please fill out this field";
                   flagCheck=false;
                  }
                  else{
                    flagCheck=true;
                  }
                }
                return flagCheck;
            }
            var flag=true;

        //function call made when next button is triggered
        mc.next=function(){
            pushService.setData();
            flag = validateFunction();
            console.log(flag);
            if(flag == true){
              mc.selected = {
            item: mc.items[1]
          };
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
        mc.modalClose = function(){
          $uibModalInstance.dismiss('cancel');
          pushService.pushDetails={};
        }

        return mc;
    }
})();
