'use strict';

/**
 * HTTP GET function that return error page if error is 401.
 * @param $http
 * @param url
 * @param func
 */
function getHTTP($http, url, succfunc){
	$http.get(url).success(function(data){
		succfunc(data);
    }).error(function(data, status) {
        errorAction(status);
    });
}

function errorAction(status){
	
	var redirectURL = "http://localhost:8000/errors/unauthorized_401";
	
	if(status == 401){
    	location.href=redirectURL;
    	return true;
    }else{
    	//should find a way to log error.
    }
	return false;
}

/**
 * HTTP GET function that return error page if error is 401.
 * @param $http
 * @param url
 * @param func
 */
function funcHTTP($http, _method, _url, _data, succfunc, failfunc, errfunc){
	
	$http({
        method  : _method,
        url     : _url,
        data    : _data,
        headers: {'Content-Type': 'application/json'}
    })
    .success(function(data) {
        if (data.success) {
        	succfunc(data);
        }else{
        	failfunc(data);
        }
    })
    .error(function(data, status){
    	if(errorAction(status) == false)
    		errfunc(data);
    });	
}