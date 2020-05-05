package com.chenwei.jfinal;

import com.jfinal.render.Render;
import com.jfinal.render.RenderFactory;
import com.jfinal.render.TemplateRender;

public class ErrorRenderFactory extends RenderFactory {
	@Override
	public Render getErrorRender(int errorCode) {
		if (errorCode == 500 || errorCode == 404) {
			return new TemplateRender("/WEB-INF/page/error.html");
		}
		return super.getErrorRender(errorCode);
	}
}
