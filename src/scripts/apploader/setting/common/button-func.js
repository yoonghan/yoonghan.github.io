'use strict';
define([], function() {
  return{
    /**
    * Cancel operation
    */
    cancelBtn: function() {
      var prvPg = document.referrer;

      if(prvPg.indexOf("/site/selfservice/") == -1){
          prvPg=homeURL;
      }
      window.location.href=prvPg;
    },
    /**
     * Site to be redirected to
     */
    redirectPage: function() {
      window.location.href=homeURL;
    }
  };
});
