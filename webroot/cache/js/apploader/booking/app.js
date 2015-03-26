"use strict";

define([
'angularAMD',
'jquery',
'lodash',
'moment',
'weather',
'calendar_tut',
'global_var',
'cookiereader',
'auth_common',
'jquery-ui',
'angular-sanitize',
'ui-bootstrap-custom',
'ui-bootstrap-custom-tpls',
'ui-calendar'
], function (angularAMD, $, _, moment, skycon, tut) {
    var app = angular.module('ngreq-app', ['ui.calendar', 'ui.bootstrap', 'ngSanitize']);

    app.config(['$httpProvider', function($httpProvider) {
          $httpProvider.defaults.withCredentials = true;
          $httpProvider.defaults.useXDomain = true;
    }])
    .controller('calendarCtrl', ['$scope', '$http', '$modal', '$compile', '$location',
        function ($scope, $http, $modal, $compile, $location) {

        /**Tutorial[S]**/
        tut.tutorialInit($scope, $location)
        /**Tutorial[E]**/

        /**Initial[S]**/
    //	$scope.goSettings = function(){
    //		window.location.href=settingsURL;
    //	}
        /**Initial[E]**/

        /**Retrieve user profile[S]**/
        var profileFunc = function(data){
            $scope.fstName = data.firstName;
            $scope.lstName = data.lastName;
            $scope.email = data.email;
            $scope.ctcNo = data.ctcNo;
            $scope.addr = data.addr;
            $scope.pstCd = data.pstCd;
            $scope.state = data.state;

            //get all states
            $http.get('/cache/json/mlystate.json').success(function(data){
                $scope.states = data;
            });

            //TODO: Handle if we cannot get user info.
            skycon.sendMessage($scope.state,(new Date().getTime()));
        }

        $scope.allowSetup = cookieAccess("Cal_Ctrl");


        getHTTP($http, userProfileURL, profileFunc);

        /**Retrieve user profile[E]**/

        /**Obtain user's date[S]**/
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        $scope.flag = false;
        /**Obtain user's date[E]**/

        /**Define Events[S]**/
        //temporary event is saved here.
        $scope.currEvents = [];
        $scope.events = {
                url:calendarURL,
                className: 'btn unreserved',
                xhrFields: {
                    withCredentials: true
                }
        };

        $scope.reservedEvents = {
                url: reservationURL,
                className: 'btn reserved',
                xhrFields: {
                    withCredentials: true
                }
        };

        $scope.pendingEvents = {
                url: pendingURL,
                className: 'btn pending',
                xhrFields: {
                    withCredentials: true
                }
        };

        /**Define Events[E]**/

        /**Each event clicks[S]**/
        $scope.alertOnEventClick = function( event, allDay, jsEvent, view ){

            //check type
            var bookType = $(this).hasClass('reserved')? 1:$(this).hasClass('pending')? 2:0;
            skycon.sendMessage($scope.state,(new Date(event.start).getTime()));
            $scope.currEvents = [];
            var currentContent = {
                    title: event.title,
                    start: new Date(event.start),
                    end: new Date(event.end),
                    allDay: event.allDay,
                    desc: event.desc,
                    booked: bookType,
                    userInfo: (typeof event.userInfo === 'undefined')? 0:event.userInfo,
                    conf: event.conf,
                    id: event._id
                            };
            $scope.currEvents.push(currentContent);
        };
        /**Each event Clicks[E]**/

        /**Date selections[S]**/
        $scope.alertEventOnClick = function( date, allDay, jsEvent, view ){
           skycon.sendMessage($scope.state,date);
        };
        /**Date selections[E]**/

        /**Add new activities[S]**/
        $scope.addEvent = function() {
            //Disabled. Never did work well in this version
        };
        /**Add new activities[E]**/

        /**Change to view month/day/week[S]**/
        $scope.changeView = function(view,calendar) {
          $scope.myCalendar.fullCalendar('changeView',view);
        };
        /**Change to view month/day/week[E]**/

        /**Tooltip[S]**/
        $scope.eventRender = function( event, element, view ) {
            element.attr({'tooltip': event.title,
                         'tooltip-append-to-body': true});
            $compile(element)($scope);
        };
        /**Tooltip[E]**/

        /**UI Configuration[S]**/
        $scope.uiConfig = {
          calendar:{
            height: 450,
            editable: false,
            ignoreTimezone: false,
            header:{
              left: 'title',
              center: '',
              right: 'today prev,next'
            },
            dayClick: $scope.alertEventOnClick,
            eventClick: $scope.alertOnEventClick,
            eventRender: $scope.eventRender
          }
        };
        /**UI Configuration[E]**/

        /**DialogBox[S]**/
        $scope.open = function (status, message) {

            if(typeof message === "undefined") message="";
            var modalInstance = $modal.open({
                 templateUrl: 'popupdialog.html',
                 controller: 'ModalInstanceCtrl',
                 resolve: {
                     status: function(){
                         return status;
                     },
                     message: function(){
                         return message;
                     }
                 }
             });
        }
        /**DialogBox[E]**/

        /**DialogBox Ver 2[S]**/
        $scope.openVer2 = function (userInfo, id, conf, email, ctcNo, addr, pstCd, state, errors) {
            if(typeof userInfo === 'undefined') userInfo = 0;
             var modalInstance = $modal.open({
             templateUrl: 'usercontent.html',
             controller: 'ModalUserReqCtrl',
             backdrop: 'static',
             resolve: {
                 errors: function(){
                     return (typeof errors==='undefined')?[]:errors;
                 },
                 id: function(){
                     return id;
                 },
                 conf: function(){
                     return conf;
                 },
                 userInfo: function(){
                     return userInfo;
                 },
                 email: function(){
                     return email;
                 },
                 ctcNo: function(){
                     return ctcNo;
                 },
                 addr: function(){
                     return addr;
                 },
                 pstCd: function(){
                     return pstCd;
                 },
                 state: function(){
                     return state;
                 },
                 listStates: function(){
                     return $scope.states;
                 }
             }
             });

             modalInstance.result.then(function (formData) {
                     if(typeof formData != 'undefined')
                         $scope.confirmBooking("POST", formData);
                }, function () {});


        }
        /**DialogBox Ver 2[E]**/

        /**Booking clicked**/
        $scope.ok = function(id, conf, userInfo){
            if(userInfo == 0)
                $scope.confirmBooking("POST", {_id: id, conf:conf, userInfo: 0});
            else{
                $scope.openVer2(userInfo, id, conf, $scope.email, $scope.ctcNo, $scope.addr, $scope.pstCd, $scope.state);
            }
        }

        /**Cancellation clicked**/
        $scope.cancel = function(id){
            $scope.confirmBooking("DELETE", {_id: id});
        }

        /**booking confirmation [S]**/
        $scope.confirmBooking = function(method, formData){

            if ($scope.flag) {
                return;
            }

            $scope.flag = true;

            $scope.formData = formData;

            var succFunc = function(data){
                $scope.flag = false;
                $scope.currEvents=[];
                $scope.myCalendar.fullCalendar( 'refetchEvents' );
                $scope.open('ok', method=="DELETE" ? "Booking Cancelled." : formData.conf ? "Booked. Your booking is now pending approval from the organizer.":"Booking Confirmed.");
            }
            var failFunc = function(data){
                $scope.flag = false;
                $scope.open('nak', data.error);
            }
            var errFunc = function(data){
                $scope.flag = false;
                if(method == "POST" && formData.userInfo !=0){
                    $scope.openVer2(formData.userInfo, formData._id, formData.conf, formData.email, formData.ctcNo, formData.addr, formData.pstCd, formData.state, data.errors);
                }else{
                    $scope.open('nak', data.error !== 'undefined' ? data.error : "Internal Server Error, please try again.");
                }
            }

            funcHTTP($http, method, reservationURL, $scope.formData, succFunc, failFunc, errFunc);
        }
        /**booking confirmation [E]**/

        /* event sources array - hack*/
        if($scope.tutorialRun){
            $scope.tutEvents = [];
            $scope.eventSources = [$scope.tutEvents];
        }else{
            $scope.eventSources = [$scope.events, $scope.reservedEvents, $scope.pendingEvents];
        }

    }])
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, status, message) {
      $scope.status = status=='ok'?true:false;

      if($scope.status){
          $scope.statMsg = message;
      }else{
          $scope.statMsg = message==""?"Booking Not Accepted.":message;
      }

      $scope.ok = function () {
        $modalInstance.close();
      };
    })
    .controller('ModalUserReqCtrl', function ($scope, $modalInstance, errors, id, conf, userInfo, email, ctcNo, addr, pstCd, state, listStates) {

        /**Check availability[S]**/
        $scope.checkUserInfo = function(action){

            var ternary = $scope.userInfo.toString(3);
            var position = -1;

            switch(action){
            case "Email":
                position = ternary.length-2;
                break;
            case "ContactNo":
                position = ternary.length-3;
                break;
            case "Address":
                position = ternary.length-4;
                break;
            }

            return position < 0? 0 : parseInt(ternary.charAt(position),10);
        }

        var isActValid = function(action){
            return ($scope.checkUserInfo(action) == 0 ? false : true);
        }

        $scope.isReq = function(action){
            return ($scope.checkUserInfo(action) == 2 ? true : false);
        }
        /**Check availability[E]**/

        /**Initialize[S]**/
        $scope.postalCd = /^[1-9][0-9]{0,4}$/;
        $scope.number = /^\+?[0-9]{0,13}$/;

        $scope.userInfo = userInfo;
        $scope.dtl_email = email;
        $scope.dtl_ctcNo = ctcNo;
        $scope.dtl_addr = addr;
        $scope.dtl_pstCd = pstCd;
        $scope.states = listStates;
        if(errors.length != 0)
            $scope.errors =  errors;
        else
            $scope.errors =  undefined;

        //Complex to select state, thanks to Angular :(
        var jsonState=eval("({'id':'"+state+"'})");
        $scope.dtl_state = $scope.states[_.findIndex($scope.states, jsonState)];

        $scope.isEmailShow = isActValid("Email");
        $scope.isContactNoShow = isActValid("ContactNo");
        $scope.isAddressShow = isActValid("Address");
        /**Initialize[E]**/

        $scope.dtl_ok = function () {
            if($scope.detail.$valid){
                var formData = {
                    _id: id,
                    conf: conf,
                    userInfo: $scope.userInfo
                };

                if($scope.isEmailShow)
                    formData.email = $scope.dtl_email;
                if($scope.isContactNoShow)
                    formData.ctcNo = $scope.dtl_ctcNo;
                if($scope.isAddressShow){
                    formData.state = $scope.dtl_state.id;
                    formData.pstCd = $scope.dtl_pstCd;
                    formData.addr = $scope.dtl_addr;
                }
                $modalInstance.close(formData);
            }

        };
        $scope.dtl_cancel = function () {
            $modalInstance.close();
        };
    });
    /**Pop up dialog[E]**/

    function obtainDay(date){
        return moment(date).format("DD");
    }

    return angularAMD.bootstrap(app);
});