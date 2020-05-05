//表单验证
function initValidate(){
	$('#addPatientForm').bootstrapValidator({
	    message: 'This value is not valid',
	    /**
	    feedbackIcons: {        //提示图标
	        valid: 'glyphicon glyphicon-ok',
	        invalid: 'glyphicon glyphicon-remove',
	        validating: 'glyphicon glyphicon-refresh'
	    },
	    */
	    fields: {
	    	
	    	cardnum: {
	            validators: {
	                notEmpty: {        // 非空校验+提示信息
	                    message: '证件号不能为空'
	                }
	            }
	        }
	    	/** 以下是验证模板
	        firstName: {
	            validators: {
	                notEmpty: {        // 非空校验+提示信息
	                    message: 'The first name is required and cannot be empty'
	                }
	            }
	        },
	        lastName: {
	            validators: {
	                notEmpty: {
	                    message: 'The last name is required and cannot be empty'
	                }
	            }
	        },
	        username: {
	            message: 'The username is not valid',
	            validators: {
	                notEmpty: {
	                    message: 'The username is required and cannot be empty'
	                },
	                stringLength: {     //输入　长度限制　　校验
	                    min: 6,
	                    max: 30,
	                    message: 'The username must be more than 6 and less than 30 characters long'
	                },
	                regexp: {           //正则校验
	                    regexp: /^[a-zA-Z0-9_\.]+$/,
	                    message: 'The username can only consist of alphabetical, number, dot and underscore'
	                },
	                remote: {
	                    url: 'remote.php',
	                    message: 'The username is not available'
	                },
	                different: {
	                    field: 'password',
	                    message: 'The username and password cannot be the same as each other'
	                }
	            }
	        },
	        email: {
	            validators: {
	                emailAddress: {     //　　邮箱格式校验
	                    message: 'The input is not a valid email address'
	                }
	            }
	        },
	        password: {
	            validators: {
	                notEmpty: {
	                    message: 'The password is required and cannot be empty'
	                },
	                identical: {
	                    field: 'confirmPassword',
	                    message: 'The password and its confirm are not the same'
	                },
	                different: {
	                    field: 'username',
	                    message: 'The password cannot be the same as username'
	                }
	            }
	        },
	        captcha: {
	            validators: {
	                callback: {     //提交到后台进行校验
	                    message: 'Wrong answer',        //提示信息
	                    callback: function(value, validator) {
	                        //用ajax提交到后台，进行校验。如果校验失败  return false; 校验成功 return true;
	                        var items = $('#captchaOperation').html().split(' '), sum = parseInt(items[0]) + parseInt(items[2]);
	                        return value == sum;
	                    }
	                }
	            }
	        }
	        */
	    }
	});
}