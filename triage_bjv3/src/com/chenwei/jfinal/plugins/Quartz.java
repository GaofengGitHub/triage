package com.chenwei.jfinal.plugins;

/**
 * Quartz Pojo
 * 
 * @author 作者 左浩(James )E-mail: 25708164@qq.com
 * @date 创建时间：2016年12月27日 下午6:16:32
 * @version 1.0
 * @since
 * @return
 */

public class Quartz {
	private String propFile;
	private String jobsFile;
	private boolean isEnableRun;

	public String getPropFile() {
		return propFile;
	}

	public void setPropFile(String propFile) {
		this.propFile = propFile;
	}

	public String getJobsFile() {
		return jobsFile;
	}

	public void setJobsFile(String jobsFile) {
		this.jobsFile = jobsFile;
	}

	public boolean isEnableRun() {
		return isEnableRun;
	}

	public void setEnableRun(boolean isEnableRun) {
		this.isEnableRun = isEnableRun;
	}
}