'use strict';

var redirectURL = "http://localhost:8000/errors/unauthorized_401";

/**
 * HTTP GET function that return error page if error is 401.
 * @param $http
 * @param url
 * @param func
 */
function getHTTP($http, url, succfunc){
	/**Retrieve user profile[S]**/
	$http.get(url).success(function(data){
		succfunc(data);
    }).error(function(data, status) {
        errorAction(status);
    });
	/**Retrieve user profile[E]**/
}

function errorAction(status){
	if(status == 401){
    	location.href=redirectURL;
    }else{
    	//should find a way to log error.
    }
}