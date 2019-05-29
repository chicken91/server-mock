const baseUrl = "http://localhost:3300/";
const defaultPlayerId = "defaultPlayer001";

var gameData = {
    balance: -1,
    totalBet: -1,
    win: -1
};

function onInit(playerId) {
    const url = baseUrl + "init/?playerId=" + playerId;
    fetch(url)
        .then((response) => {
            if (response.ok) {
                if (response.status === 200) {
                    console.log("Initialization successful!");
                    return response.json();
                }
            } else {
                console.log("Initialization error!");
                return;
            }
        })
        .then(initJson => {
            if (initJson) {
                console.log("Init data: " + initJson);
                gameData.totalBet = initJson.totalBet;
                gameData.balance = initJson.balance;
                gameData.playerId = initJson.playerId;
                gameData.win = initJson.win;
                updateUI();
            }
        });
}

function onSpin() {
    document.getElementById("spinButton").disabled = true;
    var url = baseUrl + "spin/?playerId=" + gameData.playerId + "&totalBet=" + gameData.totalBet;
    fetch(url)
        .then((response) => {
            if (response.ok) {
                if (response.status === 200) {
                    console.log("Spin successful!");
                    return response.json();
                }
            } else {
                console.log("Spin error!");
                return;
            }
        })
        .then(spinJson => {
            if (spinJson) {
                console.log("Spin data: " + spinJson);
                gameData.balance = spinJson.balance;
                gameData.win = spinJson.win;
                updateUI();
            }
        });
}

function onChangeTotalBet() {
    var totalBetInput = document.getElementById("totalBetInput");
    var totalBetValue = parseInt(totalBetInput.value);
    totalBetInput.value = "";
    if (totalBetValue > 0 && gameData.balance - totalBetValue >= 0) {
        gameData.totalBet = totalBetValue;
        updateUI();
    }

}

function updateUI() {
    document.getElementById("spinButton").disabled = false;
    document.getElementById("balanceValue").innerText = gameData.balance;
    document.getElementById("totalBetValue").innerText = gameData.totalBet;
    const winElement = document.getElementById("winValue");
    const winTitle = document.getElementById("winTitle");
    winElement.innerText = gameData.win;
    if (gameData.win) {
        winElement.style.visibility = "visible";
        winTitle.style.visibility = "visible";
    } else {
        winElement.style.visibility = "hidden";
        winTitle.style.visibility = "hidden";
    }
}


function getPlayerId() {
    const url = new URL(window.location.href);
    const urlPlayerId = url.searchParams.get("playerId");
    if (urlPlayerId) {
        return urlPlayerId;
    }
    return defaultPlayerId;
}

onInit(getPlayerId());