define(['app'], function (app) {
    app.controller('EventsEditCtrl', ['$scope', '$http', '$route', '$location', '$filter', '$mdDialog',
		function($scope, $http, $route, $location, $filter, $mdDialog) {
			/**Init[S] **/
			$scope.predicate = "start";
			$scope.reverse = false;

			   $scope.currentPage = 1;
			   $scope.pageSize = 50;
			   $scope.totalAmt = 1;
			   $scope.pageChanged = function(){
			   }
			/**Init[E]**/

			/**Creating Watch[S]**/
			   $scope.$watch('search.title', function (filter) {
				   $scope.currentPage = 1;
				   if(typeof $scope.search !== 'undefined'){
					   $scope.filtered = $filter('filter')($scope.bookingList, $scope.search.title);
					   $scope.totalAmt = $scope.filtered.length;
				   }
			   });
			   $scope.$watch('search.desc', function (filter) {
				   $scope.currentPage = 1;
				   if(typeof $scope.search !== 'undefined'){
					   $scope.filtered = $filter('filter')($scope.bookingList, $scope.search.desc);
					   $scope.totalAmt = $scope.filtered.length;
				   }
			   });
			   $scope.$watch('search.conf', function (filter) {
				   $scope.currentPage = 1;
				   if(typeof $scope.search !== 'undefined'){
					   $scope.filtered = $filter('filter')($scope.bookingList, $scope.search.conf);
					   $scope.totalAmt = $scope.filtered.length;
				   }
			   });
			/**Creating Watch[E]**/

			/**Retrieve user profile[S]**/
			var bookingListFunc = function(data){
			    $scope.bookingList = [];
				$scope.totalAmt = data.length;
				for(var i=0; i < data.length; i++){
					var currElem = data[i];
					var info = {
							start: currElem.start,
							end: currElem.end,
							allDay: currElem.allDay,
							title: currElem.title,
							desc: currElem.desc,
							avail: currElem.avail,
							id: currElem._id,
							conf: currElem.conf
							};
					$scope.bookingList.push(info);
				}
				data = null;
			}

			getHTTP($http, editableEventListUrl, bookingListFunc);
			/**Retrieve user profile[E]**/

			$scope.removeEvent = function(calId,ev){
                $scope.flag = true;
                /**booking confirmation [S]**/
                $scope.formData = {_id: calId};

                var confirm = $mdDialog.confirm()
                  .title('Remove Event')
                  .content('Are you sure to remove the event, it will not be recoverable?')
                  .ariaLabel('Good Luck')
                  .ok('Yes')
                  .cancel('No')
                  .targetEvent(ev);
                $mdDialog.show(confirm).then(function() {
                    var succFunc = function(data){
                        $route.reload();
                        $scope.flag = false;
                        }
                    var failFunc = function(data){
                        $scope.showAlert(ev, data.errors);
                        $scope.flag = false;
                        }
                    var errFunc = function(data){
                        $scope.showAlert(ev, "Please try again later, or inform the us.");
                        $scope.flag = false;
                        }

                    funcHTTP($http, "DELETE", editableEventListUrl, $scope.formData, succFunc, failFunc, errFunc);
                }, function() {
                    $scope.flag = false;
                });
                /**booking confirmation [E]**/
            }

            $scope.showAlert = function(ev, message) {
                $mdDialog.show(
                  $mdDialog.alert()
                    .title('Opps, Error Encountered')
                    .content(message)
                    .ariaLabel('Error')
                    .ok('Ok!')
                    .targetEvent(ev)
                );
            };
	}]);
})