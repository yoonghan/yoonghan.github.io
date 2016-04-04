"use strict";
/**
 * Created to read play cookie
 **/

var Cal_AccType = "Cal_Ctrl";
var Cal_AccType_Val = 2;
var Exist = 0;

function readCookie(type){
	var returnVal = "";
	switch(type){
	case 0:
		var cookie = document.cookie;
		if(typeof cookie === 'undefined')
			returnVal = undefined;
		else
			var idx = cookie.indexOf("&accLvl=");
			returnVal = idx == -1? "0" : cookie.substring(cookie.indexOf("&accLvl=")+8,cookie.length-1)
		break;
	}
	return returnVal;
}

function cookieAccess(access){
	var cookieVal = readCookie(0);
	var boolValid = false;
	switch(access){
	case Exist:
	    boolValid=(cookieVal != 'undefined')
	    break;
	case Cal_AccType:
		boolValid=(parseInt(cookieVal) & Cal_AccType_Val);
		break;
	}
	return boolValid;
}