define(['app','moment'], function (app, moment) {
    app.controller('EventSetupCtrl', function($scope, $http, $route, $routeParams, $location, $timeout, $mdDialog) {
        var OPTIONAL = "[Optional]";
        $scope.MAX = 50;
        var MAX_TIME = 16;

        var startD = new Date();
        var endD = new Date();
        $scope.blackoutEvents = [];
        $scope.reservedEvents = [];
        $scope.timedEvents = [];

        /*Default values[S]*/
        $scope.flag = false;
        $scope.reserveType = "opt1";
        $scope.hstep = 1;
        $scope.mstep = 30;
        $scope.abookings = 1;
        $scope.minDate = startD;

        startD.setMinutes( 0 );
        endD.setMinutes( 30 );

        $scope.word = /^([A-Z|a-z|0-9]+\s{0,1}[A-Z|a-z|0-9]*)*$/;
        /*Default values[E]*/

        /*setAdditionalButton[S]*/
        $scope.opt_ctcNo = OPTIONAL;
        $scope.opt_email = OPTIONAL;
        $scope.opt_addr = OPTIONAL;
        /*setAdditionalButton[E]*/

        $scope.addBlackouts = function(ev) {
            var bd = $scope.blackoutdates;
            if(typeof bd !== 'undefined'){
                var timeBD = (Date.UTC(bd.getFullYear(),bd.getMonth(),bd.getDate(),0,0,0));
                if($scope.blackoutEvents.indexOf(timeBD) < 0 &&
                        maxLength(ev,"Blackout",$scope.blackoutEvents)){
                    $scope.blackoutEvents.push(timeBD);
                    $scope.blackoutEvents.sort();
                }
            }
        };
        $scope.removeBlackouts = function(idx) {
            $scope.blackoutEvents.splice(idx,1);
        }
        $scope.addReserve = function(ev) {
            var rd = $scope.reserveDates;
            if(typeof rd !== 'undefined'){

                var timeRD = (Date.UTC(rd.getFullYear(),rd.getMonth(),rd.getDate(),0,0,0));
                if( $scope.reservedEvents.indexOf(timeRD) < 0 &&
                        maxLength(ev,"Reserve",$scope.reservedEvents)){
                    $scope.reservedEvents.push(timeRD);
                    $scope.reservedEvents.sort();
                }
            }
        };
        $scope.removeReserve = function(idx) {
            $scope.reservedEvents.splice(idx,1);
        }
        $scope.addTimeEvents = function() {

            if($scope.timedEvents.length > MAX_TIME){
                alert("Maximum Booking Time allowed.")
                return;
            }
            var timeEvent = {
                    "stime": startD,
                    "etime": endD,
                    "abookings": 1
            };
            $scope.timedEvents.push(timeEvent);
        };
        $scope.removeTimeEvents = function(idx) {
            $scope.timedEvents.splice(idx,1);
        }

        function maxLength(ev,msg, event){
            if(event.length >= $scope.MAX){
                $scope.showAlert(ev,msg +" events at it's Max, which is "+$scope.MAX+".");
                return false;
            }
            return true;
        }

        function resetupTime(){
            var newTimeEvent = [];

            if($scope.fullday){
                newTimeEvent.push({
                    "stime":"0",
                    "etime":"0",
                    "abookings":$scope.abookings
                });
            }else{
                for(var loop = 0; loop<$scope.timedEvents.length; loop++){
                    var timeEvent = {
                        "stime": obtainTime($scope.timedEvents[loop].stime),
                        "etime": obtainTime($scope.timedEvents[loop].etime),
                        "abookings":$scope.timedEvents[loop].abookings,
                    }
                    newTimeEvent.push(timeEvent);
                }
            }
            return newTimeEvent;
        }

        function setupData(){
            var data = {
                "title": $scope.title,
                "desc": $scope.desc,
                "userInfo" : userInfoFunc($scope),
                "conf" : $scope.conf? true:false,
                "fullDay": $scope.fullday? true:false,
                "timedEvents": resetupTime(),
                "reserveType": $scope.reserveType,
                "occurrence": [$scope.monday? true:false,$scope.tuesday? true:false,$scope.wednesday? true:false,
                            $scope.thursday? true:false,$scope.friday? true:false,
                            $scope.saturday? true:false,$scope.sunday? true:false],
                "reserveEvents" : $scope.reservedEvents,
                "blackoutEvents" : $scope.blackoutEvents
            }
            return data;
        }

        /**DialogBox[S]**/
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
        /**DialogBox[E]**/

        /**Compare time[S]**/
        $scope.invalidTimeComparer = function (idx){
            var recolor=angular.element(document.querySelector("#time"+idx));
            if($scope.timedEvents[idx].etime==null || $scope.timedEvents[idx].stime==null || $scope.timedEvents[idx].etime.getTime() <= $scope.timedEvents[idx].stime.getTime()){
                recolor.css("border-color","#f00");
                return true;
            }else{
                recolor.css("border-color","#000");
                return false;
            }
        }
        /**Compare time[E]**/

        /**Reset form[S]**/
        $scope.resetForm = function(ev){
            var confirm = $mdDialog.confirm()
            .title('Reset Form')
            .content('You\'ll loose all you input. Are you sure?')
            .ariaLabel('Reset')
            .ok('Reset')
            .cancel('No')
            .targetEvent(ev);
              $mdDialog.show(confirm).then(function() {
                $route.reload();
              }, function() {
            });
        }
        /**Reset form[E]**/

        /**Setup confirmation [S]**/
        $scope.processForm = function(ev){
        	$scope.errors = undefined;
            $scope.setup.submitted = true;

            if ($scope.flag) {
                return;
            }

            if(validForm() == false){
                $scope.flag = false;
                $scope.showAlert(ev,"There are errors within your input.");
                $location.href="#/eventsetup";
                return;
            }

            $scope.flag = true;

            $scope.formData = setupData();

            var succFunc = function(data){
                $location.url('eventprogress');
            }
            var failFunc = function(data){
                $scope.showAlert(ev,"There are errors within your input.");
                $scope.flag = false;}
            var errFunc = function(data){
            	$scope.showAlert(ev,"There are errors within your input.");
                $scope.errors = data.errors;
                $scope.flag = false;}

            funcHTTP($http, "PUT", calendarURL, $scope.formData, succFunc, failFunc, errFunc);

        }
        /**Setup confirmation [E]**/

        function validatecheckbox(val){
            return (typeof val !== 'undefined') && val;
        }

        function validForm(){
            if($scope.setup.$valid
                    && ($scope.reserveType=="opt2" && (validatecheckbox($scope.monday)||
                            validatecheckbox($scope.tuesday)||
                            validatecheckbox($scope.wednesday)||
                            validatecheckbox($scope.thursday)||
                            validatecheckbox($scope.friday)||
                            validatecheckbox($scope.saturday)||
                            validatecheckbox($scope.sunday)) ||
                            $scope.reservedEvents.length > 0)
                    && ($scope.fullday || ($scope.timedEvents.length > 0 && validDates()))){
                return true;
            }else{
                return false;
            }
        }

        function validDates(){
            var timeEvents = $scope.timedEvents;
            for(var loop=0; loop < timeEvents.length; loop++){
                if($scope.invalidTimeComparer(loop)) return false;
            }
            return true;
        }

        /**Additional Info parser[S]**/
        function userInfoFunc($scope){
            var contact_val, email_val, addr_val = 0;
            if($scope.add_ctcNo)
                $scope.opt_ctcNo==OPTIONAL? contact_val = 1: contact_val = 2;
            if($scope.add_email)
                $scope.opt_email==OPTIONAL? email_val = 1: email_val = 2;
            if($scope.add_addr)
                $scope.opt_addr==OPTIONAL? addr_val = 1: addr_val = 2;
            return switcherCal(
                chkDef(email_val), chkDef(contact_val), chkDef(addr_val)
                );
        }
        function chkDef(val){
            return (typeof val === 'undefined'? 0: val);
        }
        function switcherCal(email, contact, addr){
            var calc = 0;
            calc += (3) * email;
            calc += (9) * contact;
            calc += (27) * addr;
            return calc;
        }
        /**Additional Info parser[E]**/

        function obtainDate(date){
            return moment(date).format("MMM Do, YYYY");
        }

        function obtainTime(time){
            return moment(time).format("HHmm");
        }
    });
});