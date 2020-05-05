package com.chenwei.jfinal;

public class ResultMessage {

	
	//响应状态 200 正常返回 400 异常或者错误返回
	private Integer status;
	
	//响应返回前台的提示信息，可以放入报错或者异常信息
	private String message;
	
	//传回前台的对象
	private Object rows;
	
	//对象总计
	private Object total;
	
	public ResultMessage() {
		
	}
	
	public ResultMessage(Integer status,String message) {
		this.status = status;
		this.message = message;
		this.rows = null;
	}
	
	public ResultMessage(Integer status,String message,Object rows) {
		this.status = status;
		this.message = message;
		this.rows = rows;
	}
	
	public ResultMessage(Integer status,String message,Object total,Object rows) {
		this.status = status;
		this.message = message;
		this.rows = rows;
		this.total = total;
	}
	
	public static ResultMessage build(Integer status,String message) {
		return new ResultMessage(status,message);
	}
	
	public static ResultMessage build(Integer status,String message,Object rows) {
		return new ResultMessage(status,message,rows);
	}
	
	public static ResultMessage build(Integer status,String message,Object total,Object rows) {
		return new ResultMessage(status,message,total,rows);
	}
	
	

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getRows() {
		return rows;
	}

	public void setRows(Object rows) {
		this.rows = rows;
	}

	public Object getTotal() {
		return total;
	}

	public void setTotal(Object total) {
		this.total = total;
	}


	
	
	
}
