"use strict";

let user = new UserForm;

user.loginFormCallback = function(data) {
    ApiConnector.login(data, answer => {
    if(answer.success) {
        location.reload();
    } else{
        user.setLoginErrorMessage(answer.error);
    }
   })
}

user.registerFormCallback = function(data) {
    ApiConnector.register(data, answer => {
        if(answer.success) {
            location.reload();
        } else{
            user.setRegisterErrorMessage(answer.error);
    }
    })
}