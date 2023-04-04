"use strict";
let userLogout = new LogoutButton;
let rates = new RatesBoard;
let money = new MoneyManager;
let favorite = new FavoritesWidget;
let successMsg = "Запрос выполнен успешно";


userLogout.action = () => {
    ApiConnector.logout(answer => {
        if(answer.success){
            location.reload();
        }
    })
} 

ApiConnector.current(answer => {
    if(answer.success) {
        ProfileWidget.showProfile(answer.data);
    } else {
        MoneyManager.setMessage(answer.success, answer.error)
    }
})

let showRatesBoard = () => {
    ApiConnector.getStocks(answer => {
    if(answer.success) {
        rates.clearTable();
        rates.fillTable(answer.data);
    } else {
        MoneyManager.setMessage(answer.success, answer.error)
})}

showRatesBoard();
setInterval(showRatesBoard, 60000);

money.addMoneyCallback = (cash) => {
    ApiConnector.addMoney(cash, answer => { 
        if(answer.success) {
            ProfileWidget.showProfile(answer.data);
            money.setMessage(answer.success, successMsg);
        } else { 
            money.setMessage(answer.success, answer.error);
        }
    })
}

money.conversionMoneyCallback = (balance) => {
    ApiConnector.convertMoney (balance, answer => {
        if(answer.success) {
            ProfileWidget.showProfile(answer.data);
            money.setMessage(answer.success, successMsg);
        } else {
            money.setMessage(answer.success, answer.error);
        }
    })
}

money.sendMoneyCallback = (amount) => {
    ApiConnector.transferMoney(amount, answer => {
        if(answer.success) {
            ProfileWidget.showProfile(answer.data);
            money.setMessage(answer.success, successMsg);
        } else {
            money.setMessage(answer.success, answer.error);
        }
    })
}

ApiConnector.getFavorites(answer => {
    if (answer.success) {
        favorite.clearTable();
        favorite.fillTable(answer.data);
        MoneyManager.updateUsersList(answer.data);
    } else {
        money.setMessage(answer.success, answer.error);
    }
});

favorite.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, answer => {
        if(answer.success) {
            favorite.clearTable();
            favorite.fillTable(answer.data);
            MoneyManager.updateUsersList(answer.data);
            favorite.setMessage(answer.success, successMsg);
        } else {
            favorite.setMessage(answer.success, answer.error);
        }
    })
}

favorite.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, answer => {
        if(answer.success) {
            favorite.clearTable();
            favorite.fillTable(answer.data);
            MoneyManager.updateUsersList(answer.data);
            favorite.setMessage(answer.success, successMsg);
        } else {
            favorite.setMessage(answer.success, answer.error);
        }
    })
}
