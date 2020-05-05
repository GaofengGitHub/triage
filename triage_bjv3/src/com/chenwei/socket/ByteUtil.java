package com.chenwei.socket;

import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;


public class ByteUtil {
	/**
	 * 
	 * @param a
	 * @param b
	 * @return
	 */
	
	public static byte[] concat  (byte[]a,byte[]b){ 
	    if (a == null) return b; 
	    if (b == null) return a; 
	    byte[] r = new byte[a.length+b.length]; 
	    System.arraycopy(a, 0, r, 0, a.length); 
	    System.arraycopy(b, 0, r, a.length, b.length); 
	    return r; 
	     
	}
	
	
	/** 
     * @功能: 10进制串转为BCD码 
     * @参数: 10进制串 
     * @结果: BCD码 
     */  
    public static byte[] str2Bcd(String asc) {  
        int len = asc.length();  
        int mod = len % 2;  
        if (mod != 0) {  
            asc = "0" + asc;  
            len = asc.length();  
        }  
        byte abt[] = new byte[len];  
        if (len >= 2) {  
            len = len / 2;  
        }  
        byte bbt[] = new byte[len];  
        abt = asc.getBytes();  
        int j, k;  
        for (int p = 0; p < asc.length() / 2; p++) {  
            if ((abt[2 * p] >= '0') && (abt[2 * p] <= '9')) {  
                j = abt[2 * p] - '0';  
            } else if ((abt[2 * p] >= 'a') && (abt[2 * p] <= 'z')) {  
                j = abt[2 * p] - 'a' + 0x0a;  
            } else {  
                j = abt[2 * p] - 'A' + 0x0a;  
            }  
            if ((abt[2 * p + 1] >= '0') && (abt[2 * p + 1] <= '9')) {  
                k = abt[2 * p + 1] - '0';  
            } else if ((abt[2 * p + 1] >= 'a') && (abt[2 * p + 1] <= 'z')) {  
                k = abt[2 * p + 1] - 'a' + 0x0a;  
            } else {  
                k = abt[2 * p + 1] - 'A' + 0x0a;  
            }  
            int a = (j << 4) + k;  
            byte b = (byte) a;  
            bbt[p] = b;  
        }  
        return bbt;  
    }   

	
    public static String bcd2Str(byte[] bytes) {  
        char temp[] = new char[bytes.length * 2], val;  
  
        for (int i = 0; i < bytes.length; i++) {  
            val = (char) (((bytes[i] & 0xf0) >> 4) & 0x0f);  
            temp[i * 2] = (char) (val > 9 ? val + 'A' - 10 : val + '0');  
  
            val = (char) (bytes[i] & 0x0f);  
            temp[i * 2 + 1] = (char) (val > 9 ? val + 'A' - 10 : val + '0');  
        }  
        return new String(temp);  
    }
	
	public static byte[] getBytes(short data)
    {
        byte[] bytes = new byte[2];
        bytes[0] = (byte) (data & 0xff);
        bytes[1] = (byte) ((data & 0xff00) >> 8);
        return bytes;
    }

    public static byte[] getBytes(char data)
    {
        byte[] bytes = new byte[2];
        bytes[0] = (byte) (data);
        bytes[1] = (byte) (data >> 8);
        return bytes;
    }

    public static byte[] getBytes(int data)
    {
        byte[] bytes = new byte[4];
        bytes[0] = (byte) (data & 0xff);
        bytes[1] = (byte) ((data & 0xff00) >> 8);
        bytes[2] = (byte) ((data & 0xff0000) >> 16);
        bytes[3] = (byte) ((data & 0xff000000) >> 24);
        return bytes;
    }

    public static byte[] getBytes(long data)
    {
        byte[] bytes = new byte[8];
        bytes[0] = (byte) (data & 0xff);
        bytes[1] = (byte) ((data >> 8) & 0xff);
        bytes[2] = (byte) ((data >> 16) & 0xff);
        bytes[3] = (byte) ((data >> 24) & 0xff);
        bytes[4] = (byte) ((data >> 32) & 0xff);
        bytes[5] = (byte) ((data >> 40) & 0xff);
        bytes[6] = (byte) ((data >> 48) & 0xff);
        bytes[7] = (byte) ((data >> 56) & 0xff);
        return bytes;
    }

    public static byte[] getBytes(float data)
    {
        int intBits = Float.floatToIntBits(data);
        return getBytes(intBits);
    }

    public static byte[] getBytes(double data)
    {
        long intBits = Double.doubleToLongBits(data);
        return getBytes(intBits);
    }

    public static byte[] getBytes(String data, String charsetName) throws UnsupportedEncodingException
    {
        Charset charset = Charset.forName(charsetName);
        return data.getBytes(charsetName);
    }

