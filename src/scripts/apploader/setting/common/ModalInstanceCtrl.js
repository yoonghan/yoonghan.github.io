define(['app','btnfunc'], function (app, btnfunc) {
    app.controller('ModalInstanceCtrlProfile', ['$scope', '$modalInstance', 'status', function ($scope, $modalInstance, status) {
      $scope.status = status;

      $scope.ok = function () {
        if($scope.status == 'new')
            btnfunc.redirectPage();
        $modalInstance.close();
      };
    }]);

    app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
      $scope.ok = function () {
    	   $modalInstance.close();
      };
    }]);
});
