package com.chenwei.jfinal.plugins;
/**
 * Quartz Job Pojo
 * 
 * @author 作者 左浩(James) E-mail: 25708164@qq.com
 * @date 创建时间：2016年12月27日 下午6:04:33
 * @version 1.0
 * @since
 * @return
 */
public class QuartzJob {
	private String className;
	private String cron;
	private String jobName;
	private String groupName;
	private boolean run;

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getCron() {
		return cron;
	}

	public void setCron(String cron) {
		this.cron = cron;
	}

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public boolean isRun() {
		return run;
	}

	public void setRun(boolean run) {
		this.run = run;
	}

}
