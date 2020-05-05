package com.chenwei.jfinal.directive;

import java.io.Writer;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.UnknownHostException;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.Set;

import javax.management.AttributeNotFoundException;
import javax.management.InstanceNotFoundException;
import javax.management.MBeanException;
import javax.management.MBeanServer;
import javax.management.MBeanServerFactory;
import javax.management.ObjectName;
import javax.management.ReflectionException;

import com.jfinal.core.JFinal;
import com.jfinal.template.Directive;
import com.jfinal.template.Env;
import com.jfinal.template.stat.Scope;

public class ContextPath extends Directive{
	private static boolean init = false;
	
	private static String hostIpPort;
	
	public void exec(Env env,Scope scope,Writer writer) {
		try {
			if(!init){
				hostIpPort = "http://"+getHostAddress()+":"+ getServerPort(false)+JFinal.me().getContextPath();
				init = true;
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		write(writer,hostIpPort);
		return;

	}

	public static String getHostAddress() throws UnknownHostException {  
		Enumeration<NetworkInterface> netInterfaces = null;  
		try {  
			netInterfaces = NetworkInterface.getNetworkInterfaces();  
			while (netInterfaces.hasMoreElements()) {  
				NetworkInterface ni = netInterfaces.nextElement();  
				Enumeration<InetAddress> ips = ni.getInetAddresses();  
				while (ips.hasMoreElements()) {  
					InetAddress ip = ips.nextElement();  
					if (ip.isSiteLocalAddress()) {  
						return ip.getHostAddress();  
					}  
				}  
			}  
		} catch (Exception e) {  
		}  
		return InetAddress.getLocalHost().getHostAddress();  
	}  
	/** 
	 * 获取服务端口号 
	 * @return 端口号 
	 * @throws ReflectionException 
	 * @throws MBeanException 
	 * @throws InstanceNotFoundException 
	 * @throws AttributeNotFoundException 
	 */  
	private static String getServerPort(boolean secure) throws AttributeNotFoundException, InstanceNotFoundException, MBeanException, ReflectionException {  
		MBeanServer mBeanServer = null;  
		if (MBeanServerFactory.findMBeanServer(null).size() > 0) {  
			mBeanServer = (MBeanServer)MBeanServerFactory.findMBeanServer(null).get(0);  
		}  

		if (mBeanServer == null) {   
			return "";  
		}  

		Set<ObjectName> names = null;  
		try {  
			names = mBeanServer.queryNames(new ObjectName("Catalina:type=Connector,*"), null);  
		} catch (Exception e) {  
			return "";  
		}  
		Iterator<ObjectName> it = names.iterator();  
		ObjectName oname = null;  
		while (it.hasNext()) {  
			oname = (ObjectName)it.next();  
			String protocol = (String)mBeanServer.getAttribute(oname, "protocol");  
			String scheme = (String)mBeanServer.getAttribute(oname, "scheme");  
			Boolean secureValue = (Boolean)mBeanServer.getAttribute(oname, "secure");  
			Boolean SSLEnabled = (Boolean)mBeanServer.getAttribute(oname, "SSLEnabled");  
			if (SSLEnabled != null && SSLEnabled) {// tomcat6开始用SSLEnabled  
				secureValue = true;// SSLEnabled=true但secure未配置的情况  
				scheme = "https";  
			}  
			if (protocol != null && ("HTTP/1.1".equals(protocol) || protocol.contains("http"))) {  
				if (secure && "https".equals(scheme) && secureValue) {  
					return ((Integer)mBeanServer.getAttribute(oname, "port")).toString();  
				} else if (!secure && !"https".equals(scheme) && !secureValue) {  
					return ((Integer)mBeanServer.getAttribute(oname, "port")).toString();  
				}  
			}  
		}  
		return "";  
	}  

}
