package com.chenwei.socket;


import java.io.*;
import java.net.InetAddress;
import java.net.Socket;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.dom4j.Document;

import com.chenwei.hl7.HL7ToXmlConverter;
import com.chenwei.socket.ByteUtil;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.Db;

import cn.hutool.core.util.StrUtil;

/**
 * 
 * @author yling
 *
 */
public class SocketAction {
	/*
	NIBP Systolic 150301 MDC_PRESS_CUFF_SYS MDC 1.1.9.150301 MDC_DIM_MMHG  收缩压
	NIBP Diastolic 150302 MDC_PRESS_CUFF_DIA MDC 1.1.9.150302 MDC_DIM_MMHG 舒张压
	Temperature 150344 MDC_TEMP MDC 1.2.1.150344 MDC_DIM_FAHR  体温
	188496^MDC_TEMP_AXIL^MDC 腋下体温
	SpO2  Saturation 150456 MDC_PULS_OXIM_SAT_O2 MDC 1.3.1.150456 MDC_DIM_PERCENT  spo2
	149530^MDC_PULS_OXIM_PULS_RATE^MDC maibo   149530^MDC_PULS_OXIM_PULS_RATE 血氧脉搏
	149546^MDC_PULS_RATE_NON_INV^MDC 血压脉搏 
	*/
	//需要的值的标识
	private static final String SSY = "150301^MDC_PRESS_CUFF_SYS^MDC";
	private static final String SZY = "150302^MDC_PRESS_CUFF_DIA^MDC";
	private static final String TIWEN = "188496^MDC_TEMP_AXIL^MDC";
	private static final String SPO2 = "150456^MDC_PULS_OXIM_SAT_O2^MDC";
	private static final String MAIBO1 = "149530^MDC_PULS_OXIM_PULS_RATE^MDC";
	private static final String MAIBO2 = "149546^MDC_PULS_RATE_NON_INV^MDC";
	private static final String Request = null;
	
	
	//理邦监护仪
	private static final String GW_SSY = "393216^NIBP_SYS^EHC";
	private static final String GW_SZY = "393217^NIBP_DIA^EHC";
	private static final String GW_TIWEN = "458752^TEMP_T1^EHC";
	private static final String GW_SPO2 = "327680^SPO2_SPO2^EHC";
	private static final String GW_MAIBO1 = "131072^ECG_HR^EHC";
	private static final String GW_MAIBO2 = "393219^NIBP_PR^EHC";//血氧脉搏
	
	
	
	//飞利浦监护仪 
	private static final String Philips_SSY = "0002-4a05^NBPs^MDIL";
	private static final String Philips_SZY = "0002-4a06^NBPd^MDIL";
	private static final String Philips_TIWEN1 = "0002-f0c7^Temp1^MDIL";
	private static final String Philips_TIWEN2 = "0002-f0c8^Temp2^MDILL";
	private static final String Philips_SPO2 = "0002-4bb8^SpO2^MDIL";
	private static final String Philips_MAIBO = "0002-4182^HR^MDIL";

	

	private static ArrayList<Socket> socketList = new ArrayList<Socket>(); 

	
	
	public static ArrayList<Socket> getSocketList() {
		return socketList;
	}


