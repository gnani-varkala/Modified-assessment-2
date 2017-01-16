(function() {
    'use strict';

    angular
        .module('paymentApp')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$uibModal','pushService'];

    function mainCtrl($uibModal,pushService) {
      var main = {};
      main.items = [{'modalTitle':"Payment Information","template":"VIEW/paymentInformation.template.html","footer":"VIEW/paymentInformation.footer.template.html"},{'modalTitle':"Payment Parameters","template":"VIEW/paymentParameter.template.html","footer":"VIEW/paymentParameter.footer.template.html"}];
      main.myDetails = pushService.getDetails();
      main.edit={};
      main.edit.saveShow = true;


      
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

        main.edit = function(parent,index){
            main.edit.saveShow = false;
            main.edit.parent = parent;
            main.edit.index = index;
            main.edit.details=angular.copy(main.myDetails[parent].data[index]);
            pushService.editCtrl(main.edit);
        }
        return main;
    }
})();
