package com.chenwei.util;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.OutputStream;
import java.net.Socket;

import javax.print.Doc;
import javax.print.DocFlavor;
import javax.print.DocPrintJob;
import javax.print.PrintException;
import javax.print.PrintService;
import javax.print.PrintServiceLookup;   
import javax.print.ServiceUI; 
import javax.print.SimpleDoc;
import javax.print.attribute.DocAttributeSet;
import javax.print.attribute.HashDocAttributeSet;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;
import javax.print.attribute.standard.MediaSizeName;
import javax.swing.JFileChooser;
import javax.swing.JOptionPane;


public class PrintDemo{
	public static void main(String[] args) {
		/*JFileChooser fileChooser = new JFileChooser();
		FileInputStream textStream = null;
		int state = fileChooser.showOpenDialog(null);
		if(state == fileChooser.APPROVE_OPTION){   
			try {
				textStream = new FileInputStream("D:/a.txt");
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			}
      //构建打印请求属性集   
        HashPrintRequestAttributeSet pras = new HashPrintRequestAttributeSet();
      //设置打印格式，因为未确定类型，所以选择autosense   
        DocFlavor flavor = DocFlavor.INPUT_STREAM.AUTOSENSE;
      //查找所有的可用的打印服务   
        PrintService printService[] = PrintServiceLookup.lookupPrintServices(flavor, pras);
      //定位默认的打印服务   
        PrintService defaultService = PrintServiceLookup.lookupDefaultPrintService();
        DocPrintJob job = defaultService.createPrintJob(); // 设置打印属性
        //显示打印对话框   
       DocAttributeSet das = new HashDocAttributeSet(); // 指定打印内容
			Doc doc = new SimpleDoc(textStream, flavor, das); // 不显示打印对话框，直接进行打印工作
			try {
				job.print(doc, pras); // 进行每一页的具体打印操作
			} catch (PrintException pe) {
				pe.printStackTrace();
			}
    }  */ 
		/*FileInputStream textStream = null;
		try {
			textStream = new FileInputStream("D:/a.txt");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		if (textStream != null) // 当打印内容不为空时
		{ // 指定打印输出格式
			DocFlavor  flavor = DocFlavor.INPUT_STREAM.AUTOSENSE;// SERVICE_FORMATTED.PRINTABLE
			 // 定位默认的打印服务
			PrintService printService = PrintServiceLookup.lookupDefaultPrintService(); 
			// 创建打印作业
			DocPrintJob job = printService.createPrintJob(); 
			// 设置打印属性
			PrintRequestAttributeSet pras = new HashPrintRequestAttributeSet(); 
			// 设置纸张大小,也可以新建MediaSize类来自定义大小
			pras.add(MediaSizeName.ISO_A4);
			DocAttributeSet das = new HashDocAttributeSet(); 
			// 指定打印内容
			Doc doc = new SimpleDoc(textStream, flavor, das);
			// 不显示打印对话框，直接进行打印工作
			try {
				job.print(doc, pras); // 进行每一页的具体打印操作
			} catch (PrintException pe) {
				pe.printStackTrace();
			}
		} else { // 如果打印内容为空时，提示用户打印将取消
			JOptionPane.showConfirmDialog(null,
					"Sorry, Printer Job is Empty, Print Cancelled!", "Empty",
					JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE);
		}*/
		try {
			defaultPrintPDF("D:/a.txt");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

}
	
	public static void print2(String filePath,String ip) throws Exception{
		  File file = new File(filePath); // 获取选择的文件
		  Socket socket =  new Socket(ip, 9100);
		 
		  OutputStream out = socket.getOutputStream();  
		  FileInputStream fis = new FileInputStream(file);
		  //建立数组
	      byte[] buf = new byte[1024];  
	      int len = 0; 
	      //判断是否读到文件末尾
	      while((len=fis.read(buf)) != -1)
	          {  
	           out.write(buf, 0, len);  
	          }  
	      //告诉服务端，文件已传输完毕  
	      socket.shutdownOutput();
	      socket.close();  
	      fis.close();
	  }
	
	public static void defaultPrintPDF(String filePath) throws Exception{
		 System.out.println("打印工具类入參：filePath==================="+filePath);
		 File file = new File(filePath); // 获取选择的文件
	      // 构建打印请求属性集
	      HashPrintRequestAttributeSet pras = new HashPrintRequestAttributeSet();
	      // 设置打印格式，因为未确定类型，所以选择autosense
	      DocFlavor flavor = DocFlavor.INPUT_STREAM.AUTOSENSE;
	      System.out.println("打印文件类型为：==================="+flavor);
	      //pras.add(MediaName.ISO_A4_TRANSPARENT);//A4纸张
	      //遍历
//	      PrintService printService[] = PrintServiceLookup.lookupPrintServices(flavor, pras); 
//	   
//	      for (PrintService printService2 : printService) {
//	    	  logger.info("本机可使用打印机列表：==================="+printService2);
//			}
	      // 定位默认的打印服务
	      PrintService defaultService = PrintServiceLookup
	              .lookupDefaultPrintService();
	      System.out.println("打印工具选择打印机为：==================="+defaultService);
	          try {
	              DocPrintJob job = defaultService.createPrintJob(); // 创建打印作业
	              FileInputStream fis = new FileInputStream(file); // 构造待打印的文件流
	              DocAttributeSet das = new HashDocAttributeSet();
	              Doc doc = new SimpleDoc(fis, flavor, das);
	              job.print(doc, pras);
	          } catch (Exception e) {
	              e.printStackTrace();
	              System.out.println("打印异常");
	             throw new Exception();
	          }
	      }
	
}