	public static void setSocketList(ArrayList<Socket> socketList) {
		SocketAction.socketList = socketList;
	}
    
	
		//处理接收监护仪 接口 数据
	public byte[] receiveData(Socket socket, byte[] strXML) throws Exception {
	
			byte[] result = new byte[1024];
			//转化获取的 字节流 为 字符串
			String myHL7string = ByteUtil.getString(strXML, "UTF-8");
			//获取 监测 数据 ID
			System.out.println(myHL7string);
			String project_name  = PropKit.get("project_name").trim();
			List<Map<String,String>> list = HL7ToXmlConverter.ConvertToList(myHL7string);
			//存数据库
			//循环 监测 数据 集合 拿出想要的 收缩压 舒张压 体温 血氧度
			//
			String ssy = "";
			String szy = "";
			String tiwen = "";
			String spo2 = "";
			String maibo = "";
			if(StrUtil.equals("wh", project_name)){
				for(int i = 0; i<list.size();i++){
					Map<String,String> map = list.get(i);
					String name = map.get("name").toString();
					//System.out.println(name);
					if(StrUtil.equals(name, SSY)){
						
						ssy = map.get("value");
						
					}
					if(StrUtil.equals(name, SZY)){
						
						szy = map.get("value");
					}
					if(StrUtil.equals(name, TIWEN)){
						
						tiwen = map.get("value");
					}
					if(StrUtil.equals(name, SPO2)){
						
						spo2 = map.get("value");
					}
					if(StrUtil.equals(name, MAIBO1)){
						
						maibo = map.get("value");
					}
					
					if(StrUtil.equals(name, MAIBO2)){
						
						maibo = map.get("value");
					}
				}
				
				this.update(ssy, szy, tiwen, spo2, maibo);
				System.out.println("接收到监护仪数据");
			}else if(StrUtil.equals("bb", project_name)){
				System.out.println("飞利浦监护仪 ");
				for(int i = 0; i<list.size();i++){
					Map<String,String> map = list.get(i);
					String name = map.get("name").toString();
					//System.out.println(name);
					if(StrUtil.equals(name, Philips_SSY)){
						
						ssy = map.get("value");
						this.update2("ssy", ssy);
						
					}
					if(StrUtil.equals(name, Philips_SZY)){
						
						szy = map.get("value");
						this.update2("szy", szy);
					}
					if(StrUtil.equals(name, Philips_TIWEN1)){
						
						tiwen = map.get("value");
						this.update2("tiwen", tiwen);
					}
					
					if(StrUtil.equals(name, Philips_TIWEN2)){
						if(tiwen==""){
							tiwen = map.get("value");
							this.update2("tiwen", tiwen);
						}
					}
					if(StrUtil.equals(name, Philips_SPO2)){
						
						spo2 = map.get("value");
						this.update2("spo2", spo2);
					}
					
					
					if(StrUtil.equals(name, Philips_MAIBO)){
						
						maibo = map.get("value");
						this.update2("maibo", maibo);
					}
				}
				
				System.out.println("接收到监护仪数据");
			}
			
			return result;
	}
	
