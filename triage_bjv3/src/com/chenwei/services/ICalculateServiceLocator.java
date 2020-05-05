/**
 * ICalculateServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.chenwei.services;

public class ICalculateServiceLocator extends org.apache.axis.client.Service implements com.chenwei.services.ICalculateService {

    public ICalculateServiceLocator() {
    }


    public ICalculateServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public ICalculateServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for ICalculateServiceHttpPort
    private java.lang.String ICalculateServiceHttpPort_address = "http://192.168.253.59:9090/founderWebs/services/ICalculateService";

    public java.lang.String getICalculateServiceHttpPortAddress() {
        return ICalculateServiceHttpPort_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String ICalculateServiceHttpPortWSDDServiceName = "ICalculateServiceHttpPort";

    public java.lang.String getICalculateServiceHttpPortWSDDServiceName() {
        return ICalculateServiceHttpPortWSDDServiceName;
    }

    public void setICalculateServiceHttpPortWSDDServiceName(java.lang.String name) {
        ICalculateServiceHttpPortWSDDServiceName = name;
    }

    public com.chenwei.services.ICalculateServicePortType getICalculateServiceHttpPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(ICalculateServiceHttpPort_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getICalculateServiceHttpPort(endpoint);
    }

    public com.chenwei.services.ICalculateServicePortType getICalculateServiceHttpPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            com.chenwei.services.ICalculateServiceHttpBindingStub _stub = new com.chenwei.services.ICalculateServiceHttpBindingStub(portAddress, this);
            _stub.setPortName(getICalculateServiceHttpPortWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setICalculateServiceHttpPortEndpointAddress(java.lang.String address) {
        ICalculateServiceHttpPort_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (com.chenwei.services.ICalculateServicePortType.class.isAssignableFrom(serviceEndpointInterface)) {
                com.chenwei.services.ICalculateServiceHttpBindingStub _stub = new com.chenwei.services.ICalculateServiceHttpBindingStub(new java.net.URL(ICalculateServiceHttpPort_address), this);
                _stub.setPortName(getICalculateServiceHttpPortWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("ICalculateServiceHttpPort".equals(inputPortName)) {
            return getICalculateServiceHttpPort();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://services.founder.com", "ICalculateService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://services.founder.com", "ICalculateServiceHttpPort"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("ICalculateServiceHttpPort".equals(portName)) {
            setICalculateServiceHttpPortEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
