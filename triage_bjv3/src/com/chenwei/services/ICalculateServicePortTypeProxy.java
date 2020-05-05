package com.chenwei.services;

public class ICalculateServicePortTypeProxy implements com.chenwei.services.ICalculateServicePortType {
  private String _endpoint = null;
  private com.chenwei.services.ICalculateServicePortType iCalculateServicePortType = null;
  
  public ICalculateServicePortTypeProxy() {
    _initICalculateServicePortTypeProxy();
  }
  
  public ICalculateServicePortTypeProxy(String endpoint) {
    _endpoint = endpoint;
    _initICalculateServicePortTypeProxy();
  }
  
  private void _initICalculateServicePortTypeProxy() {
    try {
      iCalculateServicePortType = (new com.chenwei.services.ICalculateServiceLocator()).getICalculateServiceHttpPort();
      if (iCalculateServicePortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)iCalculateServicePortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)iCalculateServicePortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (iCalculateServicePortType != null)
      ((javax.xml.rpc.Stub)iCalculateServicePortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public com.chenwei.services.ICalculateServicePortType getICalculateServicePortType() {
    if (iCalculateServicePortType == null)
      _initICalculateServicePortTypeProxy();
    return iCalculateServicePortType;
  }
  
  public java.lang.String funInterFace(java.lang.String in0) throws java.rmi.RemoteException{
    if (iCalculateServicePortType == null)
      _initICalculateServicePortTypeProxy();
    return iCalculateServicePortType.funInterFace(in0);
  }
  
  
}