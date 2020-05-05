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

  
/** 
 * 多线程处理socket接收的数据 
 * @author yling 
 * 
 */  
 public class SocketOperate extends Thread{
		 
		 
		 
	     private Socket socket;  
	       
	     public SocketOperate(Socket socket) {  
	    	 
	       this.socket=socket;  
	     }
	     
     @SuppressWarnings("unused")  
	  public void run() { 
		    	 
		            try{     
		  
		                InputStream in= socket.getInputStream();//获取服务器端的返回流
 
		  
		                //PrintWriter out=new PrintWriter(socket.getOutputStream());
		                DataOutputStream out = new DataOutputStream(socket.getOutputStream());//输出数据到服务器端的流
		
		                ByteArrayOutputStream bos = new ByteArrayOutputStream();  

		                while(true){    
		                    //读取客户端发送的信息  
				                    String strXML = ""; 
				                    String resultXML ="";
				                    byte[] temp = new byte[4096];  
				                    int  length = -1;
				                    int  index;
				                    byte[] result = null;
				                    
				    				
				                    
				                    
				                    while((length = in.read(temp)) != -1){
				                    	 System.out.println(length);
				                    			           
				                    	 bos.write(temp, 0, length); 
				                    	 
				                    	 if(bos.size()>0){
				                    		 break;
				                    	 }
				                    	 /*
				                    	 //判断是否信息结束
				                    	 byte[] xx= bos.toByteArray();
				                    	 byte[] b = new byte[2]; 
				                    	 b[0] = xx[xx.length-2];
				                    	 b[1] = xx[xx.length-1];
				                    	 String end = ByteUtil.bcd2Str(b);
				                    	 //System.out.println(end);
				                    	 if(end.equalsIgnoreCase("0C0D")){
				                    		 break;
				                    	 }
				                    	 */
				                    }
				                    byte[] mes= bos.toByteArray(); 
				                    //System.out.println(mes.toString());
				                    bos.reset();
				                   
				                    /*if(mes.length>13){     
				                        System.out.println("准备关闭socket");  
				                        break;   
				                    }    
				                     */ 
				                    
				                    if(mes.length == 0){
				                 	   continue;
				                    }
				                    //new SocketAction().updateMach("已连接");
				                    synchronized (SocketOperate.class) { 
				                    	
				                      new SocketAction().receiveData(socket,mes);//接收   
				                       
				                    }
				                    /*out.write(result);
				                    
				                    out.flush(); */
				                   
				                    if(length == 1){
				                	   break;
				                    }
				                        
		                }
		                
		                if(out!=null){
		                	
		                   out.close();
		                }
		                socket.close(); 
		                SocketAction.getSocketList().remove(socket);
		                System.out.println("socket stop.....");  
		  
		            }catch(IOException ex){     
		            	ex.printStackTrace();
		            } catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
		            }finally{     
		                
		            }     
     }  
 } 
