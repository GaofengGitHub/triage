package com.chenwei.websocket;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.java_websocket.WebSocketImpl;



public class WebsocketFitler implements Filter {

    public void destroy() {

    }

    public void doFilter(ServletRequest arg0, ServletResponse arg1,
            FilterChain arg2) throws IOException, ServletException {

    }

    public void init(FilterConfig arg0) throws ServletException {
        this.startWebsocketInstantMsg();
    }

    /**
     * 启动即时通讯
     */
    public void startWebsocketInstantMsg() {
        WebSocketImpl.DEBUG = false;
        WebsocketServer s;
        s = new WebsocketServer(8886);
        s.start();
        System.out.println("websocket已启动");
    }
}