    public static byte[] getBytes(String data) throws UnsupportedEncodingException
    {
        return getBytes(data, "GBK");
    }

    
    public static short getShort(byte[] bytes)
    {
        return (short) ((0xff & bytes[0]) | (0xff00 & (bytes[1] << 8)));
    }

    public static char getChar(byte[] bytes)
    {
        return (char) ((0xff & bytes[0]) | (0xff00 & (bytes[1] << 8)));
    }

    public static int getInt(byte[] bytes)
    {
        return (0xff & bytes[0]) | (0xff00 & (bytes[1] << 8)) | (0xff0000 & (bytes[2] << 16)) | (0xff000000 & (bytes[3] << 24));
    }
   
    public static long getLong(byte[] bytes)
    {
        return(0xffL & (long)bytes[0]) | (0xff00L & ((long)bytes[1] << 8)) | (0xff0000L & ((long)bytes[2] << 16)) | (0xff000000L & ((long)bytes[3] << 24))
         | (0xff00000000L & ((long)bytes[4] << 32)) | (0xff0000000000L & ((long)bytes[5] << 40)) | (0xff000000000000L & ((long)bytes[6] << 48)) | (0xff00000000000000L & ((long)bytes[7] << 56));
    }

    public static float getFloat(byte[] bytes)
    {
        return Float.intBitsToFloat(getInt(bytes));
    }

    public static double getDouble(byte[] bytes)
    {
        long l = getLong(bytes);
        System.out.println(l);
        return Double.longBitsToDouble(l);
    }

    public static String getString(byte[] bytes, String charsetName)
    {
        try {
			return new String(bytes,charsetName);
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new String(bytes);
		}
    }

    public static String getString(byte[] bytes)
    {
        return getString(bytes, "GBK");
    }

    
    public static void main(String[] args) throws UnsupportedEncodingException
    {
        short s = 122;
        int i = 122;
        long l = 1222222;

        char c = 'a';

        float f = 122.22f;
        double d = 122.22;

        String string = "我是好孩子";
        System.out.println(s);
        System.out.println(i);
        System.out.println(l);
        System.out.println(c);
        System.out.println(f);
        System.out.println(d);
        System.out.println(string);

        System.out.println("**************");

        System.out.println(getShort(getBytes(s)));
        System.out.println(getInt(getBytes(i)));
        System.out.println(getLong(getBytes(l)));
        System.out.println(getChar(getBytes(c)));
        System.out.println(getFloat(getBytes(f)));
        System.out.println(getDouble(getBytes(d)));
        System.out.println(getString(getBytes(string)));
        
    }
    
    public static byte[] hexStringToByte(String hex) {
        int len = (hex.length() / 2);
        byte[] result = new byte[len];
        char[] achar = hex.toCharArray();
        for (int i = 0; i < len; i++) {
         int pos = i * 2;
         result[i] = (byte) (toByte(achar[pos]) << 4 | toByte(achar[pos + 1]));
        }
        return result;
    }

    private static byte toByte(char c) {
        byte b = (byte) "0123456789ABCDEF".indexOf(c);
        return b;
    }

    /**
        * 把字节数组转换成16进制字符串
        * @param bArray
        * @return
        */
    public static final String bytesToHexString(byte[] bArray) {
        StringBuffer sb = new StringBuffer(bArray.length);
        String sTemp;
        for (int i = 0; i < bArray.length; i++) {
         sTemp = Integer.toHexString(0xFF & bArray[i]);
         if (sTemp.length() < 2)
          sb.append(0);
         sb.append(sTemp.toUpperCase());
        }
        return sb.toString();
    }
    
    
    /** 字符串转换为16进制字符串 
    *  
    * @param s 
    * @return 
    */  
   public static String stringToHexString(String s) {  
       String str = "";  
       for (int i = 0; i < s.length(); i++) {  
           int ch = (int) s.charAt(i);  
           String s4 = Integer.toHexString(ch);  
           str = str + s4;  
       }  
       return str;  
   }  
 
   /** 
    * 16进制字符串转换为字符串 
    *  
    * @param s 
    * @return 
    */  
   public static String hexStringToString(String s) {  
       if (s == null || s.equals("")) {  
           return null;  
       }  
       s = s.replace(" ", "");  
       byte[] baKeyword = new byte[s.length() / 2];  
       for (int i = 0; i < baKeyword.length; i++) {  
           try {  
               baKeyword[i] = (byte) (0xff & Integer.parseInt(  
                       s.substring(i * 2, i * 2 + 2), 16));  
           } catch (Exception e) {  
               e.printStackTrace();  
           }  
       }  
       try {  
           s = new String(baKeyword, "UTF-8");  
           new String();  
       } catch (Exception e1) {  
           e1.printStackTrace();  
       }  
       return s;  
   }  

}
