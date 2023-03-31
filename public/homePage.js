"use strict";

let userLogout = new LogoutButton;

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
    }
})

let rates = new RatesBoard;

let showRatesBoard = () => {
    ApiConnector.getStocks(answer => {
    if(answer.success) {
        rates.clearTable();
        rates.fillTable(answer.data);
    }
})}

showRatesBoard();
setInterval(showRatesBoard, 60000);

let money = new MoneyManager;

money.addMoneyCallback = (cash) => {
    ApiConnector.addMoney(cash, answer => { 
        if(answer.success) {
            ProfileWidget.showProfile(answer.data);
            answer.error = "Успех";
        } 
        money.setMessage(answer.success, answer.error);
    })
}

money.conversionMoneyCallback = (balance) => {
    ApiConnector.convertMoney (balance, answer => {
        if(answer.success) {
            ProfileWidget.showProfile(answer.data);
            answer.error = "Успех";
        } 
        money.setMessage(answer.success, answer.error);
    })
}

money.sendMoneyCallback = (amount) => {
    ApiConnector.transferMoney(amount, answer => {
        if(answer.success) {
            ProfileWidget.showProfile(answer.data);
            answer.error = "Успех";
        } 
        money.setMessage(answer.success, answer.error);
    })
}

let favorite = new FavoritesWidget;

ApiConnector.getFavorites(answer => {
    if (answer.success) {
        favorite.clearTable();
        favorite.fillTable(answer.data);
        money.updateUsersList(answer.data);
    }
});

favorite.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, answer => {
        if(answer.success) {
            favorite.clearTable();
            favorite.fillTable(answer.data);
            money.updateUsersList(answer.data);
            answer.error = "Успех";
        } 
        favorite.setMessage(answer.success, answer.error);
    })
}

favorite.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, answer => {
        if(answer.success) {
            favorite.clearTable();
            favorite.fillTable(answer.data);
            money.updateUsersList(answer.data);
            answer.error = "Успех";
        } 
        favorite.setMessage(answer.success, answer.error);
    })
}