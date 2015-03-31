'use strict';
(function(global){
        /**
        * Cancel operation
        */
        var cancelBtn = function(){
            //read the previous page.
            var prvPg = document.referrer;

            if(prvPg.indexOf("/selfservice/") == -1){
                prvPg=homeURL;
            }
            window.location.href=prvPg;
        };


        /**
         * Site to be redirected to
         */
        var redirectPage=function(){
            window.location.href=homeURL;
        };

    global.cancelBtn = cancelBtn;
    global.redirectPage = redirectPage;

}(this));