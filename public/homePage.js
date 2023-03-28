let userLogout = new LogoutButton;

userLogout.action = () => {
    ApiConnector.logout(answer => {
        if(answer.success){
            location.reload();
        }
    })
} 

ApiConnector.current(answer => {
    //console.log(answer);
    if(answer.success) {
        ProfileWidget.showProfile(answer.data);
    }
})

let rates = new RatesBoard;

let showRatesBoard = () => {ApiConnector.getStocks(answer => {
    //console.log(answer);
    if(answer.success) {
        rates.clearTable();
        rates.fillTable(answer.data);
    }
})}

showRatesBoard();
setInterval(showRatesBoard, 60000);