var websocket = '';
var ajaxPageNum = 1;
var last_health;
var health_timeout = 10;
var rightIndex;
/*
 * 发送示例
 * sendwsmessage("#userId()", "refresh");
 */
function initWs(user) {
	
    if (window.WebSocket) {
        websocket = new WebSocket(
                encodeURI('ws://' + document.domain + ':8886'));
        websocket.onopen = function() {
            console.log('已连接');
            //后台在线
            sendwsmessage(user,"online");
            heartbeat_timer = setInterval(function() {
                keepalive(websocket);
            }, 60000);
        };
        websocket.onerror = function() {
            console.log('连接发生错误');
        };
        websocket.onclose = function() {
            console.log('已经断开连接');
            initWs(user);
        };
        // 消息接收
        websocket.onmessage = function(message) {
            var mes = message.data;
            //在这里写接收到指令后的操作
            if(mes=="SH_CallMes"){
            	try {
                    if(typeof(initPre) == "function") { //是函数    其中 FunName 为函数名称
                    	if(showPre){
                    		$(".calling").show();
                    	}
                 	   console.log("显示通话");
                    } else { //不是函数
                    	console.log("当前用户不在接诊页面");
                    }
                } catch(e) {
                	console.log(e);
                	console.log("出现异常");
                }
             }
        };
    } else {
        alert("该浏览器不支持websocket。<br/>建议使用高版本的浏览器，<br/>如 IE10、火狐 、谷歌  、搜狗等");
    }
}


// 心跳包
function keepalive(ws) {
    var time = new Date();
    if (last_health != -1 && (time.getTime() - last_health > health_timeout)) {
        // ws.close();
    } else {
        if (ws.bufferedAmount == 0) {
            ws.send('~HC~');
        }
    }
}

//发送ws数据到后台
function sendwsmessage(user,mesType) {
	var param = '{"user" :"'+user+'","mesType":"'+ mesType + '"}';
	websocket.send(param);
}
