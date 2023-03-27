let user = new UserForm;

user.loginFormCallback = function(data) {
    ApiConnector.login(data, (data) => {
    let obj = Object.create(data);
    if(obj.success) {
        location.reload();
    } else{
        this.setLoginErrorMessage(obj.error);
    }
   })
}

user.registerFormCallback = function(data) {
    ApiConnector.register(data, (data) => {
        let obj = Object.create(data);
        if(obj.success) {
            location.reload();
        } else{
            this.setRegisterErrorMessage(obj.error);
    }
    })
}