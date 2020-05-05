package com.chenwei.sso.handler;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import cn.hutool.core.util.StrUtil;

import com.github.ebnew.ki4so.core.authentication.Credential;
import com.github.ebnew.ki4so.core.authentication.EncryCredential;
import com.github.ebnew.ki4so.web.utils.WebConstants;

/**
 * 经过认证加密后的凭据信息解析器，从http请求的cookie中解析出对应的加密后的凭据信息。
 * @author burgess yang
 *
 */
public class EncryCredentialResolver implements CredentialResolver {
	
	private static final Logger LOGGER = Logger.getLogger(EncryCredentialResolver.class);

	@Override
	public Credential resolveCredential(HttpServletRequest request) {
		if(request!=null){
			//查找请求中的cookie。
			Cookie[] cookies = request.getCookies();
			if(cookies!=null){
				String value = null;
				for(Cookie cookie:cookies){
					//若查找到KI4SO写入的cookie值。
					if(cookie!=null && cookie.getName().equalsIgnoreCase(WebConstants.KI4SO_SERVER_ENCRYPTED_CREDENTIAL_COOKIE_KEY)){
						value = cookie.getValue();
						break;
					}
				}
				//如果cookie中没有凭据值，则从请求参数中获取凭据值。
				if(StrUtil.isEmpty(value)){
					LOGGER.info("the KI4SO_SERVER_EC value is: "+value);
					value = request.getParameter(WebConstants.KI4SO_SERVER_ENCRYPTED_CREDENTIAL_COOKIE_KEY);
				}
				//最终如果加密凭据有值，则直接返回凭据对象。
				if(!StrUtil.isEmpty(value)){
					//去除空串后返回。
					return new EncryCredential(value.trim());
				}
			}
		}
		return null;
	}

}
