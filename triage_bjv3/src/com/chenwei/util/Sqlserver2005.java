package com.chenwei.util;

import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import cn.hutool.core.util.StrUtil;



public class Sqlserver2005 {
	public static void main(String[] args) {
		 String driverName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";  //加载JDBC驱动
		  String dbURL = "jdbc:sqlserver://localhost:1433; DatabaseName=master";  //连接服务器和数据库master
		  String userName = "sa";  //默认用户名
		  String userPwd = "sa";  //密码
		  Connection dbConn;
		  PreparedStatement pst;
		  try {
		   Class.forName(driverName);
		   dbConn = DriverManager.getConnection(dbURL, userName, userPwd);
		   pst=dbConn.prepareStatement("SELECT * from test..bmk where glmodesj= ?");
		   pst.setString(1, "2016-11-24 00:00:00");
		   ResultSet rs=pst.executeQuery();
//		   System.out.println(getIsoTo8859("内一病房"));

		   while (rs.next()) {
	           System.out.println(getIsoToGBK(rs.getString("mc"))+"--"+getIsoToGBK(rs.getString("yhzh")));
	       }
		   System.out.println("==========数据库连接成功========!");  //如果连接成功 控制台输出==========数据库连接成功========!
		  } catch (Exception e) {
		   e.printStackTrace();
		  }
		
	}

	public static String getIsoToGBK(String str){
	    if (StrUtil.isBlank(str)){
	        return "";
	    }
	    String newStr = "";
	    try {
	        newStr = new String(str.getBytes("ISO8859-1"),"GBK");
	    } catch (UnsupportedEncodingException e) {
	        e.printStackTrace();
	    }
	    return newStr;
	}
	public static String getIsoTo8859(String str){
	    if (StrUtil.isBlank(str)){
	        return "";
	    }
	    String newStr = "";
	    try {
	        newStr = new String(str.getBytes("GBK"),"ISO8859-1");
	    } catch (UnsupportedEncodingException e) {
	        e.printStackTrace();
	    }
	    return newStr;
	}
}
