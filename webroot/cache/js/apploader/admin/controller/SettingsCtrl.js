define(['app', 'reactjs', 'reactloader', '../directive/ngflow'], function (app, react) {
    app.controller('SettingsCtrl', function($rootScope, $scope, $http, $location, $route, $modal, $mdDialog) {
        $scope.url_pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        $scope.ctcNo_pattern = /^\+?[0-9]{0,13}$/;

        /**Root changes Image [S]**/
        $rootScope.openWindow = false;
        $rootScope.imageUrl = cpImageURL + '?' + new Date().getTime();
        /**Root changes Image [E]**/

        /** React [S] **/
        var reactFunc = undefined;

        function getReact(){
            if(typeof reactFunc === 'undefined'){
                reactFunc = react_UserMgmt($scope, react);
                reactFunc.load();
            }
            return reactFunc.getReact();
        }

        $scope.successFunc = function(data){
            $scope.userMgmtList = data;
            getReact().setState({data: data});
        }

        $scope.triggerLoad = function(){
            getHTTP($http, userMgmtListUrl, $scope.successFunc);
        }

        $scope.removeUser = function(userId){
            var confirm = $mdDialog.confirm()
              .title('Remove user')
              .content('Are you sure to remove the user from his subscription?')
              .ariaLabel('User remove')
              .ok('Yes')
              .cancel('No');
            $mdDialog.show(confirm).then(function() {
                var succFunc = function(data){
                    //Manual remove of data.
                    var query=eval("({'maskId':'"+userId+"'})");
                    var listData = $scope.userMgmtList;
                    listData.splice(_.findIndex(listData, query),1);
                    getReact().setState({data: listData});
                    //getHTTP($http, userMgmtListUrl, $scope.successFunc);
                }
                var failFunc = function(data){
                    $scope.showAlert("error",data.errors);

                }
                var errFunc = function(data){
                    $scope.showAlert("error",data.errors);
                }

                funcHTTP($http, "DELETE", userMgmtUrl+"/"+userId, {}, succFunc, failFunc, errFunc);
            }, function() {
            });
        }

        $scope.triggerLoad();
        /** React [E] **/
        /**Dialog [S]**/
        $scope.open = function(){
            var modalInstance = $modal.open({
                templateUrl: 'popupdialog.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    ver: function(){
                        return $scope.ver;
                    }
                }
            });

            modalInstance.result.then(function () {
                $route.reload();
            }, function () {
            });
        }
        /**Dialog [E]**/

        $scope.profileSucc = function(data){
            $scope.cName = data.cName;
            $scope.cDesc = data.cDesc;
            $scope.cWebsite = data.cWebsite;
            $scope.cCtcNo = data.cCtcNo;
            $scope.cEmail = data.cEmail;
            $scope.ver = data.ver;
        };

        $scope.reportSucc = function(data){
            if(data.success != "ok"){
                $scope.rEmail = data.email;
            }
        };

        getHTTP($http,subsReportURL, $scope.reportSucc);
        getHTTP($http,adminProfileUrl, $scope.profileSucc);


        function createProfileJSON($scope){
            return {
                cDesc: $scope.setting.profile.cDesc.$viewValue,
                cWebsite: $scope.setting.profile.cWebsite.$viewValue,
                cCtcNo: $scope.setting.profile.cCtcNo.$viewValue,
                cEmail: $scope.setting.profile.cEmail.$viewValue,
                ver: $scope.ver
            }
        }

        $scope.showAlert = function(ev, message){
            $mdDialog.show(
                $mdDialog.alert()
                .title('Error')
                .content((typeof message === 'string' ? message : message[0]))
                .ariaLabel('There is input error, please check.')
                .ok('Ok!')
                .targetEvent(ev)
            );
        }

        $scope.showUpdate = function(ev){
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Updated')
                    .content("Update Completed")
                    .ariaLabel('Update Completed')
                    .ok('Ok!')
                    .targetEvent(ev)
                );
        }

        $scope.resetProfileForm = function(){
            $route.reload();
        }

        /**Save CP profile[S]**/
        $scope.processProfileForm = function(ev) {
            $scope.profileErrors = undefined;

            if ($scope.profileFlag || $scope.setting.profile.$valid==false)
                return;

            $scope.profileFlag = true;

            $scope.formData = createProfileJSON($scope);

            var succFunc = function(data){
                $scope.profileFlag = false;
                $scope.showUpdate(ev);
                $route.reload();
                }
            var failFunc = function(data){
                $scope.profileFlag = false;
                $scope.showAlert(ev,"There are errors to the update.");
                $scope.profileErrors = data.errors;
                }
            var errFunc = function(data){
                $scope.profileFlag = false;
                $scope.showAlert(ev,"There are errors to the update.");
                $scope.profileErrors = data.errors;
                }

            funcHTTP($http, "POST", adminProfileUrl, $scope.formData, succFunc, failFunc, errFunc);
        };
        /**Save CP profile[E]**/

        /**Save report profile[E]**/
        function saveReport($scope){
            var jsonVal = {
                email: $scope.setting.report.rEmail.$viewValue
            };

            return jsonVal;
        }

        $scope.processReportForm = function(ev){
            $scope.reportErrors = undefined

            if ($scope.reportFlag || $scope.setting.report.$valid == false){
                return;
            }

            $scope.reportFlag = true;
            $scope.formData = saveReport($scope);

            var succFunc = function(data){
                $scope.reportFlag = false;
                $scope.showUpdate(ev);
                }
            var failFunc = function(data){
                $scope.reportFlag = false;
                $scope.showAlert(ev,"There are errors to the update.");
                $scope.reportErrors = data.errors;
                }
            var errFunc = function(data){
                $scope.reportFlag = false;
                $scope.showAlert(ev,"There are errors to the update.");
                $scope.reportErrors = data.errors;
                }

            funcHTTP($http, "POST", subsReportURL, $scope.formData, succFunc, failFunc, errFunc);
        }
        /**Save report profile[E]**/

        /**Add user to subscriber[S]**/
        $scope.processUserMgmtForm = function(ev){
            $scope.userMgmtErrors = undefined;

            if ($scope.userMgmtFlag || $scope.setting.usermgmt.$valid==false ||
                (typeof $scope.setting.usermgmt.usercode.$viewValue === 'undefined' || $scope.setting.usermgmt.usercode.$viewValue === ''))
                return;

            $scope.userMgmtFlag = true;

            var succFunc = function(data){
                $scope.userMgmtFlag = false;
                $scope.triggerLoad();
                $scope.showUpdate(ev);
                }
            var failFunc = function(data){
                $scope.userMgmtFlag = false;
                $scope.showAlert(ev,"There are errors to the update.");
                $scope.userMgmtErrors = data.errors;
                }
            var errFunc = function(data){
                $scope.userMgmtFlag = false;
                $scope.showAlert(ev,"There are errors to the update.");
                $scope.userMgmtErrors = data.errors;
                }

            funcHTTP($http, "PUT", userMgmtUrl + "/" + $scope.setting.usermgmt.usercode.$viewValue, {}, succFunc, failFunc, errFunc);
        }
        /**Add user to subscriber[E]**/
    })
    .controller('ModalInstanceCtrl', function ($rootScope, $scope, $http, $modalInstance, ver) {
    	$scope.ver = ver;
    	$scope.flag_upload=false;

    	$scope.remove = function(file){
    		file.cancel();
    		$scope.flag_upload=false;
    	}

    	$scope.uploader = function($flow){
    		var fileName = $flow.files[0].name;
    		$scope.ext = fileName.substring(fileName.lastIndexOf("."), fileName.length);

    		$scope.flag_upload=true;
    	};

    	$scope.register = function(){
    		$scope.flag=true;


    		$scope.formData = {
    			ver: $scope.ver,
    			ext: $scope.ext
    		};

    		var succFunc = function(data){
    			$scope.flag = false;
    			$rootScope.imageUrl = cpImageURL + '?' + new Date().getTime();
    			$modalInstance.close();
    			}
    	    var failFunc = function(data){
    	    	$scope.flag = false;
    	    	$scope.uploadErrors = data.errors;
    	    	}
    	    var errFunc = function(data){
    	    	$scope.flag = false;
    	    	$scope.uploadErrors = data.errors;
    	   		}

    	    funcHTTP($http, "POST", subUploadImgURL, $scope.formData, succFunc, failFunc, errFunc);
    	}

    	$scope.close = function () {
    		$modalInstance.dismiss();
    	};
    });
});