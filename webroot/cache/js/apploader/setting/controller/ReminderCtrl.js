define(['app','modalInstance'], function (app) {
    app.controller('ReminderCtrl', function($scope, $http, $modal, $routeParams) {
	
		$scope.emailValidate = "Resend Email Validation";
		$scope.isValidEmail = true;
		
		//**Control for admin creation**/
		$scope.clickCreate = adminCreateUrl;
		$scope.allowSetup = !cookieAccess("Cal_Ctrl");
		//**Control for admin creation**/
	
		$scope.succ = function(data){
			if(data.success != "ok"){
				$scope.r_day = (data.reminderDays!=undefined && data.reminderDays.indexOf(1) > -1);
				$scope.r_week = (data.reminderDays!=undefined && data.reminderDays.indexOf(7) > -1);
				if(data.alertEmail != undefined && data.alertEmail != ""){
					$scope.chk_email = true;
					$scope.n_email = data.alertEmail;
					$scope.str_email = data.alertEmail;
					$scope.isValidEmail = data.validEmail;
				}
				if(data.alertSMS != undefined && data.alertSMS != ""){
					$scope.chk_sms = true;
					$scope.n_sms = data.alertSMS;
				}
				$scope.allowCreation = data.allowCreation;
			}
	    };
	    
	    getHTTP($http,subsReminderURL, $scope.succ);
	    /**Save User profile**/
		$scope.save = function(){
			
			$scope.errors = undefined;
			
			if ($scope.flag) {
		        return;
		    }
			
			if ($scope.setting.$valid == false || extraInvalidChk($scope)){
				$scope.flag = false;
				return;
			}
	
			$scope.flag = true;
			$scope.formData = saveReminder($scope);
			
			var succFunc = function(data){
				if($scope.str_email != $scope.n_email)
					$scope.isValidEmail = false;
				$scope.open();
		    	$scope.flag = false;
				}
		    var failFunc = function(data){
		    	$scope.errors = data.errors;
		        $scope.flag = false;
		    	}
		    var errFunc = function(data){
		    	$scope.errors = data.errors;
		    	$scope.flag = false;
		   		}
		    
		    funcHTTP($http, "POST", subsReminderURL, $scope.formData, succFunc, failFunc, errFunc);
		}
		/**Save user profile[E]**/
		
		/**Cancel button[S]**/
		$scope.cancel = cancelBtn;
		/**Cancel button[E]**/
		
		/**Open Modal[S]**/
		$scope.open = function () {
		   var modalInstance = $modal.open({
		     templateUrl: 'popupdialog.html',
		     controller: 'ModalInstanceCtrl',
		     backdrop: 'static',
		     resolve: {}
		   });
		};
		/**Open Modal[E]**/
	
		/**Reminder[S]**/
		$scope.resentEmailValidator = function(){			
			$scope.emailValidateFlag = true;
			
			$scope.succ2 = function(data){
				$scope.emailValidate = "Sent";
		    };
		    
		    getHTTP($http,emailVerificationURL, $scope.succ2);	
		}
		/**Reminder[E]**/
    });

    /**Copy user profiles**/
    function saveReminder($scope){

        //init value
        $scope.r_day = $scope.r_day == undefined ? false: $scope.r_day;
        $scope.r_week = $scope.r_week == undefined ? false: $scope.r_week;
        $scope.chk_email = $scope.chk_email == undefined ? false: $scope.chk_email;
        $scope.chk_sms = $scope.chk_sms == undefined ? false: $scope.chk_sms;
        $scope.allowCreation = $scope.allowCreation == undefined ? false: $scope.allowCreation;

        var reminder = [];
        if($scope.r_day) reminder.push(1)
        if($scope.r_week) reminder.push(7)

        var jsonVal = {
            reminderDays: reminder,
            alertEmail: ($scope.chk_email ? $scope.n_email : ""),
            //alertSMS: ($scope.chk_sms? $scope.n_sms: ""),//disabled
            allowCreation:$scope.allowCreation
        };

        if(! $scope.chk_email)
            delete jsonVal.alertEmail

        return jsonVal;
    }

    /**Check extra fields that cannot be handled by angular**/
    function extraInvalidChk($scope){
        return $scope.chk_email && ($scope.setting.n_email.$viewValue=='' || $scope.setting.n_email.$viewValue==undefined);
    }
});