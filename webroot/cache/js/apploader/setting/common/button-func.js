'use strict';
/**
* Cancel operation
*/
function cancelBtn(){
    //read the previous page.
    var prvPg = document.referrer;

    if(prvPg.indexOf("/selfservice/") == -1){
        prvPg=homeURL;
    }
    window.location.href=prvPg;
}


/**
 * Site to be redirected to
 */
function redirectPage(){
    window.location.href=homeURL;
}