	//更新数据库 连接状态表
	void updateMach(String value){
		try{
			Db.update("update stt_mach_status set status=?,lasttime=? where id='1'",value,new Date());
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	//更新数据库 监测临时表
	private void update(String ssy,String szy,String tiwen,String spo2,String maibo){
		try{
			Db.update("update trt_sign_temp set ssy=?,szy=?,tiwen=?,spo2=?, maibo=? where id='1'",ssy,szy,tiwen,spo2,maibo);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
		
	//更新数据库 监测临时表
		private void update2(String col,String value){
			try{
				Db.update("update trt_sign_temp set " +col+ "=? where id='1'",value);
			}catch(Exception e){
				e.printStackTrace();
			}
		}
	
	//转化时间格式
	public String getTime(String t){
		String result = "";
		result = "20" + t.substring(0, 2)+"-" + t.substring(2, 4)+"-" + t.substring(4, 6) + " " +
				t.substring(6, 8)+":"+ t.substring(8, 10)+":" + t.substring(10, 12);
		return result;
	}
		
	
	public Map<String,String> getSignInfo(){
		String message1 = "MSH|^~\\&|7edit.com||7edit.com||20191028141315||QRY^R02|MSG-20170611-175218-0837|P|2.3.1||||||UNICODE UTF-8";
		String message2 = "QRD|20191028141315|R|I|Q839572|||||RES";
		String message3 = "QRF|MON||||1";
		byte[] beg = new byte[]{0x0B};
		byte[] cr = new byte[]{0x1C};
		byte[] end = new byte[]{0x0D};

		String result  = "";
		try { 
			//1.建立客户端socket连接，指定服务器位置及端口 
			Socket socket =new Socket("127.0.0.1",9100); 
			System.out.println("Socket=" + socket);
			//2.得到socket读写流 
			OutputStream out=socket.getOutputStream(); 
			
			//输入流 
			InputStream is=socket.getInputStream(); 
			BufferedReader br=new BufferedReader(new InputStreamReader(is)); 
			//3.利用流按照一定的操作，对socket进行读写操作 
			byte[] sendInfo1 = ByteUtil.getBytes(message1);
			byte[] sendInfo2= ByteUtil.getBytes(message2);
			byte[] sendInfo3 = ByteUtil.getBytes(message3);
			out.write(beg);
			out.write(sendInfo1);
			out.write(end);
			out.write(sendInfo2);
			out.write(end);
			out.write(sendInfo3);
			out.write(cr); 
			out.write(end); 
			out.flush(); 
			//接收服务器的相应 
			ByteArrayOutputStream bos = new ByteArrayOutputStream(); 

             byte[] temp = new byte[4096];  
             int  length = -1;
      
             
             while((length = is.read(temp)) != -1){
             	 System.out.println(length);
             			           
             	 bos.write(temp, 0, length); 
             	 
             	 if(bos.size()>0){
             		 break;
             	 }

             }
             byte[] mes= bos.toByteArray(); 
             System.out.println(ByteUtil.getString(mes));
             result = ByteUtil.getString(mes);
             bos.reset();
			//4.关闭资源 
			br.close(); 
			is.close(); 
			out.close(); 
			socket.close(); 
		} catch (Exception e) { 
			e.printStackTrace(); 
		} 
		List<Map<String,String>> list = HL7ToXmlConverter.ConvertToList(result);
		//循环 监测 数据 集合 拿出想要的 收缩压 舒张压 体温 血氧度
		//
		String ssy = "";
		String szy = "";
		String tiwen = "";
		String spo2 = "";
		String maibo = "";
		
		for(int i = 0; i<list.size();i++){
			Map<String,String> map = list.get(i);
			String name = map.get("name").toString();
			//System.out.println(name);
			if(StrUtil.equals(name, GW_SSY)){
				
				ssy = map.get("value");
			}
			if(StrUtil.equals(name, GW_SZY)){
				
				szy = map.get("value");
			}
			if(StrUtil.equals(name, GW_TIWEN)){
				
				tiwen = map.get("value");
			}
			if(StrUtil.equals(name, GW_SPO2)){
				
				spo2 = map.get("value");
			}
			if(StrUtil.equals(name, GW_MAIBO1)){
				
				maibo = map.get("value");
			}
			
			if(StrUtil.equals(name, GW_MAIBO2)){
				
				maibo = map.get("value");
			}
		}
		
		Map<String,String> map = new HashMap<String,String>();
		map.put("ssy", ssy);
		map.put("szy", szy);
		map.put("tiwen", tiwen);
		map.put("spo2", spo2);
		map.put("maibo", maibo);
		return map;
	}
	
	
	public static void main(String[] args){
		int len = SocketAction.socketList.size();
		System.out.println(len);
		String message1 = "MSH|^~\\&|7edit.com||7edit.com||20191028141315||QRY^R02|MSG-20170611-175218-0837|P|2.3.1||||||UNICODE UTF-8";
		String message2 = "QRD|20191028141315|R|I|Q839572|||||RES";
		String message3 = "QRF|MON||||1";
		byte[] beg = new byte[]{0x0B};
		byte[] cr = new byte[]{0x1C};
		byte[] end = new byte[]{0x0D};

		String result  = "";
		try { 
			//1.建立客户端socket连接，指定服务器位置及端口 
			Socket socket =new Socket("192.168.1.248",9100); 
			System.out.println("Socket=" + socket);
			//2.得到socket读写流 
			OutputStream out=socket.getOutputStream(); 
			
			//输入流 
			InputStream is=socket.getInputStream(); 
			BufferedReader br=new BufferedReader(new InputStreamReader(is)); 
			//3.利用流按照一定的操作，对socket进行读写操作 
			byte[] sendInfo1 = ByteUtil.getBytes(message1);
			byte[] sendInfo2= ByteUtil.getBytes(message2);
			byte[] sendInfo3 = ByteUtil.getBytes(message3);
			out.write(beg);
			out.write(sendInfo1);
			out.write(end);
			out.write(sendInfo2);
			out.write(end);
			out.write(sendInfo3);
			out.write(cr); 
			out.write(end); 
			out.flush(); 
			//接收服务器的相应 
			ByteArrayOutputStream bos = new ByteArrayOutputStream(); 

             byte[] temp = new byte[4096];  
             int  length = -1;
      
             
             while((length = is.read(temp)) != -1){
             	 System.out.println(length);
             			           
             	 bos.write(temp, 0, length); 
             	 
             	 if(bos.size()>0){
             		 break;
             	 }

             }
             byte[] mes= bos.toByteArray(); 
             System.out.println(ByteUtil.getString(mes));
             result = ByteUtil.getString(mes);
             bos.reset();
			//4.关闭资源 
			br.close(); 
			is.close(); 
			out.close(); 
			socket.close(); 
		} catch (Exception e) { 
			e.printStackTrace(); 
		} 

		
	}


	
	


	


}
