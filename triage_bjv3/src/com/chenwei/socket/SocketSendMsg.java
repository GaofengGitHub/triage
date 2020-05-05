package com.chenwei.socket;

import java.io.BufferedReader;  
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;  
import java.io.InputStream;  
import java.io.InputStreamReader;  
import java.io.OutputStream;
import java.io.PrintWriter;  
import java.net.Socket;  
  


import java.util.ArrayList;

import javax.servlet.ServletContext;  

//import com.util.ByteUtil;
  
/** 
 * 多线程处理socket发送数据 
 * @author tl 
 * 
 */  
 public class SocketSendMsg extends Thread{
		 
		 		 
	 private Socket socket; 
	 
	 private  byte[] result;
	   
	 public SocketSendMsg(Socket socket,byte []rs) {  
		 
	   this.socket=socket; 
	   this.result=rs; 
	 }
	     
	 

 
     @SuppressWarnings("unused")  
	  public void run() { 
		    	 
		        try{   
		        	
		        
		  
                   InputStream in= socket.getInputStream();//获取服务器端的返回流
                   
                   DataOutputStream out = new DataOutputStream(socket.getOutputStream());//输出数据到服务器端的流
                   
                   ByteArrayOutputStream bos = new ByteArrayOutputStream();  
		                            
                   out.write(result);
                    
                   out.flush(); 
		        	
		         
		        } catch (Exception e) {
				// TODO Auto-generated catch block
					e.printStackTrace();
					
		        }finally{     
	                
	            }     
     }  
 }
