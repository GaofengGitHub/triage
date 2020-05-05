package com.chenwei.websocket;

import java.net.InetSocketAddress;

import org.java_websocket.WebSocket;
import org.java_websocket.WebSocketImpl;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;

public class WebsocketServer extends WebSocketServer {
    public WebsocketServer(int port) {
        super(new InetSocketAddress(port));
    }

    public WebsocketServer(InetSocketAddress address) {
        super(address);
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        // ws连接的时候触发的代码，onOpen中我们不做任何操作

    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        //断开连接时候触发代码
        userLeave(conn);
        System.out.println(reason);
    }

    //2018-11-23 by yling
    //  具体逻辑在此方法写
    @Override
    public void onMessage(WebSocket conn, String message) {
        //System.out.println(message);
        //1.去除心跳包
        if((null != message)&&(!StrUtil.equals("~HC~", message))){
        	//2.判断 是否json格式
        	if(JSONUtil.isJson(message)){
        		JSONObject mes= JSONUtil.parseObj(message);
        		String mesType = mes.getStr("mesType");
        		String user = mes.getStr("user");
        		
        		if(StrUtil.equals("online", mesType)){
        			System.out.println("分诊用户加入:"+user);
        			userJoin(conn,user);//用户加入
        			//用户增加 护理记录
        		}else if(StrUtil.equals("RF_BedInfo", mesType)){
        			System.out.println(message);
        			if(StrUtil.equals("all", user)){
        				WebsocketPool.sendMessageToAll("RF_BedInfo");
        			}else{
        				WebSocket ws = WebsocketPool.getWsByUser(user);
        				WebsocketPool.sendMessageToUser(ws, "RF_BedInfo");
        			}
        		/*	WebSocket ws = WebsocketPool.getWsByUser(user);
        			WebsocketPool.sendMessageToUser(ws, "refresh");*/
        		}else if(StrUtil.equals("offline", mesType)){
        			System.out.println("用户退出:"+user);
        			userLeave(conn);
        		}
        	}
        }
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        //错误时候触发的代码
        System.out.println("on error");
        ex.printStackTrace();
    }
    /**
     * 去除掉失效的websocket链接
     * @param conn
     */
    private void userLeave(WebSocket conn){
        WebsocketPool.removeUser(conn);
    }
    /**
     * 将websocket加入用户池
     * @param conn
     * @param userName
     */
    private void userJoin(WebSocket conn,String userName){
    	WebsocketPool.addUser(userName, conn);
    }
    public static void main(String args[]){
        WebSocketImpl.DEBUG = false;
        int port = 8887; // 端口
        WebsocketServer s = new WebsocketServer(port);
        s.start();
    }
}