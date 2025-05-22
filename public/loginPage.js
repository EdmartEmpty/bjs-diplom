"use strict";

let userData = new UserForm();
userData.loginFormCallback = (data) => {

    data.login = data.login.trim();

    ApiConnector.login(data, response => {

        if (response.success === true) {
            location.reload();
        } else if (response.success === false) {
            userData.setLoginErrorMessage("Не верные логин и пароль");
        }
        
    })
};



userData.registerFormCallback = (data) =>
    ApiConnector.register(data, response => {

        if (response.success === true) {
            location.reload();
        } else if (response.success === false) {
            userData.setRegisterErrorMessage("Ошибка");
        }
        
    });
