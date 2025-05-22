"use strict";



let exitButton = new LogoutButton();


exitButton.action = () => ApiConnector.logout(response => {
    if (response.success) {
        location.reload();
    }
}
);


ApiConnector.current(user => {
    if (user.success) {

        ProfileWidget.showProfile(user.data);
    }
});


let board = new RatesBoard();

function getExchangeRate() {
    return ApiConnector.getStocks(moneyData => {
        if (moneyData.success) {
            board.clearTable();
            board.fillTable(moneyData.data);
        }
    });
}
getExchangeRate();
setInterval(() => getExchangeRate(), 60000);

let cashMetod = new MoneyManager();

cashMetod.addMoneyCallback = (data) => ApiConnector.addMoney(data, response => {
    console.log(response);
    if (response.success) {

        setTimeout(() => ApiConnector.current(user => ProfileWidget.showProfile(user.data)), 1000);
        cashMetod.setMessage(response.success, "Добалвено");

    }
    else {
        cashMetod.setMessage(response.success, response.error);
    }
});

cashMetod.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, response => {
    console.log(response);
    if (response.success) {

        setTimeout(() => ApiConnector.current(user => ProfileWidget.showProfile(user.data)), 1000);
        cashMetod.setMessage(true, "Добалвено");

    }
    else {
        cashMetod.setMessage(response.success, response.error);
    }
});

cashMetod.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, response => {
    console.log(response);
    if (response.success) {

        setTimeout(() => ApiConnector.current(user => ProfileWidget.showProfile(user.data)), 1000);
        cashMetod.setMessage(true, `Перевод кол-во ${data.amount} валюта ${data.currency}`);

    }
    else {
        cashMetod.setMessage(false, response.error);
    };
});

let frends = new FavoritesWidget();

ApiConnector.getFavorites(response => {

    if (response.success) {
        frends.clearTable();
        frends.fillTable(response.data);
        cashMetod.updateUsersList(response.data);
    }
});


frends.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
        frends.setMessage(true, `Добавлен новый пользователь ${data.name}`);
        setTimeout(() => {
            frends.clearTable();
            frends.fillTable(response.data);
            cashMetod.updateUsersList(response.data)
        }, 1000);
    } else {
        frends.setMessage(false, response.error);
    }

});


frends.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, (response) => {
     
    if (response.success) {
        frends.setMessage(true, `Удален друг ${data}`);
        setTimeout(() => {
            frends.clearTable();
            frends.fillTable(response.data);
            cashMetod.updateUsersList(response.data)
        }, 1000);
    } else {
        frends.setMessage(false, response.error);
    }
});