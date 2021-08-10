//Пример работы с Websockets
/*В качестве Websocket сервера здесь выбран "wss://echo.websocket.org". Этот сервер принимает сообщение и в случае успешного приема отправляет аналогичное сообщение клиенту.
*/

var webSocketAdress="wss://echo.websocket.org/";
var websocket;
let WSocketStatus = $("#WSocketStatus");
let connectButton = $("#connectButton");
let sendButton = $("#sendButton");
let disconnectButton = $("#disconnectButton");
var connectStatusLabel = $("#WSocketStatus");
let message = $("#requestField");
let responseLabel = $("#requestResponse");

function RunWebSocket(){
  websocket = new WebSocket(webSocketAdress);
  websocket.onopen = function(event) {
    connectStatusLabel.html("Connected");
  };
  websocket.onerror = function(event) {
    connectStatusLabel.html("Error");
  };
  websocket.onclose = function(event) {
    connectStatusLabel.html("Disconnected");
  };
}

function WriteMessage(mes){
  websocket.send(mes);
  websocket.onmessage = function(event) {
    responseLabel.html(event.data);
  };
}

function DisconnectFromWebSocket(){
  connectStatusLabel.html("Disconnected");
  websocket.close();
}

$(document).ready(function () {
  connectButton.on("click", function (){
    connectButton.attr("disabled", true);
    sendButton.removeAttr("disabled");
    disconnectButton.removeAttr("disabled");
    webSocketAdress = $("#WSocketURLField").val();
    RunWebSocket();
  });
  sendButton.on("click", function (){
    WriteMessage(message.val());
  });
  disconnectButton.on("click", function (){
    sendButton.attr("disabled", true);
    disconnectButton.attr("disabled", true);
    connectButton.removeAttr("disabled");
    responseLabel.html("");
    DisconnectFromWebSocket();
  });
});
