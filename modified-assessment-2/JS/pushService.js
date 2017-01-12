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


            serve.newEdit={};
        serve.editCtrl = function(edit){
            serve.newEdit = edit;
        }
        serve.editInModal = function(){
            return serve.newEdit;
        }

        serve.saveEdit = function(){
            serve.myDetails[serve.newEdit.parent].data[serve.newEdit.index] = serve.infoDetails;
            serve.newEdit={};
        }
        serve.saveConform = function(){
            serve.myDetails[serve.newEdit.parent].data[serve.newEdit.index] = serve.newPushDetails;
            serve.newEdit={};
        }

        return serve;
    }

})();
