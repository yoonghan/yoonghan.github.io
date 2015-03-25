define(['app'], function (app) {
    app.controller('EventProgressCtrl', function($scope, $http, $location, $interval, $mdDialog) {
        var amt = 100;
        var maxWait = 2000;
        var maxRetryCount = 25;

        //don't start at 0, user will suspect nothing is working

        $scope.progressValue = -1;
        $scope.countTo = amt;
        $scope.countFrom = 0;

        $scope.message = "";

        $scope.maxRetryCount = maxRetryCount;
        $scope.retryCount = 0;

        var stop;

        /**Function for progress count[S]**/
        var progressFunc = function(data){
        if ($scope.progressValue < $scope.countTo
                && $scope.retryCount < $scope.maxRetryCount
                && !($scope.progressValue==-1 &&  $scope.retryCount == 2)) {
          if(data.length != 0){
              var count = eval(data[0].count);
              var total = eval(data[0].total);

              var progress = Math.floor(count/total * amt);
              $scope.progressValue = progress;
          }
          /**Handles retry**/
              $scope.retryCount++;
              if($scope.retryCount > 12){
                  $scope.message = "Umm, something seems strange. But just to let you know, we're still here with you.";
              }else if($scope.retryCount > 3){
                  $scope.message = "We're still loading, do be patient.";
              }

        } else {
          $scope.stopLoad();
        }
        };
        /**Function for progress count[E]**/

        $scope.load = function() {
        /**Don't start a new fight if we are already fighting**/
          if ( angular.isDefined(stop) ) return;

        /**load every 2 seconds**/
          stop = $interval(function() {
              getHTTP($http, calLoadURL, progressFunc);
          }, maxWait, maxRetryCount+1);
        };

        $scope.stopLoad = function() {
          if (angular.isDefined(stop)) {
              $interval.cancel(stop);
              stop = undefined;
          }
          if($scope.progressValue==-1){
              $location.url('eventempty');
          }else{
              $location.url('eventsubmit');
          }
        };

        $scope.$on('$destroy', function() {
            // Make sure that the interval is destroyed too
            $scope.stopLoad();
        });

        $scope.load();
    })
});