(function () {
    'use strict';

    angular
        .module('paymentApp')
        .service('pushService', pushService);

    pushService.$inject = [];
    function pushService(){
        var serve ={};
        serve.pushDetails ={};
        serve.myDetails = [];
        serve.infoDetails = {} ;
        serve.newPushDetails ={};
        serve.myDisplay = true;
        serve.message={};
        serve.flag=false;


        //service made when next button is triggered
        serve.setData = function(){
           serve.pushDetails = serve.infoDetails;

        }

        //service for paymentInformatiopn data
        serve.getInfoData = function(details){
            serve.infoDetails = details;

        }
        //service for payment parameter data
        serve.getData = function(newdetails){
           serve.newPushDetails = newdetails;
        }

        //service to generate table data
        serve.generateData = function(){
            angular.extend(serve.pushDetails,serve.newPushDetails);
            var flagCheck =false;
            var index = -1;
            //checks for frequency other con
            if(serve.pushDetails.frequecyType == 'Other'){
              serve.validate.flagCheck = true;
            }
            else{
              serve.validateFunction(['chargeAmountBasis']);
              
            }
            if( serve.validate.flagCheck){
              for(var i=0;i<serve.myDetails.length;i++){
                if(serve.myDetails[i].payType == serve.pushDetails.paymentType){
                  flagCheck=true;
                  index = i;
                  break;
                }
              }
              if(flagCheck){
                serve.myDetails[index].data.push(angular.copy(serve.pushDetails));
                serve.pushDetails={};
              }else{
                serve.payDetails ={};
                serve.payDetails.payType=serve.pushDetails.paymentType;
                serve.payDetails.data = [];
                serve.payDetails.data.push(angular.copy(serve.pushDetails));
                serve.myDetails.push(serve.payDetails);
                serve.pushDetails={};
              }
            }
            

        }
        serve.getDetails = function(){
            return serve.myDetails;
        }

        //service for deleteing the data
        serve.delete=function(parent,index){
            if(serve.myDetails[parent].data.length == 1){
            serve.myDetails.splice(parent,1)
          }
          else{
            serve.myDetails[parent].data.splice(index,1);
          }
        }
        //service to get the data to be editted
        serve.newEdit={};
        serve.editCtrl = function(edit){
            serve.newEdit = edit;
        }
        serve.editInModal = function(){
            return serve.newEdit;
        }
        //save function for edit in payment information model
        serve.saveEdit = function(){
            serve.myDetails[serve.newEdit.parent].data[serve.newEdit.index] = serve.infoDetails;
            serve.newEdit={};
        }
        //save function for edit in payment parameter model
        serve.saveConform = function(){
            serve.myDetails[serve.newEdit.parent].data[serve.newEdit.index] = serve.newPushDetails;
            serve.newEdit={};
        }
        //validations function
        serve.validate={};
        serve.validateFunction = function(validateNames){
          serve.validate.flagCheck = true;
          serve.validate.message={};
          // checks for input field empty condition
          for(var i=0;i<validateNames.length;i++){
            if(serve.pushDetails[validateNames[i]] == "" || serve.pushDetails[validateNames[i]] == undefined){
              serve.validate.message[validateNames[i]] = "Please fill out this field";
               serve.validate.flagCheck=false;
              }
              else{
                serve.validate.message[validateNames[i]] = "";
              }
            }
            return serve.validate;

        }
        //getting the modalClose function using service
        serve.mainModalClose = function(editFunc){
          serve.editFunction = editFunc;
        }
        serve.modalVClose = function(){
          //function call for modal close
          serve.editFunction();
        }

        return serve;
    }

})();
