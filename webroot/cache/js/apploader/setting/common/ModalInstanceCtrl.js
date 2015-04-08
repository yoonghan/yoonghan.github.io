define(['app'], function (app) {
    app.controller('ModalInstanceCtrlProfile', ['$scope', '$modalInstance', 'status', function ($scope, $modalInstance, status) {
      $scope.status = status;

      $scope.ok = function () {
        if($scope.status == 'new')
            redirectPage();
        $modalInstance.close();
      };
    }]);

    app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
      $scope.ok = function () {
    	$modalInstance.close();
      };
    }]);
});