'use strict';
define(['jquery'], function ($) {
    return{

        tutorialInit:function ($scope, $location){

            var msg = [
                       [0,"Let's begin our tutorial by navigate with the <strong>Right(&raquo;)</strong> buttons below to proceed.<br>To return to your previous step click the <strong>Left(&laquo;)</strong> button."],
                       [1,"To start, we will begin with the need to change your <strong>Profile Settings</strong>. Click on the blinking button on top right which indicates <strong>Settings</strong> or, click the button here to proceed: <a class='btn btn-primary' href="+settingsURL+"#/?tut=1'>Continue tutorial</a>."]
                      ];

            var msg_2 = [
                       [0,"After you've changed your settings, your booking will be made here with this link/screen.<br>All available events that you have subscribed to will be displayed here."],
                       [1,"As tutorial, you've subscribed to <strong><i>JOM Jaring</i></strong>&copy; account in your subscription profile. Check out <strong>Today's</strong> <i>My Demo Event</i>."],
                       [2,"<i>Now, let's start a reservation!</i> Click on the blinking event and you'll see the event being displayed in <strong>Scheduled Events</strong> dialog.<br><strong>Try it !</strong>"],
                       [3,"The <strong>Scheduled Events</strong> dialog, displays your booking status, which includes the date, time(as demo this a full day event, hence the unavailability) and an explanation of the event by the publisher."],
                       [4,"Click on the <strong>Book</strong> button under Scheduled Event and you will be confirmed.<br><strong>Try it !</strong>"],
                       [5,"Your confirmed booking will have a different style. Click on the event again and see the <strong>Scheduled Event</strong> stated reserved.<br><strong>Try it !</strong>"],
                       [6,"<i>Now, let's cancel your reservation!</i> Click on <strong>Cancel Booking</strong> button under <strong>Scheduled Events</strong> dialog.<br><strong>Try it !</strong>"],
                       [7,"Your reservation is now cancelled(if you followed the tutorial that is!) and the event will be returned to it's normal status.<br><strong>Note: </strong>Sometimes your event cannot be cancelled or reserved. But this will not be covered in this tutorial."],
                       [8,"Your can change your view settings as well based on <strong>Day</strong>,<strong>Week</strong> and <strong>Month</strong> under the <strong>Calendar</strong> dialog."],
                       [9,"If you noticed, there is a weather forecast under <strong>Weather Forecast</strong> dialog. The weather changes based on your selected dates.<br><strong>Note:</strong> Response will/may have <strong>delays</strong> depending on your network."],
                       [10,"Click on any of the dates in the calendar and the <strong>weather prediction</strong> around your <strong>state</strong> will be displayed.<br><strong>Try it !</strong>"],
                       [11,"You have completed your tutorial. To exit click on the button: <a class='btn btn-primary btnTutNextScreen' href='/selfservice/booking/calendar?'>Complete</a>.<br>Thank you for your participation."]
                       ];
            var firstTrigger = false;

            var makeAnimation = function(id){
                switch(id){
                case 1:
                    $('#btnSetting').addClass("tutorialblink");
                    //override the settings button.
                    var settingURL = $('#btnSetting').attr("href");

                    $('#btnSetting').attr("href",settingsURL+"#/?tut=1");
                    break;
                default:
                    break;
                }

            }

            /**Override all triggers**/
            var overrideTriggers = function(){

                var addEvent = {title: 'My Demo Event',desc: 'This is just a demo event', start: new Date(),end: new Date(), allDay: true, id: 'demo', className:'tutorialblink unreserved'};
                var removeEvent = {title: 'A new Demo Event',desc: 'This is just a demo event', start: new Date(),end: new Date(), allDay: true, id: 'demo', className:'reserved'};

                $scope.tutEvents.push(addEvent);

                $scope.confirmBooking = function(method, id){
                    if(method=='POST'){
                        $scope.tutEvents.splice(0,1);
                        $scope.tutEvents.push(removeEvent);
                        $scope.currEvents=[];
                        $scope.open('ok', 'Demo - Successfully booked.');
                    }else if(method=='DELETE'){
                        $scope.tutEvents.splice(0,1);
                        $scope.tutEvents.push(addEvent);
                        $scope.currEvents=[];
                        $scope.open('ok', 'Demo - Successfully cancelled.');
                    }
                }
            }

            var makeAnimation_2 = function(id){
                switch(id){
                case 1:
                    if(!firstTrigger){
                        firstTrigger = true;
                        overrideTriggers();
                    }
                    break;
                }
            }

            var msgType = msg;
            var animationFunc = makeAnimation;

            $scope.tutorialChgMessage = function(s_count){
                $scope.tut_last=false;
                $scope.tut_first=false;

                if($scope.count+s_count <= 0){
                    $scope.tut_first=true;
                }else if($scope.count+s_count >= msgType.length-1){
                    $scope.tut_last=true;
                }

                $scope.count += s_count;
                var msgCounter = msgType[$scope.count];
                animationFunc(msgCounter[0]);
                $scope.tutorialMsg = msgCounter[1];
            }

            var tutorialOn = $location.search().tut;
            if(tutorialOn != undefined){
                $scope.count = 0;
                $scope.tutorialRun = true;
                if(tutorialOn == 1){
                    msgType = msg;
                    animationFunc = makeAnimation;
                }else if(tutorialOn == 2){
                    msgType = msg_2;
                    animationFunc = makeAnimation_2;
                }

                $scope.tutorialChgMessage(0);
            }
        }
    }
});