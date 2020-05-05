package com.chenwei.entrance;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;


public class dbtest {
		 public static void main(String[] args){  
				    try {
				      Class.forName("com.mysql.cj.jdbc.Driver");     //加载MYSQL JDBC驱动程序   
				      //Class.forName("org.gjt.mm.mysql.Driver");
				     System.out.println("Success loading Mysql Driver!");
				    }
				    catch (Exception e) {
				      System.out.print("Error loading Mysql Driver!");
				      e.printStackTrace();
				    }
				    try {
				      Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/emis_test?userSSL=false&useUnicode=true&characterEncoding=UTF8&serverTimezone = GMT","root","root");
				           //连接URL为   jdbc:mysql//服务器地址（默认为3306）/数据库名？时区设定  ，后面的2个参数分别是登陆用户名和密码

				      System.out.println("Success connect Mysql server!");
				    }
				    catch (Exception e) {
				      System.out.print("get data error!");
				      e.printStackTrace();
				    }
				  }
	

}
