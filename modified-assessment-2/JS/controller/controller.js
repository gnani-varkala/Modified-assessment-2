(function() {
    'use strict';

    angular
        .module('paymentApp')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$uibModal','pushService'];

    function mainCtrl($uibModal,pushService) {
      var main = {};
      main.items = [{'modalTitle':"Payment Information","template":"VIEW/paymentInformation.template.html","footer":"VIEW/paymentInformation.footer.template.html"},{'modalTitle':"Payment Parameters","template":"VIEW/paymentParameter.template.html","footer":"VIEW/paymentParameter.footer.template.html"}];
      // service to get the table data
      main.myDetails = pushService.getDetails();
      main.edit={};
      main.edit.saveShow = true;


      // open's the mainj model when clicked on add button
      main.open = function (size) {
          var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'modalCtrl',
            controllerAs: 'mc',
            size: size,
            backdrop: 'static',
            keyboard: false,
            resolve: {
              items: function () {
                return main.items;
              }
            }
          });
        }

        // opens the delete modal when clicked on the delete option in the table
        main.delete = function(size,parent,index) {
          var ModalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myDeleteAlert.html',
            controller: 'deleteCtrl',
            controllerAs: 'dc',
            size: size,
            backdrop: 'static',
            keyboard: false,
            resolve:{
              parent : function(){
                return parent;
              },
              index:function(){
                return index;
              }
            }
          });
        }
        //edit functionality starts here
        main.edit = function(parent,index){
          // storing all the data in an edit object 
            main.edit.saveShow = false;
            main.edit.parent = parent;
            main.edit.index = index;
            main.edit.details=angular.copy(main.myDetails[parent].data[index]);
            // passing the edit object to other controllers using service
            pushService.editCtrl(main.edit);
        }
        return main;
    }
})();
