//var txtlog = document.getElementById("TextArea1");


var ws_cmd = null;
var cmd_svc_port = 10890;
var cmd_svc_connect = false;
var ComPort_I = '1';
//扇区号
var SectorID_I ='1' ;
//块号
var BlockID_I = '0';
//指令服务端口：10890

//指令服务四个端口：10889, 11487, 32548, 48570

function OnCmdPortChanged(obj){
	if(obj.checked)
	{
		switch(obj.value)
		{
		case "port_10889":
			cmd_svc_port = 10890;
			break;
		}
	}
}

function connect_cmd_svc() {
	if(cmd_svc_connect == true){
		//("已连接指令服务器");
//		txtlog.value = "已连接指令服务器" ;
		return;
	}

	var url = "ws://localhost:" + cmd_svc_port + "/";
	if ('WebSocket' in window)
	{
		ws_cmd = new WebSocket(url);
		ws_cmd.binaryType = "arraybuffer";
	}
	else if ('MozWebSocket' in window)
	{
		ws_cmd = new MozWebSocket(url);
		ws_cmd.binaryType = "arraybuffer";
	}
	else
	{
		//alert("浏览器不支持WebSocket");
//		txtlog.value = "浏览器不支持WebSocket" + txtlog.value;
	}
	cmdWebSocketEvent();
}

function cmdWebSocketEvent()
{
	ws_cmd.onopen = function()
	{
		cmd_svc_connect = true;
		//alert("成功连接指令服务器");
//		txtlog.value = "成功连接指令服务器" ;

		//成功连接服务器后，需要发送身份验证消息
		//身份验证格式: {"id": 1000}
		//成功收到验证反馈消息: {"id": 1001, "status": "success"}，说明为CZUR提供
		//ws_cmd.send('{\"id\": 1000}');
	}

	ws_cmd.onmessage = function(e)
	{
		var jsonObj = window.JSON.parse(e.data);
		switch(jsonObj.id){
			//身份验证反馈消息
		
			case 1001:{
//				txtlog.value = "指令服务器身份验证成功: " + jsonObj.status + "\r\n" + txtlog.value;
			}
			break;
			//读M1卡
			case 204:{
				if(jsonObj.hasOwnProperty("error")){
					var text = "读M1卡失败: " + jsonObj.error + "\r\n";
//					txtlog.value = text + txtlog.value;
				}
				else{
					var text = "读M1卡成功: " +  "\r\n";
					var text = "M1卡信息: " + jsonObj.userInfo + "\r\n";
//					txtlog.value = text + txtlog.value;
					$("#cardnum").val(jsonObj.userInfo);
				}
			}
			break;
			//读二代证
			case 200:{
				if(jsonObj.hasOwnProperty("error")){
					var text = "读二代证失败: " + jsonObj.error + "\r\n";
//					txtlog.value = text + txtlog.value;
				}
				else{				
					/*var Name = document.getElementById("Name");
					Name.value = jsonObj.Name;
					var Sex = document.getElementById("Sex");
					Sex.value = jsonObj.Sex;
					var Nation = document.getElementById("Nation");
					Nation.value = jsonObj.Nation;
					var Birthday = document.getElementById("Birthday");
					Birthday.value = jsonObj.Birthday;
					var Address = document.getElementById("Address");
					Address.value = jsonObj.Address;
					var ID = document.getElementById("ID");
					ID.value = jsonObj.ID;
					var Department = document.getElementById("Department");
					Department.value = jsonObj.Department;
					var StartDate = document.getElementById("StartDate");
					StartDate.value = jsonObj.StartDate;
					var EndDate = document.getElementById("EndDate");
					EndDate.value = jsonObj.EndDate;
					var Reserve = document.getElementById("Reserve");
					Reserve.value = jsonObj.Reserve;
					var AppAddress1 = document.getElementById("AppAddress1");
					Reserve.value = jsonObj.AppAddress1;
					document.all['PhotoDisplay'].src = jsonObj.PhotoPath+"zp.bmp"; */
					//成功
					//根据id查询his信息
					$("#idcard").val(jsonObj.ID);
					$("#cardnum").val('');
//					txtlog.value = "读二代证成功\r\n" ;
				}
			}
			break;
		}
	}

	ws_cmd.onclose = function()
	{
		cmd_svc_connect = false;
		//alert("未连接指令服务器");
//		txtlog.value = "未连接指令服务器" + txtlog.value;
	}
}


function ReadIdCard(){
	var ComPort = '1';
	var PhotoPath = '';
	var data = '{\"id\": 0, \"ComPort\": ' + ComPort + ', \"PhotoPath\": ' + '\"'+ PhotoPath +  '\"'+'}';
	ws_cmd.send(data);
}



function ClearText(){
	
	document.all['TextArea1'].value = ''; 
	document.all['PhotoDisplay'].src = ''; 
}

function ReadMione(){
//	var ComPort_I = document.getElementById("ComPort_I").value;
//	var SectorID_I = document.getElementById("SectorID_I").value;
//	var BlockID_I = document.getElementById("BlockID_I").value;
	
	var data = '{\"id\": 4, \"ComPort\": ' + ComPort_I + ', \"SectorID\": ' + SectorID_I + ', \"BlockID\": ' + BlockID_I+'}';
	ws_cmd.send(data);
}