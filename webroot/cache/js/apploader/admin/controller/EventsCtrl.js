define(['app'], function (app) {
    app.controller('EventsCtrl', function($scope, $http, $location, $filter, calendar) {
        /**Init[S] **/
        $scope.predicate = "start";
        $scope.reverse = false;

           $scope.currentPage = 1;
           $scope.pageSize = 50;
           $scope.totalAmt = 1;
           $scope.pageChanged = function(){
           }

        if(calendar.length != 0) {
            calendar.splice(0, calendar.length);
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
            $scope.bookingList=calendar;
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
                        conf: currElem.conf,
                        close: true,
                        info: []
                        };
                $scope.bookingList.push(info);
            }
            data = null;
        }

        getHTTP($http, bookingListURL, bookingListFunc);
        /**Retrieve user profile[E]**/

        /**Check reporting allow[S]**/
        var allowReportFunc = function(data){
            var value = data;
            if(typeof data !== 'undefined'){
                if(typeof data.success !== 'undefined'){
                    $scope.rpt_allowed = true;
                }
            }
        }
        getHTTP($http, reportURL, allowReportFunc);
        /**Check reporting allow[E]**/

        $scope.genReport= function(){
            var succFunc = function(data){
                $scope.rpt_disabled = true;
            }
            var failFunc = function(data){
                $scope.showAlert("error",data.error)
            }
            var errFunc = function(data){
                $scope.showAlert("error","Please try again later, or inform the admin.")
            }

            funcHTTP($http, "POST", reportGenUrl, {}, succFunc, failFunc, errFunc);
        }

        $scope.listUsers = function(id){
            var oid = id.$oid;
            $location.url('userlist/'+oid);
        }
    });
})