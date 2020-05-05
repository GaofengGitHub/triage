package com.chenwei.socket;

import java.io.BufferedInputStream;
import java.io.BufferedReader;  
import java.io.DataInputStream;
import java.io.IOException;  
import java.io.InputStream;
import java.io.InputStreamReader;  
import java.io.OutputStream;
import java.io.PrintWriter;  
import java.net.*;  
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;  

  
/** 
 * socket 线程类 
 * @author yling 
 * 
 */  
public class SocketThread extends Thread{  
    private ServerSocket serverSocket = null;    
    public SocketThread(ServerSocket serverScoket){  
        try {  
            if(null == serverSocket){  
                this.serverSocket = new ServerSocket(8888);  
                System.out.println("socketListen start");  
            }  
        } catch (Exception e) {  
            System.out.println("SocketThread创建socket服务出错");  
            e.printStackTrace();  
        }  
  
    }  
      
    public void run(){
    	
        while(!this.isInterrupted()){  
            try {  
                Socket socket = serverSocket.accept();
                
                SocketAction.getSocketList().add(socket);
						
				System.out.println("socket客户端:"+ socket.getInetAddress()+"已连接到服务器"+ "\t通信端口号: " + socket.getPort());
						
				if(null != socket && !socket.isClosed()){     

		                	new SocketOperate(socket).start(); 

					
				}
				               
                //长连接
                //socket.setSoTimeout(30000);
            }catch (Exception e) { 
            	
                e.printStackTrace();  
            }  
        }  
    }  
      
      
    public void closeSocketServer(){  
       try {  
            if(null!=serverSocket && !serverSocket.isClosed())  
            {  
             serverSocket.close();  
            }  
       } catch (IOException e) {  
        // TODO Auto-generated catch block  
        e.printStackTrace();  
       }  
     }  
      
      
      
      
      
      
}  
