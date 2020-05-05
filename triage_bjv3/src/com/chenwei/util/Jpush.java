package com.chenwei.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.jiguang.common.ClientConfig;
import cn.jiguang.common.resp.APIConnectionException;
import cn.jiguang.common.resp.APIRequestException;
import cn.jpush.api.JPushClient;
import cn.jpush.api.push.PushResult;
import cn.jpush.api.push.model.Platform;
import cn.jpush.api.push.model.PushPayload;
import cn.jpush.api.push.model.audience.Audience;
import cn.jpush.api.push.model.notification.Notification;

public class Jpush {
	protected static final Logger LOG = LoggerFactory
			.getLogger(PushExample.class);

	// demo App defined in resources/jpush-api.conf
	protected static final String APP_KEY = "92d0a9e2b645041480f5b9b0";
	protected static final String MASTER_SECRET = "4fa918166d95416a8c4dc885";

	public static void pushToAndroid(String titls, String alert) {
		ClientConfig clientConfig = ClientConfig.getInstance();
		final JPushClient jpushClient = new JPushClient(MASTER_SECRET, APP_KEY, null, clientConfig);
		// String authCode = ServiceHelper.getBasicAuthorization(APP_KEY,
		// MASTER_SECRET);
		// Here you can use NativeHttpClient or NettyHttpClient or
		// ApacheHttpClient.
		// Call setHttpClient to set httpClient,
		// If you don't invoke this method, default httpClient will use
		// NativeHttpClient.

		// ApacheHttpClient httpClient = new ApacheHttpClient(authCode, null,
		// clientConfig);
		// NettyHttpClient httpClient =new NettyHttpClient(authCode, null,
		// clientConfig);
		// jpushClient.getPushClient().setHttpClient(httpClient);
		// final PushPayload payload = buildPushObject_android_and_ios();
		// // For push, all you need do is to build PushPayload object.
		PushPayload payload = buildPushObject_android_alias_alert(titls, alert);
		try {
			PushResult result = jpushClient.sendPush(payload);
			LOG.info("Got result - " + result);
			System.out.println(result);
			// 如果使用 NettyHttpClient，需要手动调用 close 方法退出进程
			// If uses NettyHttpClient, call close when finished sending
			// request, otherwise process will not exit.
			// jpushClient.close();
		} catch (APIConnectionException e) {
			LOG.error("Connection error. Should retry later. ", e);
			LOG.error("Sendno: " + payload.getSendno());

		} catch (APIRequestException e) {
			LOG.error(
					"Error response from JPush server. Should review and fix it. ",
					e);
			LOG.info("HTTP Status: " + e.getStatus());
			LOG.info("Error Code: " + e.getErrorCode());
			LOG.info("Error Message: " + e.getErrorMessage());
			LOG.info("Msg ID: " + e.getMsgId());
			LOG.error("Sendno: " + payload.getSendno());
		}
	}
	//安卓群发
	public static PushPayload buildPushObject_android_alias_alert(String titls, String alert) {
		return PushPayload.newBuilder().setPlatform(Platform.android())
				.setAudience(Audience.all())
				.setNotification(Notification.android(alert, titls, null))
				.build();
	}
	public static void main(String[] args) {
		pushToAndroid("标题","内容");
	}
}
