define(['app'], function (app) {
    app.controller('UserListCtrl', function($scope, $route, $routeParams, $http, $timeout, $mdDialog, calendar) {
        /**Init[S] **/
        $scope.predicate = "fname";
        $scope.reverse = false;
        /**Init[E] **/

        /**Expose user[S]**/
        var oid = $routeParams.oid;

        var userListFunc = function(data){
            var value = data;
            $scope.userList = [];
            for(var i=0; i < value.length; i++){
                var currElem = value[i];

                $scope.userList.push({
                    conf: currElem.conf,
                    firstName: currElem.firstName,
                    lastName: currElem.lastName,
                    email: currElem.email,
                    ctcNo: currElem.contactNo,
                    id: currElem.maskId
                    });
            }
            value = null;
        }

        getHTTP($http, bookingUsersURL+"/"+oid+"/users", userListFunc);
        /**Expose user[E]**/

        //Search value and replace
        var jsonCalId=eval("({'id':{'$oid':'"+oid+"'}})");

        $scope.calInfo = calendar[_.findIndex(calendar, jsonCalId)];
        //Reuse old scope data[E]

        $scope.unsubuser = function(maskId,ev){
            $scope.flag = true;
            var calId = $scope.calInfo.id;
            /**booking confirmation [S]**/
            $scope.formData = {_id: calId, userId: maskId};

                var confirm = $mdDialog.confirm()
                  .title('Unsubscribe user')
                  .content('Are you sure to remove the user from your reserve list?')
                  .ariaLabel('Good Luck')
                  .ok('Yes')
                  .cancel('No')
                  .targetEvent(ev);
                $mdDialog.show(confirm).then(function() {
                    var succFunc = function(data){
                        $scope.calInfo.avail = $scope.calInfo.avail + 1;
                        $route.reload();
                        }
                    var failFunc = function(data){
                        $scope.showAlert(ev, data.error);
                        }
                    var errFunc = function(data){
                        $scope.showAlert(ev, "Please try again later, or inform the us.");
                        }

                    funcHTTP($http, "DELETE", cmdreservationURL, $scope.formData, succFunc, failFunc, errFunc);
                }, function() {
                });

            $scope.flag = false;
            /**booking confirmation [E]**/
        }

        $scope.confirmuser = function(maskId){
            $scope.flag = true;
            var calId = $scope.calInfo.id;
            /**booking confirmation [S]**/
            var formData = {_id: calId, userId: maskId};
            var succFunc = function(data){
                $route.reload();
                }
            var failFunc = function(data){
                $scope.showAlert("error",data.error)
                }
            var errFunc = function(data){
                $scope.showAlert("error",data.error)
                }

            funcHTTP($http, "POST", cmdreservationURL, formData, succFunc, failFunc, errFunc);
            $scope.flag = false;
            /**booking confirmation [E]**/
        };

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
    });
});