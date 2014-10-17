/*! Function to remove menu's from listing*/
function replaceMenu(menu,replaceMenu){
var toReplace = "<li><a href=[a-z|A-Z|\\.|/|\\\"]*>"+replaceMenu+"<\\/a><\\/li>";
var message = (menu && replaceMenu?eval("menu.replace(/"+toReplace+"/i,\"\")"):menu);
return message;
}