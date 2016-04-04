define(['app'], function (app) {

  var month=["January","February","March","April","May","June","July","August","September","October","November","December"];

  angular.module('calFilters', [])
  .filter('calfilter', function() {
    return function(input) {
  	var d = new Date(eval(input));
      return d.getFullYear() + " / " + month[d.getMonth()];
    };
  });
});
