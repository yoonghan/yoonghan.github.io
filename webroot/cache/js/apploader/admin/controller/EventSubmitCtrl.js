define(['app','moment'], function (app, moment) {
    app.controller('EventSubmitCtrl', function($scope, $http, $location, $mdDialog) {
       	var startD = new Date();
        var endD = new Date();

        /**Setup [S]**/
        $scope.minDate = new Date();
        $scope.maxDate = new Date();
        $scope.word = /^([A-Z|a-z|0-9]+\s{0,1}[A-Z|a-z|0-9]*)*$/;
        $scope.events = [];
        $scope.predicate = 'start';
        $scope.virtualDel = '';
        /**Setup [E]**/

        /**Check availability[S]**/
        $scope.userInfoAllow = function(value){
            var permission = ["","E","C","A"];
            var ternary = value.toString(3);

            var permissionCnt = 0;
            var action = "";
            for(var i=ternary.length-1; i >= 0; i--){
                var charPos = ternary.charAt(i);
                if( charPos == 1){
                    action += permission[permissionCnt] + ",";
                }else if(charPos == 2){
                    action += permission[permissionCnt] + "[Opt],";
                }
                permissionCnt++;
            }

            return action == "" ? "":action.substring(0,action.length-1);
        }
        /**Check availability[E]**/

       	/**Refilter the search[S]**/
       	$scope.filterSearch = function(){
       		if($scope.endD != undefined && $scope.startD != undefined){
       			$scope.endD.setMinutes(0, 0, 0);
       			$scope.endD.setHours(24);
       			$http({
       				method  : "GET",
       				url     : calSetupConfURL+ "/" + $scope.startD.getTime() + "/" + $scope.endD.getTime(),
       				headers: {'Content-Type': 'application/json'}
       			})
       			.success(function(data) {
       				$scope.events = data;
       				$scope.groupEvents = _.groupBy($scope.events, function(num){ var d = new Date(num.start); var date = (new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0)); return date.getTime();});
       			})
       			.error(function(data){
       				$scope.events = [];
       				$scope.groupEvents = [];
       			});
       		}else{
       			var confFunc = function(data){
       				$scope.events = data;
       				$scope.groupEvents = _.groupBy($scope.events, function(num){ var d = new Date(num.start); var date = (new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0)); return date.getTime();});
       			};
       			getHTTP($http, calSetupConfURL+"/0/0", confFunc);
       		}
       	};
       	/**Refilter the search[E]**/

           /**Retrieve user profile[S]**/
       	$scope.filterSearch();
       	/**Retrieve user profile[E]**/

       	/**CalendarControl [S]**/
       	$scope.dateOptions = {
       		formatYear: 'yy',
       		startingDay: 1
       	};

       	/**DialogBox[S]**/
       	$scope.showAlert = function(ev, message) {
       		$mdDialog.show(
       			$mdDialog.alert()
       			.title('Opps, Error Encountered')
       			.content(message)
       			.ariaLabel('Error')
       			.ok('Ok')
       			.targetEvent(ev)
       		);
       	};

       	$scope.showOK = function(ev) {
       		$location.url('eventempty');
       	};
       	/**DialogBox[E]**/

       	function setupData(){
           	return $scope.events;
       	}

           /**Setup confirmation [S]**/
       	$scope.rejectForm = function(ev){

       		var confirm = $mdDialog.confirm()
       			.title('Reject All Events')
       			.content('Are you sure to remove all your calendar setup?')
       			.ariaLabel('Reject Form')
       			.ok('Reject')
       			.cancel('No')
       			.targetEvent(ev);
       		$mdDialog.show(confirm).then(function() {
       				var succFunc = function(data){
       					$scope.flag = false;
       					$scope.showOK(ev);
       				}
       				var failFunc = function(data){
       					$scope.flag = false;
       					$scope.showAlert(ev, "System encountered Exception. Please try again.");
       				}
       				var errFunc = function(data){
       					$scope.flag = false;
       					$scope.showAlert(ev, "System encountered Exception. Please try again.");
       				}

       				funcHTTP($http, "DELETE", calSetupConfURL, {}, succFunc, failFunc, errFunc);
       			}, function() {
       		});
       	}

       	$scope.resetForm = function(ev){
       		$scope.startD = undefined;
       		$scope.endD = undefined;
       		var confirm = $mdDialog.confirm()
       			.title('Reset Form')
       			.content('Are you sure to reset all your changes?')
       			.ariaLabel('Reset Form')
       			.ok('Reset')
       			.cancel('No')
       			.targetEvent(ev);
       		$mdDialog.show(confirm).then(function() {
       			$scope.filterSearch();
       		}, function() {
       		});
       	}

       	$scope.processForm = function(ev){
       		if ($scope.flag) {
       	        return;
       	    }

       		if ($scope.setup.$valid == false){
       			$scope.flag = false;
       			$scope.showAlert(ev,'Please check for errors.');
       			return;
       		}

       	    $scope.flag = true;

       	    $scope.formData = setupData();

       	    var succFunc = function(data){
       	    	$scope.flag = false;
       	    	$scope.showOK(ev);
       	    }
       	    var failFunc = function(data){
       	        $scope.flag = false;
       	        $scope.showAlert(ev,'Please check for errors.');
       	    }
       	    var errFunc = function(data){
       	    	$scope.flag = false;
       	    }
       	    funcHTTP($http, "POST", calSetupConfURL, $scope.formData, succFunc, failFunc, errFunc);
       	}
       	/**Setup confirmation [E]**/

       	function obtainDate(date, opt){
       		if(opt==1)
       			return moment(date).format("MMM Do, YYYY");
       		if(opt==2)
       			return moment(date).format("MMM, YYYY");
       	}

       	function obtainTime(time){
       		return moment(time).format("HHmm");
       	}
    });
});