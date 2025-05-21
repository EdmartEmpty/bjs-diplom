"use strict";

let exitButton = new LogoutButton();


exitButton.action = () => ApiConnector.logout(response => {
    if (response.success === true) {
        location.reload();
    }
}
);


ApiConnector.current(user => {
    if (user.success === true) {

        ProfileWidget.showProfile(user.data);
    }
});


let board = new RatesBoard();

function getExchangeRate() {
    return ApiConnector.getStocks(moneyData => {
        if (moneyData.success === true) {
            board.clearTable();
            board.fillTable(moneyData.data);
        }
    });
}
getExchangeRate();
setInterval(() => getExchangeRate(), 60000);

let cashMetod = new MoneyManager();

cashMetod.addMoneyCallback = ()=> ApiConnector.addMoney({},data => console.log(data));



