'use strict';
define(['jquery'], function ($) {
    return{
        tutorialInit:function($scope, $location, $timeout){

            var msg = [
                       [0,"This is the <strong>Settings</strong> page. You need to subscribe to a company to view any reservation event's. In this tutorial, we'll guide you on the profile setup process."],
                       [1,"On contrary, take <strong>note</strong> that this is a live demo; any changes will affect your current account. <br>For this demo, the Return button has been <strong>disabled</strong>."],
                       [2,"The <strong>Save</strong> button at the bottom of the page is to confirm that your changes are to be made. Look at the blinking button below <i>(you might need to scroll down)</i>."],
                       [3,"The <strong>Return</strong> button at the bottom of the page is to return to your booking schedule. Look at the blinking button below <i>(you might need to scroll down)</i>. <br>This button is currently <strong>Disabled</strong>"],
                       [4,"The <strong>Reminder</strong> tab below shows the available list of reminder you can make. <br>Below shows the form details."],
                       [5,"The <strong>Profile</strong> tab highlights your profile. <br>Below shows the form details."],
                       [6,"The <strong>Subscription</strong> tab below shows the available list of booking you can make. <br>Below shows the form details."],
                       [7,"Some fields provide a filter. By entering your search text, the list will match your search text. Removing the text in the search fields will show all the datas."],
                       [8,"Let's try it on the <strong>Filter Company Name:</strong> text box.<br><strong>Try it!</strong>"],
                       [9,"Take note, all changes are <strong>not modified</strong> when the filter is used <i>(unless specified)</i>. Hence everything you have selected previously will still remain.<br>"],
                       [10,"Lastly as tutorial, you are subscribed to <strong><i>JOM Jaring&copy;</i></strong> account for this demo.<br><strong>Optional:</strong> Subscribe to one of the Company's event and click save, if you are ready. This way you are ready to do your reservation after the tutorial ended."],
                       [11,"This completes the Settings. Let us return to the Calendar page, by clicking on the button here: <a class='btn btn-primary btnTutNextScreen' href='/selfservice/booking/calendar#/?tut=2'>Return to calendar</a>."]
                       ];

            function makeAnimation(id){
                switch(id){
                case 0:
                    $timeout(function() {
                        angular.element('#lnk_subscription').trigger('click');
                    },0);
                    $scope.cNameSearch="Not Valid";
                case 1:
                    $('#save').removeClass("tutorialblink");
                    break;
                case 2:
                    $('#cancel').removeClass("tutorialblink");
                    $('#save').addClass("tutorialblink");
                    break;
                case 3:
                    $timeout(function() {
                        angular.element('#lnk_subscription').trigger('click');
                    },0);
                    $('#save').removeClass("tutorialblink");
                    $('#cancel').addClass("tutorialblink");
                    break;
                case 4:
                    $('#cancel').removeClass("tutorialblink");
                    $timeout(function() {
                        angular.element('#lnk_reminder').trigger('click');
                    },0);
                    break;
                case 5:
                    $timeout(function() {
                        angular.element('#lnk_profile').trigger('click');
                    },0);
                    break;
                case 6:
                    $('#cNameSearch').removeClass("tutorialblink");
                    $timeout(function() {
                        angular.element('#lnk_subscription').trigger('click');
                    },0);
                    break;
                case 7:
                    $timeout(function() {
                        angular.element('#lnk_subscription').trigger('click');
                    },0);
                    $('#cNameSearch').addClass("tutorialblink");
                    $scope.cNameSearch="Here's a sample";
                    break;
                case 8:
                    $timeout(function() {
                        angular.element('#lnk_subscription').trigger('click');
                    },0);
                    $('#cNameSearch').addClass("tutorialblink");
                    $scope.cNameSearch="";
                    $scope.tutSample=false;
                    break;
                case 9:
                    $('#cNameSearch').removeClass("tutorialblink");
                    $scope.tutSample=false;
                    break;
                case 10:
                    $timeout(function() {
                        angular.element('#lnk_subscription').trigger('click');
                    },0);
                    $scope.tutSample=true;
                    break;
                default:
                    break;
                }
            }

            $scope.tutorialChgMessage = function(s_count){
                $scope.tut_last=false;
                $scope.tut_first=false;

                if($scope.count+s_count <= 0){
                    $scope.tut_first=true;
                }else if($scope.count+s_count >= msg.length-1){
                    $scope.tut_last=true;
                }

                if($scope.count+s_count < 0 || $scope.count+s_count > msg.length-1)
                    return

                $scope.count += s_count;
                var msgCounter = msg[$scope.count];
                makeAnimation(msgCounter[0]);
                $scope.tutorialMsg = msgCounter[1];
            }

            var tutorialOn = $location.search().tut;
            if(tutorialOn != undefined){

                $scope.count = 0;
                $scope.tutorialRun = true;

                $scope.tutorialChgMessage(0);
            }
        }
    }
});