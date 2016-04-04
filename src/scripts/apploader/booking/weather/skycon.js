'use strict';
(function(global){
    define(['skycon','moment'], function (skycon, moment) {
        /**Start skycon[S]**/
        var skycons = new Skycons({"color": "#09F"});
        skycons.add("weatherIcon", Skycons.UNKNOWN);
        skycons.play();
        /**Start skycon[E]**/

        /**Init [S]**/
        var ws = new WebSocket(weatherSocketURL);
        initWebSocket(ws);
        /**Init [E]**/

        /**Date Func [S]**/
        function obtainDate(date, idx){
            switch(idx){
            case 0:
                return moment(date).format("MMM Do, YYYY hh:mm");
            case 1:
                return moment(date).format("MMM Do, YYYY");
            }
        }
        /**Date Func [E]**/

        /**Web socket only[S]**/
        function initWebSocket(ws){
            ws.onmessage = function( event ){
                var receivedJson = JSON.parse(event.data);
                var icon = Skycons.UNKNOWN;

                switch(receivedJson.icon){
                    case "clear-day":
                        icon = Skycons.CLEAR_DAY;
                        break;
                    case "clear-night":
                        icon = Skycons.CLEAR_NIGHT;
                        break;
                    case "rain":
                        icon = Skycons.RAIN;
                        break;
                    case "snow":
                        icon = Skycons.SNOW;
                        break;
                    case "sleet":
                        icon = Skycons.SLEET;
                        break;
                    case "wind":
                        icon = Skycons.WIND;
                        break;
                    case "fog":
                        icon = Skycons.FOG;
                        break;
                    case "cloudy":
                        icon = Skycons.CLOUDY;
                        break;
                    case "partly-cloudy-day":
                        icon = Skycons.PARTLY_CLOUDY_DAY;
                        break;
                    case "partly-cloudy-night":
                        icon = Skycons.PARTLY_CLOUDY_NIGHT;
                        break;
                    default:
                        icon = Skycons.UNKNOWN;
                        break;
                };
                if(icon == Skycons.UNKNOWN){
                    skycons.remove("weatherIcon")
                }else{
                    skycons.set("weatherIcon", icon);
                    $("#weatherMessage").text(receivedJson.summary)
                    var date = new Date(eval(receivedJson.date));
                    $("#weatherDate").text(obtainDate(date, 1));
                }

            }

            ws.onclose = function(){
                console.log("Connection closed");
            }
        }

        function waitForSocketConnection(socket, callback){
            setTimeout(
                function(){
                    if (socket.readyState === 1) {
                        if(callback !== undefined){
                            callback();
                        }
                        return;
                    }else {
                        waitForSocketConnection(socket,callback);
                    }
                }, 5);
        };

        return{
            sendMessage:function(state,time) {
                waitForSocketConnection(ws, function() {
                    ws.send('{"state":"'+state+'", "date":"'+time+'"}');
                });
            }
        }
        /**Web socket only[E]**/
    });
}(this));