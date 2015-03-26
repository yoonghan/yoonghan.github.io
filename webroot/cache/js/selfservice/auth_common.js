'use strict';

/**
 * Create a fragmented document to indicate processing.
 * @param htmlStr
 * @returns
 */
function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}
var fragment = create('<div class="processInd animated infinite flipInX" id="auth_common_lbl" >Processing...</div>');
document.body.insertBefore(fragment, document.body.childNodes[0]);

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
	
	var redirectURL = "/errors/unauthorized_401";

	if(status == 401){
    	location.href=redirectURL;
    	return true;
    }else{
    	//should find a way to log error.
    }
	return false;
}

/**
 * HTTP METHOD function that return error page if error is 401.
 * @param $http
 * @param url
 * @param func
 */
function funcHTTP($http, _method, _url, _data, succfunc, failfunc, errfunc){

	//$("#auth_common_lbl").show();
	angular.element(document.querySelector('#auth_common_lbl')).css('display','inline');

	$http({
        method  : _method,
        url     : _url,
        data    : _data,
        headers: {'Content-Type': 'application/json'}
    })
    .success(function(data) {
    	//$("#auth_common_lbl").hide();
    	angular.element(document.querySelector('#auth_common_lbl')).css('display','none');
        if (data.success) {
        	succfunc(data);
        }else{
        	failfunc(data);
        }
    })
    .error(function(data, status){
    	//$("#auth_common_lbl").hide();
    	angular.element(document.querySelector('#auth_common_lbl')).css('display','none');
    	if(errorAction(status) == false){
    		if(data == null){
    			data={errors:["We encountered server exception, please try again."]};
    		}
    		errfunc(data);
    	}
    });
}

/**
 * Image loader
 */
function imgLoaded(img){
    var imgWrapper = img.parentNode;

    imgWrapper.className += imgWrapper.className ? ' loaded' : 'loaded';
};