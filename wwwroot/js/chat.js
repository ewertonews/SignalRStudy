"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

//Disable send button until connection is estabilished
document.getElementById("sendButton").disabled = true;

//starts the connection with the hub specified in line 3
connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString())
});

//Listens to the ReceiveMessage event defined in the method SendMessage in the class ChatHub
connection.on("ReceiveMessage", function (user, message) {
    console.log("Message recebida: ", message);
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var liElement = document.createElement("li");
    liElement.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(liElement);
});


document.getElementById("sendButton").addEventListener("click", function (event) {
    console.log("Botão clicado");
    var user = document.getElementById("userInput").value;
    console.log("User: ", user);
    var message = document.getElementById("messageInput").value;
    console.log("Message: ", message);

    //________________ Nome do método definido no ChatHub.cs
    connection.invoke("sendMessage", user, message).catch(function (err) {
        console.log("Deu errado :/");
        return console.error(err.toString());
    });
    event.preventDefault();
});

