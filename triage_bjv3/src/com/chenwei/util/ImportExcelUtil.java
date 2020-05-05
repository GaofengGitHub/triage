package com.chenwei.util;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
 
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
 
/**
 * 被解析的Excel最好是什么样的呢？  
 * 单元格最好都是文本格式，保存数据前自己去转换，不用poi带的转换。
 * 第一列 和最后一列 必须是必填字段!!!这样的你用我这个Util，得到的List就很准确了，不会出现多余的行或列。
 * @author TMACJ
 * @version 0.000000.002899
 */
public class ImportExcelUtil {
	private final static String excel2003L =".xls";    //2003- 版本的excel
	private final static String excel2007U =".xlsx";   //2007+ 版本的excel
	
	static SimpleDateFormat sFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    static short[] yyyyMMdd = {14, 31, 57, 58, 179, 184, 185, 186, 187, 188};
    static short[] HHmmss = {20, 32, 190, 191, 192};
    static List<short[]> yyyyMMddList = Arrays.asList(yyyyMMdd);
    static List<short[]> hhMMssList = Arrays.asList(HHmmss);
	/**
	 * 描述：获取IO流中的数据，组装成List<List<Object>>对象
	 * @param in,fileName
	 * @return
	 * @throws IOException 
	 */
	public  List<List<String>> getBankListByExcel(InputStream in,String fileName) throws Exception{
		List<List<String>> list = null;
		
		//创建Excel工作薄
		Workbook work = this.getWorkbook(in,fileName);
		if(null == work){
			throw new Exception("创建Excel工作薄为空！");
		}
		Sheet sheet = null;
		Row row = null;
		Cell cell = null;
		
		list = new ArrayList<List<String>>();
		//遍历Excel中所有的sheet
		for (int i = 0; i < work.getNumberOfSheets(); i++) {
			sheet = work.getSheetAt(i);
			if(sheet==null){continue;}
			int totalCell = sheet.getRow(0).getPhysicalNumberOfCells();//标题行一共有多少列
			//遍历当前sheet中的所有行
			for (int j = sheet.getFirstRowNum(); j < sheet.getLastRowNum()+1; j++) {
				row = sheet.getRow(j);
				if(row==null || validateRow(row) || row.getPhysicalNumberOfCells() < totalCell){continue;} //3个条件，有一个为true就不会往list里加，不仅过滤空行还过滤了列数不够的行，这点要注意，要求表中前后的列都是必填的。
				//遍历所有的列
				List<String> li = new ArrayList<String>();
				for (int y = row.getFirstCellNum(); y < row.getLastCellNum(); y++) {
					cell = row.getCell(y);
					li.add(this.getCellData(cell));
				}
				list.add(li);
			}
			// 简单起见，这里只解析第一个工作簿！
			break;
		}
		work.close();
		return list;
	}
	// 过滤空行，（其中一行的数据的确都为空，可是其原本的格式还在，并没有连带删除，这样计算出来的行数就不真实，比真实的大）
	private boolean validateRow(Row row) throws Exception{
//		for (Cell cell : row) {
//			
//		}
		//只判断第一列。第一列为空就代表这行的数据无效
		if (row.getCell(0).getCellType() == Cell.CELL_TYPE_BLANK || "".equals(this.getCellData(row.getCell(0)))) {
			return true;
		}
		return false;//不是空行
	}
	/**
	 * 描述：根据文件后缀，自适应上传文件的版本 
	 * @param inStr,fileName
	 * @return
	 * @throws Exception
	 */
	public  Workbook getWorkbook(InputStream inStr,String fileType) throws Exception{
		Workbook wb = null;
		if(excel2003L.equals(fileType)){
			wb = new HSSFWorkbook(inStr);  //2003-
		}else if(excel2007U.equals(fileType)){
			wb = new XSSFWorkbook(inStr);  //2007+
		}else{
			throw new Exception("解析的文件格式有误！");
		}
		return wb;
	}
	
	/**
     * 获取单元中值(字符串类型)
     *
     * @param cell
     * @return
	 * @throws Exception 
     */
    public String getCellData(Cell cell) throws Exception {
        String cellValue = "";
        if (cell != null) {
            try {
                switch (cell.getCellType()) {
                    case Cell.CELL_TYPE_BLANK://空白
                        cellValue = "";
                        break;
                    case Cell.CELL_TYPE_NUMERIC: //数值型 0----日期类型也是数值型的一种
                        if (DateUtil.isCellDateFormatted(cell)) {
                            short format = cell.getCellStyle().getDataFormat();
 
                            if (yyyyMMddList.contains(format)) {
                                sFormat = new SimpleDateFormat("yyyy-MM-dd");
                            } else if (hhMMssList.contains(format)) {
                                sFormat = new SimpleDateFormat("HH:mm:ss");
                            }
                            Date date = cell.getDateCellValue();
                            cellValue = sFormat.format(date);
                        } else {
                        	cell.setCellType(Cell.CELL_TYPE_STRING);
                        	cellValue = replaceBlank(cell.getStringCellValue());
                            //Double numberDate = new BigDecimal(cell.getNumericCellValue()).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();//似乎还是有点问题
                            //cellValue = numberDate + "";
                        }
                        break;
                    case Cell.CELL_TYPE_STRING: //字符串型 1
                        cellValue = replaceBlank(cell.getStringCellValue());
                        break;
                    case Cell.CELL_TYPE_FORMULA: //公式型 2
                        cell.setCellType(Cell.CELL_TYPE_STRING);
                        cellValue = replaceBlank(cell.getStringCellValue());
                        break;
                    case Cell.CELL_TYPE_BOOLEAN: //布尔型 4
                        cellValue = String.valueOf(cell.getBooleanCellValue());
                        break;
                    case Cell.CELL_TYPE_ERROR: //错误 5
                        cellValue = "!#REF!";
                        break;
                }
            } catch (Exception e) {
            	throw new Exception("读取Excel单元格数据出错：" + e.getMessage());
            }
        }
        return cellValue;
    }
    
    public static String replaceBlank(String source) {
        String dest = "";
        if (source != null) {
            Pattern p = Pattern.compile("\t|\r|\n");
            Matcher m = p.matcher(source);
            dest = m.replaceAll("");
        }
        return dest.trim();
    }
    
}